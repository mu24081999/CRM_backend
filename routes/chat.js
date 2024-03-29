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
router.get(
  "/get-rooms",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getChatRooms
);
router.get(
  "/get-group-rooms",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getGroupChatRooms
);
router.get(
  "/get-chats",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  upload.single("file"),
  getChats
);
router.post(
  "/upload-chat-file",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  uploadChatFile
);
router.get(
  "/chat-history/:user_id_1/:user_id_2",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  chatHistoy
);
router.get(
  "/group-chat-history/:room_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getGroupChatHistoy
);
router.put(
  "/update-chat/:room_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateChat
);
router.delete(
  "/delete-group-chat-history/:room_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteChatRecord
);

module.exports = router;
