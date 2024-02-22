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

// app.post("/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   const { filename, mimetype, size } = file;

//   // Upload file to S3
//   const params = {
//     Bucket: "YOUR_BUCKET_NAME",
//     Key: filename,
//     Body: file.buffer,
//     ContentType: mimetype,
//   };

//   s3.upload(params, (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).json({ error: "Error uploading file to S3" });
//     }

//     // Save file metadata to MySQL database
//     const sql =
//       "INSERT INTO files (filename, mimetype, size, s3_key) VALUES (?, ?, ?, ?)";
//     connection.query(
//       sql,
//       [filename, mimetype, size, data.Key],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//           return res
//             .status(500)
//             .json({ error: "Error saving file metadata to database" });
//         }

//         res.json({ message: "File uploaded successfully" });
//       }
//     );
//   });
// });

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
