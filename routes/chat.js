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
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getChatRooms
);
router.get(
  "/get-group-rooms",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getGroupChatRooms
);
router.get(
  "/get-chats",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  upload.single("file"),
  getChats
);
router.post(
  "/upload-chat-file",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  uploadChatFile
);
router.get(
  "/chat-history/:user_id_1/:user_id_2",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  chatHistoy
);
router.get(
  "/group-chat-history/:room_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getGroupChatHistoy
);
router.put(
  "/update-chat/:room_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updateChat
);
router.delete(
  "/delete-group-chat-history/:room_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  deleteChatRecord
);

module.exports = router;
