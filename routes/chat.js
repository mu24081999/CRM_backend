const express = require("express");
const router = express.Router();
const { getChatRooms, chatHistoy, getChats } = require("../controllers/chat");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get("/get-rooms", IsAuth, getChatRooms);
router.get("/get-chats", IsAuth, getChats);
router.get("/chat-history/:user_id_1/:user_id_2", IsAuth, chatHistoy);

module.exports = router;
