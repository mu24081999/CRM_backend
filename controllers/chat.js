const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");

exports.getChatRooms = catchAssyncFunc(async function (req, res, next) {
  const chatRooms = await db("chat_rooms")
    .where("user_id_1", req.user.id)
    .orWhere("user_id_2", req.user.id)
    .select();
  return helper.sendSuccess(
    req,
    res,
    {
      chatRoomsData: chatRooms,
    },
    "success"
  );
});
exports.getGroupChatRooms = catchAssyncFunc(async function (req, res, next) {
  const chatRooms = await db("group_chat_rooms")
    .whereRaw('JSON_CONTAINS(group_members->"$.members[*].id", ?)', [
      `${req.user.id}`,
    ])
    .select();
  return helper.sendSuccess(
    req,
    res,
    {
      chatRoomsData: chatRooms,
    },
    "success"
  );
});
exports.uploadChatFile = catchAssyncFunc(
  // upload.single("file"),
  async (req, res, next) => {
    console.log(req.files);
    const { file } = req.files;
    const { name, mimetype, data, size } = file;
    console.log("🚀 ~ file:", file);
    // Upload file to S3
    const params = {
      Bucket: config.S3_BUCKET,
      Key: name,
      Body: data,
      ContentType: mimetype,
    };
    const is_added = await s3.upload(params, {}, (err, data) => {
      if (!data) {
        console.log(err);
        return helper.sendError(req, res, "Error uploading file to S3.", 500);
      }
      return helper.sendSuccess(
        req,
        res,
        { data },
        "File uploaded successfully"
      );
    });
  }
);

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
exports.updateChat = catchAssyncFunc(async (req, res, next) => {
  const { room_id } = req.params;
  const { status } = req.body;
  const is_chat_updated = await db("chat_rooms")
    .where("name", room_id)
    .update({ status: status });
  if (!is_chat_updated) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while searching for chat.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "chat updated successfully");
});
exports.deleteChatRecord = catchAssyncFunc(async (req, res, next) => {
  const { room_id } = req.params;
  const is_chat_deleted = await db("chats").whereIn("room", [room_id]).del();
  const is_room_deleted = await db("group_chat_rooms")
    .whereIn("room_id", [room_id])
    .del();
  const is_simgle_room_deleted = await db("chat_rooms")
    .whereIn("name", [room_id])
    .del();
  if (!is_chat_deleted || !is_room_deleted || !is_simgle_room_deleted) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while searching for chat.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "chat deleted successfully");
});
exports.getGroupChatHistoy = catchAssyncFunc(async (req, res, next) => {
  const { room_id } = req.params;
  const chat_record = await db("chats").where("room", room_id).select();

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
