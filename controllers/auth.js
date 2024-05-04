const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");

//Create Session Function
async function createSession(user, req, res) {
  const token = jwt.sign({ user_id: user.id }, config.JWT_SECRET, {
    expiresIn: "30d",
  });
  const exist_session = await db("sessions")
    .select()
    .where("user_id", user.id)
    .first();
  if (exist_session) {
    const session = await db("sessions")
      .select()
      .where({ user_id: user.id })
      .update({
        token: token,
        expires_at: moment().add(30, "day").format("YYYY-MM-DD HH:mm:ss"),
      });
    if (session) {
      const userData = {
        ...user,
        token: token,
      };
      return helper.sendSuccess(
        req,
        res,
        { userData: userData },
        "User logged in successfully."
      );
    } else {
      helper.sendError(
        req,
        res,
        "Somthing went wrong while creating session.",
        500
      );
    }
  } else {
    const session = await db("sessions").insert({
      user_id: user.id,
      token: token,
      expires_at: moment().add(30, "day").format("YYYY-MM-DD HH:mm:ss"),
    });

    if (session) {
      const userData = {
        ...user,
        token: token,
      };
      return helper.sendSuccess(
        req,
        res,
        { userData: userData },
        "User logged in successfully."
      );
    } else {
      helper.sendError(
        req,
        res,
        "Somthing went wrong while creating session.",
        500
      );
    }
  }
}

exports.signUp = catchAssyncFunc(async function (req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    parent_id: Joi.string().optional(),
    client_id: Joi.string().optional(),
    accountSid: Joi.string().optional(),
    authToken: Joi.string().optional(),
    phone: Joi.string().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return helper.sendError(
      req,
      res,
      "Validations failed:" + error.message,
      403
    );
  }
  const {
    username,
    name,
    email,
    password,
    accountSid,
    authToken,
    parent_id,
    client_id,
    phone,
    role,
  } = req.body;
  console.log("🚀 ~ req.body:", req.body);

  const is_exist_user = await db("users")
    .where("email", email)
    .orWhere("username", username)
    .first();
  if (is_exist_user) {
    return helper.sendSuccess(
      req,
      res,
      {},
      "User already exists with this email."
    );
  }

  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
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
    password: hashedPassword,
    avatar: req.files && publicUrl ? publicUrl : "",
    accountSid,
    authToken,
    client_id,
    parent_id,
    phone,
    role,
  };
  const is_user_added = await db("users").insert(userParams);
  const new_user = await db("users").where("email", email).first();
  if (new_user?.role === "USER" && new_user.parent_id !== null) {
    // Create a subaccount
    const twilio_account = twilioClient.api.accounts.create(
      {
        friendlyName: new_user.username, // Provide a friendly name for the subaccount
      },
      async (err, account) => {
        if (err) {
          console.error("🚀 ~ err:", err);
        } else {
          const is_updated = await db("users").where("email", email).update({
            authToken: account.authToken,
            accountSid: account.sid,
          });
        }
      }
    );
  }

  if (new_user) {
    // return createSession(new_user, req, res);
    var otp_code = Math.floor(Math.random() * 900000);

    const htmlMessage =
      "<h1>OTP for <b>DesktopCRM</b> App</h1><br></br><p>Hello " +
      new_user?.name +
      ",</p><p>We have generated a one-time password (OTP) for your  <b>DesktopCRM</b> account. Please use the following OTP to verify your identity:</p><h2 style='background-color: #f2f2f2; padding: 10px; border-radius: 4px; font-size: 24px; display: inline-block;'>[" +
      otp_code +
      "]</h2><p>This OTP is valid for a limited time period and can only be used once.</p><p>If you did not initiate this action or have any concerns regarding your account security, please contact our support team immediately at [Support Email/Phone Number].</p><br><a href='http://localhost:3000/reset-password-verification/" +
      new_user?.email +
      "' >Reset Password</a><p>Thank you,<br>The <b>DesktopCRM</b> Team</p>";

    const sendResetOTP = await helper.sendEmail(
      req,
      res,
      "OTP FOR RESET PASSWORD.",
      email,
      "",
      htmlMessage
    );
    const dbOTP = await db("otps").insert({
      email: email,
      otp: otp_code,
      messageSid: sendResetOTP?.messageId,
      expires_at: moment().add(2, "hours").format("YYYY-MM-DD HH:mm:ss"),
    });
    console.log(sendResetOTP);
    if (dbOTP) {
      return helper.sendSuccess(req, res, { userData: new_user }, "Success");
    }
  }
});

exports.signIn = catchAssyncFunc(async function (req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    type: Joi.boolean().optional(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return helper.sendError(
      req,
      res,
      "Validations failed:" + error.message,
      403
    );
  }
  const { username, password, type } = req.body;
  const is_exist_user = await db("users")
    .where("username", username)
    .orWhere("email", username)
    .first();
  if (!is_exist_user) {
    return helper.sendError(req, res, "Invalid username or password.", 403);
  }
  if (is_exist_user && is_exist_user.status !== "active") {
    return helper.sendError(req, res, "Your account is blocked.", 401);
  }
  if (type && password === is_exist_user?.password) {
    return createSession(is_exist_user, req, res);
  }
  const is_password_matched = await bcrypt.compare(
    password,
    is_exist_user?.password
  );
  if (!is_password_matched) {
    return helper.sendError(req, res, "Invalid username or password.", 403);
  }
  return createSession(is_exist_user, req, res);
});

exports.forgotPassword = catchAssyncFunc(async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return helper.sendError(
      req,
      res,
      "Validation failed " + error.message,
      403
    );
  }
  const { email } = req.body;
  const is_user_exist = await db("users").where("email", email).first();
  if (!is_user_exist) {
    return helper.sendSuccess(req, res, {}, "No user found.");
  }
  console.log(
    "🚀 ~ exports.forgotPassword=catchAssyncFunc ~ is_user_exist:",
    is_user_exist
  );

  var otp_code = Math.floor(Math.random() * 900000);

  const htmlMessage =
    "<h1>OTP for <b>DesktopCRM</b> App</h1><br></br><p>Hello " +
    is_user_exist.name +
    ",</p><p>We have generated a one-time password (OTP) for your  <b>DesktopCRM</b> account. Please use the following OTP to verify your identity:</p><h2 style='background-color: #f2f2f2; padding: 10px; border-radius: 4px; font-size: 24px; display: inline-block;'>[" +
    otp_code +
    "]</h2><p>This OTP is valid for a limited time period and can only be used once.</p><p>If you did not initiate this action or have any concerns regarding your account security, please contact our support team immediately at [Support Email/Phone Number].</p><br><a href='http://localhost:3000/reset-password-verification/" +
    is_user_exist?.email +
    "' >Reset Password</a><p>Thank you,<br>The <b>DesktopCRM</b> Team</p>";

  const sendResetOTP = await helper.sendEmail(
    req,
    res,
    "OTP FOR RESET PASSWORD.",
    email,
    "",
    htmlMessage
  );
  const dbOTP = await db("otps").insert({
    email: email,
    otp: otp_code,
    messageSid: sendResetOTP.messageId,
    expires_at: moment().add(2, "hours").format("YYYY-MM-DD HH:mm:ss"),
  });
  if (dbOTP) {
    return helper.sendSuccess(
      req,
      res,
      { userData: is_user_exist },
      "OTP FOR RESET PASSWORD successfully sent."
    );
  }
  return helper.sendError(
    req,
    res,
    "Something went wrong while trying to send otp.",
    500
  );
});
exports.verifyResetPasswordOTP = catchAssyncFunc(async (req, res, next) => {
  const schema = Joi.object({
    otp: Joi.number()
      .integer()
      .positive()
      .greater(100000)
      .less(1000000)
      .required(),
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return helper.sendError(
      req,
      res,
      "Validation failed " + error.message,
      403
    );
  }
  const { otp, email } = req.body;
  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  const is_exist = await db("otps")
    .select()
    .where("otp", otp)
    .andWhere("email", email)
    .andWhere("expires_at", ">", currentTime)
    .first();
  if (!is_exist)
    return helper.sendError(req, res, "No otp found.Please try again.", 403);
  return helper.sendSuccess(
    req,
    res,
    { otpData: is_exist },
    "OTP verified successfully."
  );
});
exports.resetPassword = catchAssyncFunc(async (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    email: Joi.string().email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return helper.sendError(
      req,
      res,
      "Validation failed " + error.message,
      403
    );
  }
  const { password, confirmPassword, email } = req.body;
  if (password !== confirmPassword)
    return helper.sendError(req, res, "Password not matched", 403);
  const saltRounds = 10;
  const newPassword = bcrypt.hashSync(password, saltRounds);
  const is_user_exist_update = await db("users").where("email", email).update({
    password: newPassword,
  });
  const is_user_exist = await db("users").where("email", email).first();
  if (is_user_exist_update) {
    const del_otp = await db("otps").where("email", email).del();
    if (!del_otp)
      return helper.sendError(req, res, "Something went wrong", 403);
    return helper.sendSuccess(
      req,
      res,
      { userData: is_user_exist },
      "Reset password success."
    );
  }
  return helper.sendError(req, res, "Reset password failed.", 500);
});
exports.logout = catchAssyncFunc(async (req, res, next) => {
  const user_id = req.user.id;
  const result = await db("sessions").where("user_id", user_id).del();
  if (result) {
    return helper.sendSuccess(req, res, {}, "User logged out.");
  }
  return helper.sendError(req, res, "Something went wrong.", 500);
});
