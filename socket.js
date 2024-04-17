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
const fs = require("fs").promises;
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Configure upload destination (change if needed)

async function createTempFileFromBuffer(bufferData) {
  const tempFilePath = await fs.mkdtemp("tmp-"); // Create a temporary directory
  const tempFileName = `${tempFilePath}/${Math.random()
    .toString(36)
    .substring(2, 15)}.tmp`; // Generate unique filename
  await fs.writeFile(tempFileName, bufferData);
  return tempFileName;
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
      if (user) {
        io.to(user.socket_id).emit("updated_me", user);
      }
    }
  });

  //Messages Events
  //Send Message
  socket.on("send-message", async (data) => {
    const params = {
      from: data.from.phone, // Your Twilio phone number
      to: data.to.phone, // Recipient's phone number
      // sendAt: new Date(Date.UTC(2021, 10, 30, 20, 36, 27)),
      // scheduleType: 'fixed'
      // to: "+923174660027",
      body: data.message, // Message content
      // mediaUrl: [
      //   "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
      //   "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
      // ],
    };
    twilioClient.messages
      .create(params)
      .then(async (message) => {
        const is_added_to_database = await db("messages").insert({
          from_name: data.from.name,
          to_name: data.to.name,
          from_phone: data.from.phone,
          to_phone: data.to.phone,
          message: data.message,
          sid: message.sid,
          price: message.price,
          account_sid: message.accountSid,
          uri: message.uri,
          num_media: message.numMedia,
          media_urls: { urls: [] },
        });
        if (!is_added_to_database) {
          throw new NEW_ERROR_RES(
            500,
            "Something went wrong while adding to database."
          );
        }
        const messages = await db("messages")
          .where("from_phone", data.from.phone)
          .orWhere("to_phone", data.from.phone)
          .select();
        console.log("🚀 ~ .then ~ messages:", messages);
        io.to(data.from.socket_id).emit("message_sent", messages);
      })
      .catch((err) => {
        console.error(err);
        throw new NEW_ERROR_RES(500, err);
      });
  });

  //chat events
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
  });
  //add chat_room
  socket.on("add-group-chat-room", async (data) => {
    try {
      const { user_id, user_name, user_image, group_members, name, room_id } =
        data;
      console.log("New group chat", data);
      const roomData = {
        user_id,
        user_name,
        user_image,
        group_members,
        name,
        room_id,
      };
      const userIds = group_members?.members?.map((member) => member.id);

      const is_exist_room = await db("group_chat_rooms")
        .where("room_id", room_id)
        .first();
      if (is_exist_room) {
        const is_updated_room = await db("group_chat_rooms")
          .where("room_id", room_id)
          .update({
            ...roomData,
            group_members: JSON.stringify(group_members),
          });
        if (!is_updated_room) {
          throw new NEW_ERROR_RES(500, "Something went wrong." + error);
        }

        io.emit("group_room_added");
      } else {
        const is_room_added = await db("group_chat_rooms").insert(roomData);
        console.log("🚀 ~ socket.on ~ is_room_added:", is_room_added);
        if (!is_room_added) {
          throw new NEW_ERROR_RES(500, "Something went wrong." + error);
        }
        io.emit("group_room_added");
      }
    } catch (error) {
      throw new NEW_ERROR_RES(500, "Error sending message: " + error);
    }
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
  //send chat message
  socket.on("chat_message", async function (data) {
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
      file,
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
      const myBuffer = Buffer.from(file_data); // Replace with your buffer data

      // Access the temporary file path and handle the file content
      const tempFilePath = await createTempFileFromBuffer(myBuffer);
      const [fileData] = await storage
        .bucket("crm-justcall")
        .upload(tempFilePath, {
          // Specify the destination file name in GCS (optional)
          destination: "chats/" + room + "/" + file_name,
          // Set ACL to public-read
          predefinedAcl: "publicRead",
        });
      const publicUrl = fileData?.publicUrl();
      formData = {
        sender: sender,
        recipient: recipient,
        message: message,
        room: room,
        // file_size: file_size,
        file_size: file_size,
        file_url: publicUrl,
        file_key: file_name,
        type: "file",
      };
      // const params = {
      //   Bucket: config.S3_BUCKET,
      //   Key: file_name,
      //   Body: file_data,
      //   ContentType: file_type,
      // };
      // const is_added = await new Promise((resolve, reject) => {
      //   s3.upload(params, {}, (err, data) => {
      //     if (err) {
      //       console.error(err);
      //       reject(new Error("Error Uploading File: " + err));
      //     } else {
      //       // console.log("File uploaded successfully:", data);
      //       formData = {
      //         sender: sender,
      //         recipient: recipient,
      //         message: message,
      //         room: room,
      //         file_size: file_size,
      //         file_url: data.Location,
      //         file_key: data.Key,
      //         type: "file",
      //       };
      //       resolve(true);
      //     }
      //   });
      // });
    }
    const is_message_added = await db("chats").insert(formData);
    if (!is_message_added) {
      throw new NEW_ERROR_RES(500, "Something went wrong." + error);
    }
    const room_messages = await db("chats").where({ room: room }).select();
    io.to(room).emit("message_added", room_messages);
  });
  //Me
  socket.emit("me", socket.id);
  socket.on("disconnect_call", (data) => {
    console.log("🚀 ~ socket.on ~ data:", data);
    io.to(data.to).emit("callEnded", { to: data.to });
  });
  socket.on("callUser", ({ userToCall, signalData, from, name, type, to }) => {
    console.log(userToCall, from, name, type, to);
    io.to(userToCall).emit("callUser", {
      signal: signalData,
      from,
      name,
      type,
      userToCall,
      to,
    });
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
        user: config.EMAIL_FROM_ACC,
        pass: config.EMAIL_FROM_ACC_PASS,
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
          Bucket: config.S3_BUCKET,
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
