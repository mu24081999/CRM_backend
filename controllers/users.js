const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

exports.getUsers = catchAssyncFunc(async function (req, res, next) {
  const users = await db("users").select();
  return helper.sendSuccess(
    req,
    res,
    {
      usersData: users,
    },
    "success"
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
    const [fileData] = await storage
      .bucket("crm-justcall")
      .upload(tempFilePath, {
        // Specify the destination file name in GCS (optional)
        destination: "users/avatars/" + username + "/" + avatar_name,
        // Set ACL to public-read
        predefinedAcl: "publicRead",
      });
    publicUrl = fileData?.publicUrl();
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
      avatar: req.files && publicUrl ? publicUrl : "",
      twilio_numbers: JSON.stringify(twilio_numbers),
      google_app_password,
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
      avatar: req.files && publicUrl ? publicUrl : "",
      twilio_numbers: JSON.stringify(twilio_numbers),
      google_app_password,
      recording,
    };
  }
  console.log(userParams);
  const is_user_updated = await db("users")
    .where("id", user_id)
    .update(userParams);

  if (is_user_updated) return helper.sendSuccess(req, res, {}, "User Updated!");
});
