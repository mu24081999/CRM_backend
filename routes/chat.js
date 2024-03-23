const express = require("express");
const router = express.Router();
const {
  getChatRooms,
  chatHistoy,
  getChats,
  uploadChatFile,
  getGroupChatRooms,
  getGroupChatHistoy,
  deleteChatRecord,
  updateChat,
} = require("../controllers/chat");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get("/get-rooms", IsAuth, getChatRooms);
router.get("/get-group-rooms", IsAuth, getGroupChatRooms);
router.get("/get-chats", IsAuth, upload.single("file"), getChats);
router.post("/upload-chat-file", IsAuth, uploadChatFile);
router.get("/chat-history/:user_id_1/:user_id_2", IsAuth, chatHistoy);
router.get("/group-chat-history/:room_id", IsAuth, getGroupChatHistoy);
router.put("/update-chat/:room_id", IsAuth, updateChat);
router.delete("/delete-group-chat-history/:room_id", IsAuth, deleteChatRecord);

module.exports = router;
