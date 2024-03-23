const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const fs = require("fs");
const moment = require("moment");

exports.getTeams = catchAssyncFunc(async function (req, res, next) {
  const teams = await db("board_teams").select();
  return helper.sendSuccess(
    req,
    res,
    {
      teamsData: teams,
    },
    "success"
  );
});
exports.readTeam = catchAssyncFunc(async function (req, res, next) {
  const { team_id } = req.params;
  const team = await db("board_teams").where("id", team_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      teamData: team,
    },
    "success"
  );
});
exports.deleteTeam = catchAssyncFunc(async function (req, res, next) {
  const { team_id } = req.params;
  const team = await db("boards").where("id", team_id).del();
  return helper.sendSuccess(req, res, {}, "Team deleted successfully.");
});
exports.addTeam = catchAssyncFunc(async function (req, res, next) {
  const { email } = req.body;
  if (req.files) {
    const { image } = req.files;
    const { name, mimetype, tempFilePath } = image;
    fs.readFile(tempFilePath, async (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Internal Server Error");
      }
      const params = {
        Bucket: config.S3_BUCKET,
        Key: name,
        Body: data,
        ContentType: mimetype,
      };
      const is_added = await new Promise((resolve, reject) => {
        s3.upload(params, {}, async (err, data) => {
          if (err) {
            console.error(err);
            reject(new Error("Error Uploading File: " + err));
          } else {
            console.log("File uploaded successfully:", data);

            const is_record_inserted = await db("board_teams").insert({
              name: req.body.name,
              email,
              image: data.Location,
            });
            if (!is_record_inserted) {
              return helper.sendError(
                req,
                res,
                "Something went wrong, while creating board.",
                500
              );
            }
            resolve(true);
            return helper.sendSuccess(
              req,
              res,
              {},
              "Team successfully created."
            );
          }
        });
      });
    });
  }
});
exports.updateTeam = catchAssyncFunc(async function (req, res, next) {
  const { team_id } = req.params;
  const { name, email } = req.body;
  if (req.files) {
    const { image } = req.files;
    const { name, mimetype, tempFilePath } = image;
    fs.readFile(tempFilePath, async (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        return res.status(500).send("Internal Server Error");
      }
      const params = {
        Bucket: config.S3_BUCKET,
        Key: name,
        Body: data,
        ContentType: mimetype,
      };
      const is_added = await new Promise((resolve, reject) => {
        s3.upload(params, {}, async (err, data) => {
          if (err) {
            console.error(err);
            reject(new Error("Error Uploading File: " + err));
          } else {
            console.log("File uploaded successfully:", data);

            resolve(true);
          }
        });
      });
    });
  }
  const is_record_updated = await db("board_teams")
    .where("id", team_id)
    .update({
      name: req.body.name,
      email,
      // image: data.Location,
    });
  if (!is_record_updated) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating board.",
      500
    );
  }
  resolve(true);
  return helper.sendSuccess(req, res, {}, "Board successfully created.");
});
