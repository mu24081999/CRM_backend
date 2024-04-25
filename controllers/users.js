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
    phoneNumber,
    status,
    bio,
    location,
    phone,
    password,
    google_app_password,
  } = req.body;
  const is_exist_user = await db("users")
    .where("id", user_id)
    // .orWhere("username", username)
    .first();
  if (!is_exist_user) {
    return helper.sendSuccess(req, res, {}, "User not exist");
  }
  const saltRounds = 10;
  const hashedPassword =
    password !== undefined && bcrypt.hashSync(password, saltRounds);
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
  const userParams = {
    name,
    username,
    email,
    role,
    phone: phoneNumber,
    bio,
    location,
    status: status,
    phone,
    password: password !== undefined && hashedPassword,
    avatar: req.files && publicUrl ? publicUrl : "",
    google_app_password,
  };
  const is_user_added = await db("users")
    .where("id", user_id)
    .update(userParams);

  if (is_user_added) return helper.sendSuccess(req, res, {}, "User Updated!");
});
