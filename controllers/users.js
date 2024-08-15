const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const fs = require("fs");

exports.getUsers = catchAssyncFunc(async function (req, res, next) {
  const users = await db("users").select();
  return helper.sendSuccess(
    req,
    res,
    {
      usersData: users,
    },
    "successs"
  );
});
exports.readUser = catchAssyncFunc(async function (req, res, next) {
  const { user_id } = req.params;
  const user = await db("users").where("id", user_id).first();
  return helper.sendSuccess(req, res, { userData: user }, "500");
});
exports.softDeleteUser = catchAssyncFunc(async function (req, res, next) {
  const { user_id } = req.params;
  const user = await db("users").where("id", user_id).update({
    status: "blocked",
  });
  return helper.sendSuccess(req, res, {}, "User Updated!");
});
exports.permanentDeleteUser = catchAssyncFunc(async function (req, res, next) {
  const { user_id } = req.params;
  const user = await db("users").where("id", user_id).del();
  return helper.sendSuccess(req, res, {}, "User Deleted successfully!");
});
exports.updateStatus = catchAssyncFunc(async function (req, res, next) {
  const { user_id } = req.params;
  const user = await db("users").where("id", user_id).update({
    status: "blocked",
  });
  return helper.sendSuccess(req, res, {}, "User Updated!");
});
exports.updateUser = catchAssyncFunc(async function (req, res, next) {
  const { user_id } = req.params;
  const {
    username,
    name,
    email,
    role,
    status,
    bio,
    location,
    phone,
    personal_phone,
    password,
    google_app_password,
    mail_provider,
    email_type,
    twilio_numbers,
    recording,
  } = req.body;
  const is_exist_user = await db("users")
    .where("id", user_id)
    // .orWhere("username", username)
    .first();
  if (!is_exist_user) {
    return helper.sendSuccess(req, res, {}, "User not exist");
  }

  let publicUrl;
  if (req.files) {
    const { avatar } = req.files;
    const { tempFilePath, name: avatar_name } = avatar;
    fs.readFile(tempFilePath, async (err, data) => {
      if (err) {
        return helper.sendError(req, res, "Error reading file.", 500);
      }
      const documentParams = {
        Bucket: config.DIGITAL_OCEAN_BUCKET_NAME,
        Key: avatar_name, // The name of the file in the Space
        Body: data,
        ACL: "public-read", // Optional: makes the file publicly accessible
      };
      // Upload the file to DigitalOcean Spaces
      const response = await s3.upload(params, (err, data) => {
        if (err) {
          console.error("Error uploading file:", err);
          return res.status(500).send("Error uploading file.");
        }
      });
      publicUrl = response?.Location;
    });
    // const [fileData] = await storage
    //   .bucket("crm-justcall")
    //   .upload(tempFilePath, {
    //     // Specify the destination file name in GCS (optional)
    //     destination: "users/avatars/" + username + "/" + avatar_name,
    //     // Set ACL to public-read
    //     predefinedAcl: "publicRead",
    //   });
    // publicUrl = fileData?.publicUrl();
  }
  var userParams;
  if (password) {
    const saltRounds = 10;
    const hashedPassword =
      password !== undefined && bcrypt.hashSync(password, saltRounds);
    userParams = {
      name,
      username,
      email,
      role,
      phone,
      bio,
      location,
      status,
      personal_phone,
      password: password !== undefined && password !== "" && hashedPassword,
      google_app_password,
      mail_provider,
      email_type,
      recording,
    };
  } else if (req.files) {
    userParams = {
      name,
      username,
      email,
      role,
      phone,
      bio,
      location,
      status,
      personal_phone,
      avatar: req.files && publicUrl ? publicUrl : "",
      google_app_password,
      mail_provider,
      email_type,
      recording,
    };
  } else if (twilio_numbers) {
    userParams = {
      name,
      username,
      email,
      role,
      phone,
      bio,
      location,
      status,
      phone,
      personal_phone,
      twilio_numbers: JSON.stringify(twilio_numbers),
      google_app_password,
      mail_provider,
      email_type,
      recording,
    };
  } else {
    userParams = {
      name,
      username,
      email,
      role,
      phone,
      bio,
      location,
      status,
      phone,
      personal_phone,
      google_app_password,
      mail_provider,
      email_type,
      recording,
    };
  }
  const is_user_updated = await db("users")
    .where("id", user_id)
    .update(userParams);

  if (is_user_updated) return helper.sendSuccess(req, res, {}, "User Updated!");
});
