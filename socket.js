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
const twilio = require("twilio");
const nodeMailer = require("nodemailer");
async function createTempFileFromBuffer(bufferData) {
  const tempFilePath = await fs.mkdtemp("tmp-"); // Create a temporary directory
  const tempFileName = `${tempFilePath}/${Math.random()
    .toString(36)
    .substring(2, 15)}.tmp`; // Generate unique filename
  await fs.writeFile(tempFileName, bufferData);
  return tempFileName;
}
async function sendGridEmail(toEmail, subject, htmlText) {
  const transporter = nodeMailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey", // This is the fixed username for SendGrid SMTP
      pass: config.SENDGRID_API_KEY, // Your SendGrid API key
    },
  });
  // Define the email options
  const mailOptions = {
    from: "Desktopcrm <support@app.desktopcrm.com>", // Sender address
    to: toEmail, // List of recipients
    subject: subject,
    // text: "This is a test email sent using Nodemailer with SendGrid.",
    html: htmlText,
  };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error:", error);
    }
    console.log("Email sent:", info);
  });
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
  // socket.on("send-message", async (data) => {
  //   console.log("🚀 ~ socket.on ~ data:", data);
  //   const params = {
  //     from: data.from.phone, // Your Twilio phone number
  //     // from: "+14849993639",
  //     to: data.to.phone, // Recipient's phone number
  //     // sendAt: new Date(Date.UTC(2021, 10, 30, 20, 36, 27)),
  //     // scheduleType: 'fixed'
  //     // to: "+923174660027",
  //     body: data.message, // Message content
  //     // mediaUrl: [
  //     //   "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
  //     //   "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
  //     // ],
  //   };
  //   twilioClient.messages
  //     .create(params)
  //     .then(async (message) => {
  //       const is_added_to_database = await db("messages").insert({
  //         from_name: data.from.name,
  //         to_name: data.to.name,
  //         from_phone: data.from.phone,
  //         to_phone: data.to.phone,
  //         message: data.message,
  //         sid: message.sid,
  //         price: message.price,
  //         account_sid: message.accountSid,
  //         uri: message.uri,
  //         num_media: message.numMedia,
  //         media_urls: { urls: [] },
  //       });
  //       console.log(
  //         "🚀 ~ constis_added_to_database=awaitdb ~ is_added_to_database:",
  //         message
  //       );
  //       if (!is_added_to_database) {
  //         throw new NEW_ERROR_RES(
  //           500,
  //           "Something went wrong while adding to database."
  //         );
  //       }
  //       const messages = await db("messages")
  //         .where("from_phone", data.from.phone)
  //         .orWhere("to_phone", data.from.phone)
  //         .select();
  //       io.to(data.from.socket_id).emit("message_sent", messages);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //       io.to(data.from.socket_id).emit("message_error", err);
  //       throw new NEW_ERROR_RES(500, err);
  //     });
  // });
  socket.on("push-notification", async (data) => {
    const { user_id, notification, type, notification_details, email_to } =
      data;
    const insert_notificaiton = await db("notifications").insert({
      user_id,
      notification,
      type,
    });
    const notifications = await db("notifications")
      .where("user_id", user_id)
      .orderBy("created_at", "desc")
      .select()
      .limit(20);
    const user = await db("users").where("id", user_id).first();
    const socket_id = user?.socket_id;
    if (notification_details && email_to) {
      const htmlMessage = `
  <!DOCTYPE html>
   <html>
   <head>
       <style>
           body {
               font-family: Arial, sans-serif;
               background-color: #f4f4f4;
               margin: 0;
               padding: 0;
           }
           .email-container {
               max-width: 600px;
               margin: 20px auto;
               padding: 20px;
               background-color: #ffffff;
               border-radius: 8px;
               box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
           }
            .header {
             background-color: #008080;
             color: white;
             padding: 10px;
             text-align: center;
             border-radius: 8px 8px 0 0;
         }
           .content {
               padding: 20px;
           }
           .button {
               display: inline-block;
               padding: 10px 20px;
               margin-top: 20px;
               background-color: #007bff;
               color: white;
               text-decoration: none;
               border-radius: 4px;
               text-decoration: none;
           }
           .footer {
               margin-top: 20px;
               color: #666666;
           }
       </style>
   </head>
   <body>
       <div class="email-container">
           <div class="header">
               <p style="font-size:24px"><b>DesktopCRM</b></p>
               <p style="font-size:16px">Event Reminder</p>
           </div>
           <div class="content">
               <p>Hello ${user.name},</p>
               <p>This is a reminder for your upcoming event:</p>
               <p><b>${notification_details.name}</b></p>
               <p>Details of the event are as follows:</p>
               <ul>
                   <li>Date: ${notification_details?.start_date}</li>
                   <li>Time: ${notification_details?.start_time}</li>
                   <li>Description: ${notification_details?.description}</li>
               </ul>
               <p>We hope to see you there! If you have any questions or need further assistance, please contact our support team at [support@app.desktopcrm.com].</p>
           </div>
           <div class="footer">
               <p>Thank you for using <b>DesktopCRM</b>!<br>The <b>DesktopCRM</b> Team</p>
           </div>
       </div>
   </body>
   </html>`;

      const sendEmail = await sendGridEmail(email_to, "Reminder", htmlMessage);
    }
    io.to(socket_id).emit("trigger_notification", notifications);
  });
  socket.on("send-message", async (data) => {
    const params = {
      from: data.from.phone, // Your Twilio phone number
      to: data.to.phone, // Recipient's phone number
      // sendAt: new Date(Date.UTC(2021, 10, 30, 20, 36, 27)),
      // scheduleType: 'fixed'
      body: data.message, // Message content
      // mediaUrl: [
      //   "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
      //   "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
      // ],
    };
    const client = twilio(data?.from?.accountSid, data?.from?.authToken);
    const is_added_to_database = await db("messages").insert({
      user_id: data?.user_id,
      from_name: data?.from?.name,
      to_name: data?.to?.name,
      from_phone: data?.from?.phone,
      to_phone: data?.to?.phone,
      message: data?.message,
      account_sid: data?.from?.accountSid,
    });
    const messages = await db("messages")
      .where("from_phone", data.from.phone)
      .orWhere("to_phone", data.from.phone)
      .select();
    io.to(data.from.socket_id).emit("message_sent", messages);
    if (!is_added_to_database) {
      throw new NEW_ERROR_RES(
        500,
        "Something went wrong while adding to database."
      );
    }
    const message_id = is_added_to_database[0];
    const country_code = data?.to?.phone?.slice(0, 2);
    client.messages
      .create(params)
      .then(async (message) => {
        const is_updated_to_database = await db("messages")
          .where("id", parseInt(message_id))
          .update({
            sid: message.sid,
            price: message.price,
            uri: message.uri,
            num_media: message.numMedia,
          });
        if (!is_updated_to_database) {
          throw new NEW_ERROR_RES(
            500,
            "Something went wrong while adding to database."
          );
        }
        const messages = await db("messages")
          .where("from_phone", data.from.phone)
          .orWhere("to_phone", data.from.phone)
          .select();
        io.to(data.from.socket_id).emit("message_sent", messages);
      })
      .catch(async (err) => {
        console.log("Error", err.message);
        io.to(data.from.socket_id).emit("message_error", err);
        const is_updated_to_database = await db("messages")
          .where("id", parseInt(message_id))
          .update({
            status: "Failed",
            message_error: err.message,
          });
        console.log(
          "🚀 ~ socket.on ~ is_updated_to_database:",
          is_updated_to_database
        );
        const messages = await db("messages")
          .where("from_phone", data.from.phone)
          .orWhere("to_phone", data.from.phone)
          .select();
        io.to(data.from.socket_id).emit("message_sent", messages);
        // throw new NEW_ERROR_RES(500, err);
      });
    setTimeout(async () => {
      await client.messages
        .list({ to: data.to.phone })
        .then(async (messages) => {
          const latestMessage = messages[0];
          console.log(
            "🚀 ~ client.messages.list ~ latestMessage:",
            latestMessage
          );
          if (
            latestMessage.status !== "delivered" ||
            (latestMessage.status === "sent" && latestMessage.price === null)
          ) {
            io.to(data.from.socket_id).emit(
              "message_error",
              "A2P Verification required"
            );
            const is_updated_to_database = await db("messages")
              .where("id", parseInt(message_id))
              .update({
                status: "Failed",
                message_error:
                  latestMessage?.status === "failed"
                    ? "Failed to send the message."
                    : "A2P Verification required",
              });
            const messages = await db("messages")
              .where("from_phone", data.from.phone)
              .orWhere("to_phone", data.from.phone)
              .select();
            io.to(data.from.socket_id).emit("message_sent", messages);
            // Take appropriate actions here
          } else if (latestMessage?.status === "delivered") {
            console.log("Message delivered successfully.");
            const is_exist_balance = await db("balance")
              .where("user_id", data?.user_id)
              .first();
            console.log(
              "🚀 ~ client.messages.list ~ is_exist_balance:",
              is_exist_balance
            );
            const is_balance_updated = await db("balance")
              .where("user_id", data?.user_id)
              .update({
                credit:
                  parseFloat(is_exist_balance?.credit) +
                  parseFloat(latestMessage.price) * 100 * 2,
              });
            console.log(
              "🚀 ~ client.messages.list ~ is_balance_updated:",
              is_balance_updated,
              parseFloat(is_exist_balance?.credit),
              parseFloat(latestMessage.price) * 100 * 2
            );
            console.log("Message not complete. Status:", latestMessage);
          }
        });
    }, 14000);
    // }
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
  async function uploadFileToGCS(tempFilePath, room, file_name, retries = 1) {
    try {
      const [fileData] = await storage
        .bucket("crm-justcall")
        .upload(tempFilePath, {
          destination: `chats/${room}/${file_name}`,
          predefinedAcl: "publicRead",
        });

      return fileData;
    } catch (error) {
      console.error("Error uploading file:", error.message);
      console.error("Error stack:", error.stack);
      console.error("Full error object:", JSON.stringify(error, null, 2));

      if (retries > 0) {
        console.log(`Retrying... ${retries} attempts left`);
        // await sleep(2000); // Wait for 2 seconds before retrying
        return uploadFileToGCS(tempFilePath, room, file_name, retries - 1);
      } else {
        throw new Error("All retry attempts failed.");
      }
    }
  }
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
    console.log("🚀 ~ data:", data);
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

      // const fileData = await uploadFileToGCS(tempFilePath, room, file_name);
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
    const [sender_details, reciever_details] = await Promise.all([
      db("users").where("id", sender).first(),
      recipient ? db("users").where("id", recipient).first() : {},
    ]);

    if (reciever_details?.connected === 0) {
      const htmlMessage = `
      <!DOCTYPE html>
      <html>
      <head>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
              }
              .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .header {
                  background-color: #008080;
                  color: white;
                  padding: 10px;
                  text-align: center;
                  border-radius: 8px 8px 0 0;
              }
              .content {
                  padding: 20px;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  background-color: #007bff;
                  color: white;
                  text-decoration: none;
                  border-radius: 4px;
                  text-decoration: none;
              }
              .footer {
                  margin-top: 20px;
                  color: #666666;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="header">
                  <p style="font-size:24px"><b>DesktopCRM</b></p>
                  <p style="font-size:16px">New Message Notification</p>
              </div>
              <div class="content">
                  <p>Hello ${reciever_details?.name},</p>
                  <p>You have received a new message:</p>
                  <p><b>From:</b> ${sender_details.name}</p>
                  <p><b>Message:</b></p>
                  <p>${message}</p>
              </div>
              <div class="footer">
                  <p>Thank you for using <b>DesktopCRM</b>!<br>The <b>DesktopCRM</b> Team</p>
              </div>
          </div>
      </body>
      </html>`;
      const is_send = await sendGridEmail(
        reciever_details?.email,
        "Team Message Notification",
        htmlMessage
      );
    }
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
