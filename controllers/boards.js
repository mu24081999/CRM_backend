const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const fs = require("fs");
const moment = require("moment");

exports.getBoards = catchAssyncFunc(async function (req, res, next) {
  const boards = await db("boards")
    .where("user_id", req.user.id)
    .orderBy("created_at", "desc")
    .select();
  return helper.sendSuccess(
    req,
    res,
    {
      boardsData: boards,
    },
    "success"
  );
});

exports.readBoard = catchAssyncFunc(async function (req, res, next) {
  const { board_id } = req.params;
  const board = await db("boards").where("id", board_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      boardData: board,
    },
    "success"
  );
});
exports.deleteBoard = catchAssyncFunc(async function (req, res, next) {
  const { board_id } = req.params;
  const board = await db("boards").where("id", board_id).del();
  // .update({
  //   visibility: "deleted",
  // });
  return helper.sendSuccess(req, res, {}, "Board deleted successfully.");
});
// exports.addBoard = catchAssyncFunc(async function (req, res, next) {
//   const { name, visibility, avatar_text, avatar_color, team_members } =
//     req.body;
//   if (req.files) {
//     const { image } = req.files;
//     const { name, mimetype, tempFilePath } = image;
//     fs.readFile(tempFilePath, async (err, data) => {
//       if (err) {
//         console.error("Error reading file:", err);
//         return res.status(500).send("Internal Server Error");
//       }
//       const params = {
//         Bucket: config.S3_BUCKET,
//         Key: name,
//         Body: data,
//         ContentType: mimetype,
//       };
//       const is_added = await new Promise((resolve, reject) => {
//         s3.upload(params, {}, async (err, data) => {
//           if (err) {
//             console.error(err);
//             reject(new Error("Error Uploading File: " + err));
//           } else {
//             console.log("File uploaded successfully:", data);

//             const is_record_inserted = await db("boards").insert({
//               name: req.body.name,
//               visibility,
//               avatar_text,
//               avatar_color,
//               team_members: { team: JSON.parse(team_members) },
//               image: data.Location,
//             });
//             if (!is_record_inserted) {
//               return helper.sendError(
//                 req,
//                 res,
//                 "Something went wrong, while creating board.",
//                 500
//               );
//             }
//             resolve(true);
//             return helper.sendSuccess(
//               req,
//               res,
//               {},
//               "Board successfully created."
//             );
//           }
//         });
//       });
//     });
//   }
// });
exports.addBoard = catchAssyncFunc(async function (req, res, next) {
  const {
    name,
    visibility,
    avatar_text,
    avatar_color,
    team_members,
    pipeline_status_array,
  } = req.body;
  let publicUrl;
  if (req.files) {
    const { image } = req.files;
    const { name, mimetype, tempFilePath } = image;
    const [fileData] = await storage
      .bucket("crm-justcall")
      .upload(tempFilePath, {
        // Specify the destination file name in GCS (optional)
        destination: "/boards/" + req.body.name + "/" + name,
        // Set ACL to public-read
        predefinedAcl: "publicRead",
      });
    publicUrl = fileData.publicUrl();
  }
  const is_record_inserted = await db("boards").insert({
    user_id: req.user.id,
    name: req.body.name,
    visibility,
    avatar_text,
    avatar_color,
    team_members: { team: team_members },
    image: req.files ? publicUrl : "",
    pipeline_status_array: { status_array: pipeline_status_array },
  });
  if (!is_record_inserted) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating board.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Pipeline successfully created.");
});

exports.updateBoard = catchAssyncFunc(async function (req, res, next) {
  const { board_id } = req.params;
  const {
    name,
    visibility,
    avatar_text,
    avatar_color,
    team_members,
    pipeline_status_array,
  } = req.body;
  let publicUrl;
  if (req.files) {
    const { image } = req.files;
    const { name, mimetype, tempFilePath } = image;
    const [fileData] = await storage
      .bucket("crm-justcall")
      .upload(tempFilePath, {
        // Specify the destination file name in GCS (optional)
        destination: "/boards/" + req.body.name + "/" + name,
        // Set ACL to public-read
        predefinedAcl: "publicRead",
      });
    publicUrl = fileData.publicUrl();
  }
  const is_record_updated = await db("boards")
    .where("id", board_id)
    .update({
      user_id: req.user.id,
      name: req.body.name,
      visibility,
      avatar_text,
      avatar_color,
      team_members: JSON.stringify({ team: team_members }),
      image: req.files ? publicUrl : "",
      pipeline_status_array: JSON.stringify({
        status_array: pipeline_status_array,
      }),
    });
  if (!is_record_updated) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating board.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Board successfully updated.");
});
