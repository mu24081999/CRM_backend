const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");

exports.getChatRooms = catchAssyncFunc(async function (req, res, next) {
  const chatRooms = await db("chat_rooms").select();
  return helper.sendSuccess(
    req,
    res,
    {
      chatRoomsData: chatRooms,
    },
    "success"
  );
});

exports.getChats = catchAssyncFunc(async function (req, res, next) {
  const chats = await db("chats").select();
  return helper.sendSuccess(
    req,
    res,
    {
      chatData: chats,
    },
    "success"
  );
});
exports.chatHistoy = catchAssyncFunc(async (req, res, next) => {
  const { user_id_1, user_id_2 } = req.params;
  const chat_record = await db("chats")
    .where({ sender: user_id_1, recipient: user_id_2 })
    .orWhere({ recipient: user_id_1, sender: user_id_2 })
    .select();
  if (!chat_record) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while searching for chat.",
      500
    );
  }
  return helper.sendSuccess(
    req,
    res,
    {
      chatData: chat_record,
    },
    "success"
  );
});
