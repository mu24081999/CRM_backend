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

  // Check if the user exists
  const is_exist_user = await db("users").where("id", user_id).first();
  if (!is_exist_user) {
    return helper.sendSuccess(req, res, {}, "User not exist");
  }

  let publicUrl;

  // Check if there are files to upload
  if (req.files) {
    const { avatar } = req.files;
    const { tempFilePath, name: avatar_name } = avatar;

    try {
      const data = await fs.promises.readFile(tempFilePath);

      const documentParams = {
        Bucket: process.env.DIGITAL_OCEAN_BUCKET_NAME,
        Key: avatar_name, // The name of the file in the Space
        Body: data,
        ACL: "public-read", // Optional: makes the file publicly accessible
      };

      // Upload the file and await the response
      const response = await s3.upload(documentParams).promise();
      publicUrl = response.Location;
    } catch (err) {
      console.error("Error uploading file:", err);
      return res.status(500).send("Error uploading file.");
    }
  }

  // Prepare user update parameters
  let userParams = {
    name,
    username,
    email,
    role,
    phone,
    bio,
    location,
    status,
    personal_phone,
    google_app_password,
    mail_provider,
    email_type,
    recording,
  };

  // Hash the password if provided
  if (password) {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    userParams.password = hashedPassword;
  }

  // Update avatar URL if a new file was uploaded
  if (req.files) {
    userParams.avatar = publicUrl;
  }

  // Handle Twilio numbers if provided
  if (twilio_numbers) {
    userParams.twilio_numbers = JSON.stringify(twilio_numbers);
  }

  // Update the user in the database
  const is_user_updated = await db("users")
    .where("id", user_id)
    .update(userParams);

  if (is_user_updated) {
    return helper.sendSuccess(req, res, {}, "User Updated!");
  } else {
    return helper.sendError(req, res, "Failed to update user.", 500);
  }
});
