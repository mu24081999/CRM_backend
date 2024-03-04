const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const fs = require("fs");

exports.getAllFiles = catchAssyncFunc(async function (req, res, next) {
  const files = await db("gallery_files").select();
  return helper.sendSuccess(
    req,
    res,
    {
      galleryData: files,
    },
    "success"
  );
});
exports.readFile = catchAssyncFunc(async function (req, res, next) {
  const { file_id } = req.params;
  const file = await db("gallery_files").where("id", file_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      galleryData: file,
    },
    "success"
  );
});
exports.deleteFile = catchAssyncFunc(async function (req, res, next) {
  const { file_id, user_name } = req.params;
  const file = await db("gallery_files").where("id", file_id).first();

  const deleteParams = {
    Bucket: config.S3_BUCKET,
    Key: user_name + "/" + file.name,
  };

  // Delete the object from the S3 bucket
  s3.deleteObject(deleteParams, async (err, data) => {
    if (err) {
      console.error("Error deleting object:", err);
      return helper.sendError(req, res, {}, "Error deleting object.");
    } else {
      console.log("Object deleted successfully");
      const file = await db("gallery_files").where("id", file_id).del();
      return helper.sendSuccess(req, res, {}, "File deleted successfully.");
    }
  });
});
exports.addFile = catchAssyncFunc(async function (req, res, next) {
  const { user_id, user_name } = req.body;
  if (req.files) {
    function uploadFile(tempFilePath, name, size, mimetype) {
      fs.readFile(tempFilePath, async (err, data) => {
        if (err) {
          return helper.sendError(req, res, "Internal Server Error", 500);
        }
        const params = {
          Bucket: config.S3_BUCKET,
          Key: user_name + "/" + name,
          // ACL: "public-read",
          Body: data,
          ContentType: mimetype,
        };
        const is_added = await new Promise((resolve, reject) => {
          s3.upload(params, {}, async (err, data) => {
            if (err) {
              console.error(err);
              reject(new Error("Error Uploading File: " + err));
            } else {
              const is_record_inserted = await db("gallery_files").insert({
                title: name,
                size: size,
                type: mimetype,
                user_id: user_id,
                url: data.Location,
              });
              if (!is_record_inserted) {
                return helper.sendError(
                  req,
                  res,
                  "Something went wrong, while uploading file.",
                  500
                );
              }
              resolve(true);
              return helper.sendSuccess(
                req,
                res,
                {},
                "File successfully added."
              );
            }
          });
        });
      });
    }
    const { files } = req.files;
    if (Array.isArray(files)) {
      files.forEach((file) => {
        uploadFile(file.tempFilePath, file.name, file.size, file.mimetype);
      });
    } else {
      const { tempFilePath, name, size, mimetype } = files;
      uploadFile(tempFilePath, name, size, mimetype);
    }
  }
});
