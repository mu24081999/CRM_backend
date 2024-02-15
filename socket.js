class NEW_ERROR_RES extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
class NEW_SUCCESS_RES {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}
let connectedDevices = 0;
io.on("connection", (socket) => {
  connectedDevices++;
  console.log("A user connected: ", socket.id);
  console.log("connectedDevices: " + connectedDevices);
  socket.on("user_connected", async (user_id) => {
    if (user_id) {
      const is_updated = await db("users").where("id", user_id).update({
        socket_id: socket.id,
        connected: 1,
      });
      const user = await db("users").where("id", user_id).first();
      io.to(user.socket_id).emit("updated_me", user);
    }
  });
  //chat events
  socket.on("joinRoom", ({ roomId }) => {
    console.log("🚀 ~ socket.on ~ roomId:", roomId);
    socket.join(roomId);
  });

  //add chat_room
  socket.on("add-chat-room", async (data) => {
    try {
      const {
        user_id_1,
        user_id_2,
        user_image_1,
        user_image_2,
        user_name_1,
        user_name_2,
        name,
      } = data;

      console.log("🚀 ~ socket.on ~ data:", data);
      const roomData = {
        user_id_1,
        user_id_2,
        user_name_1,
        user_name_2,
        user_image_1,
        user_image_2,
        name,
      };
      const is_exist_room = await db("chat_rooms").where("name", name).first();
      if (is_exist_room) {
        const is_updated_room = await db("chat_rooms")
          .where("name", name)
          .update(roomData);
        if (!is_updated_room) {
          throw new NEW_ERROR_RES(500, "Something went wrong." + error);
        }
      } else {
        const is_room_added = await db("chat_rooms").insert(roomData);
        if (!is_room_added) {
          throw new NEW_ERROR_RES(500, "Something went wrong." + error);
        }
        const rooms = await db("chat_rooms")
          // .where({ user_id_1: user_id_1, user_id_2: user_id_2 })
          // .orWhere({ user_id_1: user_id_2, user_id_2: user_id_1 })
          // .orWhere({ user_id_2: user_id_2, user_id_1: user_id_1 })
          // .orWhere({ user_id_2: user_id_1, user_id_1: user_id_2 })
          .where({ user_id_1: user_id_1 })
          .orWhere({ user_id_1: user_id_2 })
          .orWhere({ user_id_2: user_id_1 })
          .orWhere({ user_id_2: user_id_2 })
          .select();

        io.emit("room_added", rooms);
      }
    } catch (error) {
      throw new NEW_ERROR_RES(500, "Error sending message: " + error);
    }
  });
  socket.on("chat_message", async function (data) {
    console.log("🚀 ~ data:", data);
    const {
      sender,
      recipient,
      message,
      room,
      type,
      file_name,
      file_data,
      file_size,
      file_type,
    } = data;
    let formData;
    if (type === "text") {
      formData = {
        sender: sender,
        recipient: recipient,
        message: message,
        room: room,
        type: "text",
      };
    } else if (type === "file") {
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: file_name,
        Body: file_data,
        ContentType: file_type,
      };
      const is_added = await new Promise((resolve, reject) => {
        s3.upload(params, {}, (err, data) => {
          if (err) {
            console.error(err);
            reject(new Error("Error Uploading File: " + err));
          } else {
            // console.log("File uploaded successfully:", data);
            formData = {
              sender: sender,
              recipient: recipient,
              message: message,
              room: room,
              file_size: file_size,
              file_url: data.Location,
              file_key: data.Key,
              type: "file",
            };
            resolve(true);
          }
        });
      });
    }
    const is_message_added = await db("chats").insert(formData);
    if (!is_message_added) {
      throw new NEW_ERROR_RES(500, "Something went wrong." + error);
    }
    const room_messages = await db("chats").where({ room: room }).select();
    io.to(room).emit("message_added", room_messages);
  });

  socket.emit("me", socket.id);
  socket.on("disconnect_call", (data) => {
    console.log("🚀 ~ socket.on ~ data:", data);
    io.to(data.to).emit("callEnded");
  });
  socket.on("callUser", ({ userToCall, signalData, from, name }) => {
    console.log({ userToCall, signalData, from, name });
    io.to(userToCall).emit("callUser", { signal: signalData, from, name });
  });
  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });
  socket.on("sendEmail", async (data) => {
    const { from, to, subject, body, type, parentId, files } = data;
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        host: "smpt.gmail.com",
        port: "465",
        user: process.env.EMAIL_FROM_ACC,
        pass: process.env.EMAIL_FROM_ACC_PASS,
      },
    });

    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: body,
      // html: htmlMessage,
    };
    const emailResponse = await transporter.sendMail(mailOptions); // Upload file to S3
    let emailData;
    if (type === "email") {
      emailData = {
        subject: subject,
        body: body,
        sender: emailResponse.envelope.from,
        reciever: emailResponse.envelope.to,
      };
    } else if (type === "reply") {
      emailData = {
        subject: subject,
        body: body,
        sender: emailResponse.envelope.from,
        reciever: emailResponse.envelope.to,
        parent_id: parentId,
      };
    }
    const is_email_added = await db("emails").insert(emailData);
    if (!is_email_added) {
      throw new NEW_ERROR_RES(500, "Something went wrong.Error sending email");
    }
    if (Array.isArray(files)) {
      // Multiple files selected
      files.forEach(async (fileItem, index) => {
        // Handle each fileItem here
        const params = {
          Bucket: process.env.S3_BUCKET,
          Key: fileItem.name,
          Body: fileItem.data,
          ContentType: fileItem.mimetype,
        };

        const is_added = await new Promise((resolve, reject) => {
          s3.upload(params, {}, async (err, data) => {
            if (err) {
              console.error(err);
              reject(new Error("Error Uploading File: " + err));
              throw new NEW_ERROR_RES(500, "Something went wrong.", err);
            } else {
              const is_added = await db("email_attachments").insert({
                file_link: data.Location,
                size: fileItem.size,
                email_id: is_email_added[0],
              });
              if (!is_added) {
                reject(new Error("Error Uploading File: " + err));
                throw new NEW_ERROR_RES(
                  500,
                  "Something went wrong while uploading."
                );
              }
              resolve(true);
            }
          });
        });
      });
    }
  });
  socket.on("disconnect", async () => {
    connectedDevices--;
    const is_updated_user = await db("users")
      .where("socket_id", socket.id)
      .update({
        connected: 0,
      });
    console.log(is_updated_user);
    console.log("A user disconnected...", socket.id);
    console.log("connectedDevices: " + connectedDevices);
  });
});
