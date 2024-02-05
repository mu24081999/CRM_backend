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
    const { sender, recipient, message, room } = data;
    const is_message_added = await db("chats").insert({
      sender: sender,
      recipient: recipient,
      message: message,
      room: room,
    });
    if (!is_message_added) {
      throw new NEW_ERROR_RES(500, "Something went wrong." + error);
    }
    const room_messages = await db("chats").where({ room: room }).select();
    io.to(room).emit("message_added", room_messages);
  });
  socket.on("disconnect", () => {
    connectedDevices--;
    console.log("A user disconnected...", socket.id);
    console.log("connectedDevices: " + connectedDevices);
  });
});
