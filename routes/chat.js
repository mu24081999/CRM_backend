const express = require("express");
const router = express.Router();
const {
  getChatRooms,
  chatHistoy,
  getChats,
  uploadChatFile,
} = require("../controllers/chat");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get("/get-rooms", IsAuth, getChatRooms);
router.get("/get-chats", IsAuth, upload.single("file"), getChats);
router.post("/upload-chat-file", IsAuth, uploadChatFile);
router.get("/chat-history/:user_id_1/:user_id_2", IsAuth, chatHistoy);

module.exports = router;
