const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const nodemailer = require("nodemailer");
const twilio = require("twilio");
// Create Session Function
async function createSession(user, req, res) {
  const token = jwt.sign({ user_id: user.id }, config.JWT_SECRET, {
    expiresIn: "30d",
  });
  const exist_session = await db("sessions").where("user_id", user?.id).first();
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
async function sendGridEmail(toEmail, subject, htmlText) {
  const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey", // This is the fixed username for SendGrid SMTP
      pass: config.SENDGRID_API_KEY, // Your SendGrid API key
    },
  });
  // Define the email options
  const mailOptions = {
    from: "Desktopcrm <support@app.desktopcrm.com>", // Sender address
    to: toEmail, // List of recipients
    subject: subject,
    // text: "This is a test email sent using Nodemailer with SendGrid.",
    html: htmlText,
  };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error:", error);
    }
    console.log("Email sent:", info);
  });
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
    api_key_sid: Joi.string().optional(),
    api_key_secret: Joi.string().optional(),
    twiml_app_sid: Joi.string().optional(),
    twilio_numbers: Joi.object().optional(),
    phone: Joi.string().optional(),
    location: Joi.string().optional(),
    country: Joi.string().optional(),
    state: Joi.string().optional(),
    city: Joi.string().optional(),
    postal_code: Joi.string().optional(),
    personal_phone: Joi.string().optional(),
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
    twiml_app_sid,
    api_key_secret,
    api_key_sid,
    parent_id,
    client_id,
    phone,
    personal_phone,
    role,
    location,
    country,
    state,
    city,
    postal_code,
    twilio_numbers,
  } = req.body;
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
    twiml_app_sid,
    api_key_secret,
    api_key_sid,
    client_id,
    parent_id,
    phone,
    location,
    country,
    state,
    city,
    postal_code,
    role,
    personal_phone,
    twilio_numbers,
  };
  const is_user_added = await db("users").insert(userParams);
  console.log("🚀 ~ is_user_added:", is_user_added);
  const new_user = await db("users")
    .where("id", parseInt(is_user_added[0]))
    .first();
  console.log("🚀 ~ new_user:", new_user);

  if (new_user?.role === "USER" && new_user.parent_id !== null) {
    const addressDetails = {
      customerName: new_user?.name,
      street: new_user?.location,
      city: new_user?.city,
      region: new_user?.state,
      postalCode: new_user?.postal_code,
      isoCountry: new_user?.country,
    };
    console.log("🚀 ~ addressDetails:", addressDetails);
    // Create a subaccount
    const twilio_account = await twilioClient.api.accounts.create({
      friendlyName: new_user.username,
    });
    const client = twilio(twilio_account?.sid, twilio_account?.authToken);
    const [key, twiml_app, address] = await Promise.all([
      client.newKeys.create({
        friendlyName: "justcall",
      }),
      client.applications.create({
        friendlyName: "justcall",
        voiceUrl: "https://desktopcrm.com:51/v1/user/calling/listen-call",
        smsUrl: "https://desktopcrm.com:51/v1/user/calling/recieve-sms",
      }),
      client.addresses.create(addressDetails),
    ]);
    const updatedParams = {
      accountSid: twilio_account?.sid,
      authToken: twilio_account?.authToken,
      api_key_sid: key?.sid,
      api_key_secret: key?.secret,
      twiml_app_sid: twiml_app?.sid,
      addressSid: address?.sid,
    };
    const is_updated_user = await db("users")
      .where("id", new_user?.id)
      .update(updatedParams);
    if (!is_updated_user) {
      return helper.sendError(
        req,
        res,
        "Server Error! :An error occured during registering your account!",
        500
      );
    }
    // const twilio_account = twilioClient.api.accounts.create(
    //   {
    //     friendlyName: new_user.username, // Provide a friendly name for the subaccount
    //   },
    //   async (err, account) => {
    //     if (err) {
    //       console.error("🚀 ~ err:", err);
    //     } else {
    //       const client = require("twilio")(account.sid, account.authToken);
    //       const is_updated = await db("users").where("email", email).update({
    //         authToken: account.authToken,
    //         accountSid: account.sid,
    //       });
    //       const key = await client.newKeys
    //         .create({
    //           friendlyName: "justcall",
    //         })
    //         .then(async (key) => {
    //           const is_updated = await db("users")
    //             .where("email", email)
    //             .update({
    //               api_key_sid: key.sid,
    //               api_key_secret: key.secret,
    //             });
    //         });
    //       const app = await client.applications
    //         .create({
    //           friendlyName: "justcall",
    //           voiceUrl: "https://desktopcrm.com:51/v1/user/calling/listen-call",
    //           smsUrl: "https://desktopcrm.com:51/v1/user/calling/recieve-sms",
    //         })
    //         .then(async (app) => {
    //           const is_updated = await db("users")
    //             .where("email", email)
    //             .update({
    //               twiml_app_sid: app.sid,
    //             });
    //         });
    //     }
    //   }
    // );
  }

  if (new_user) {
    var otp_code = Math.floor(Math.random() * 900000);
    const htmlMessage = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #008080;
                color: white;
                padding: 10px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
            }
            .otp {
                background-color: #f2f2f2;
                padding: 10px;
                border-radius: 4px;
                font-size: 24px;
                display: inline-block;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background-color: #008080;
                color: white;
                text-decoration: none;
                border-radius: 4px;
            }
            .footer {
                margin-top: 20px;
                color: #666666;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <p style="font-size:24px"><b>DesktopCRM</b></p>
                <p style="font-size:16px">Sign up email verification </p>
            </div>
            <div class="content">
                <p>Hello ${new_user.name},</p>
                <p>We have generated a one-time password (OTP) for your <b>DesktopCRM</b> account. Please use the following OTP to verify your identity:</p>
                <h2 class="otp">${otp_code}</h2>
                <p>This OTP is valid for a limited time period and can only be used once.</p>
                <p>If you did not initiate this action or have any concerns regarding your account security, please contact our support team immediately at [support@app.desktopcrm.com].</p>
            </div>
            <div class="footer">
                <p>Thank you,<br>The <b>DesktopCRM</b> Team</p>
            </div>
        </div>
    </body>
    </html>`;
    const sendResetOTP = await sendGridEmail(
      email,
      "Sign up Verification",
      htmlMessage
    );
    const dbOTP = await db("otps").insert({
      email: email,
      otp: otp_code,
      messageSid: sendResetOTP?.messageId,
      expires_at: moment().add(2, "hours").format("YYYY-MM-DD HH:mm:ss"),
    });

    if (dbOTP) {
      return helper.sendSuccess(req, res, { userData: new_user }, "Success");
    }
  }
});
exports.googleCallback = catchAssyncFunc(async (req, res, next) => {
  const { code, scope, authuser, prompt } = req.body;

  // Use the code to get tokens and authenticate the user
  passport.authenticate("google", (err, user, info) => {
    if (err || !user) {
      return res
        .status(400)
        .json({ message: "Authentication failed", error: err });
    }
    res.json({ message: "Authentication successful", user });
  })(req, res, next);
});
exports.signIn = catchAssyncFunc(async function (req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    type: Joi.boolean().optional(),
    authType: Joi.string().optional(),
    googleProfile: Joi.object().optional(),
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
  const { username, password, type, authType, googleProfile } = req.body;
  console.log("🚀 ~ req.body:", req.body);
  const is_exist_user = await db("users")
    .where("username", username)
    .orWhere("email", username)
    .first();
  if (!is_exist_user && !authType) {
    return helper.sendError(req, res, "Invalid username or password.", 403);
  }
  if (is_exist_user && is_exist_user.status !== "active") {
    return helper.sendError(req, res, "Your account is blocked.", 401);
  }
  if (type === true && password === is_exist_user?.password) {
    return createSession(is_exist_user, req, res);
  }
  if (authType === "google") {
    if (is_exist_user) {
      return createSession(is_exist_user, req, res);
    } else {
      const is_added_user = await db("users").insert({
        name: googleProfile?.name,
        username: googleProfile?.email,
        email: googleProfile?.email,
        password: "1234567890",
        avatar: googleProfile?.picture,
        verified: googleProfile?.email_verified,
        role: "USER",
      });
      console.log(
        "🚀 ~ constis_added_user=awaitdb ~ is_added_user:",
        is_added_user
      );
      const new_user = await db("users").where("id", is_added_user[0]).first();
      if (new_user) {
        return createSession(new_user, req, res);
      }
    }
  }
  const is_password_matched = await bcrypt.compare(
    password,
    is_exist_user?.password
  );
  if (!is_password_matched) {
    return helper.sendError(req, res, "Invalid username or password.", 403);
  }
  // return createSession(is_exist_user, req, res);
  const otp_code = Math.floor(Math.random() * 900000);
  const htmlMessage = `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #008080;
              color: white;
              padding: 10px;
              text-align: center;
              border-radius: 8px 8px 0 0;
          }
          .content {
              padding: 20px;
          }
          .otp {
              background-color: #f2f2f2;
              padding: 10px;
              border-radius: 4px;
              font-size: 24px;
              display: inline-block;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              background-color: #008080;
              color: white;
              text-decoration: none;
              border-radius: 4px;
          }
          .footer {
              margin-top: 20px;
              color: #666666;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <p style="font-size:24px"><b>DesktopCRM</b></p>
              <p style="font-size:16px">Two-Factor Authentication (2FA)</p>
          </div>
          <div class="content">
              <p>Hello ${is_exist_user.name},</p>
              <p>We have generated a one-time password (OTP) for your <b>DesktopCRM</b> account. Please use the following OTP to verify your identity:</p>
              <h2 class="otp">${otp_code}</h2>
              <p>This OTP is valid for a limited time period and can only be used once.</p>
              <p>If you did not initiate this action or have any concerns regarding your account security, please contact our support team immediately at [support@app.desktopcrm.com].</p>
          </div>
          <div class="footer">
              <p>Thank you,<br>The <b>DesktopCRM</b> Team</p>
          </div>
      </div>
  </body>
  </html>`;

  await sendGridEmail(is_exist_user?.email, "2FA Verification", htmlMessage);
  return helper.sendSuccess(
    req,
    res,
    {},
    "We have send an OTP verifcation email to your email address."
  );
});

exports.forgotPassword = catchAssyncFunc(async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    subject: Joi.string().optional(),
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
  const { email, subject } = req.body;
  const is_user_exist = await db("users").where("email", email).first();
  if (!is_user_exist) {
    return helper.sendSuccess(req, res, {}, "No user found.");
  }

  var otp_code = Math.floor(Math.random() * 900000);

  // const htmlMessage =
  //   "<h1>OTP for <b>DesktopCRM</b> App</h1><br></br><p>Hello " +
  //   is_user_exist.name +
  //   ",</p><p>We have generated a one-time password (OTP) for your  <b>DesktopCRM</b> account. Please use the following OTP to verify your identity:</p><h2 style='background-color: #f2f2f2; padding: 10px; border-radius: 4px; font-size: 24px; display: inline-block;'>[" +
  //   otp_code +
  //   "]</h2><p>This OTP is valid for a limited time period and can only be used once.</p><p>If you did not initiate this action or have any concerns regarding your account security, please contact our support team immediately at [Support Email/Phone Number].</p><br><a href='http://localhost:3000/reset-password-verification/" +
  //   is_user_exist?.email +
  //   "' >Reset Password</a><p>Thank you,<br>The <b>DesktopCRM</b> Team</p>";
  const htmlMessage = `
  <!DOCTYPE html>
  <html>
  <head>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
          }
          .email-container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
              background-color: #008080;
              color: white;
              padding: 10px;
              text-align: center;
              border-radius: 8px 8px 0 0;
          }
          .content {
              padding: 20px;
          }
          .otp {
              background-color: #f2f2f2;
              padding: 10px;
              border-radius: 4px;
              font-size: 24px;
              display: inline-block;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              background-color: #008080;
              color: white;
              text-decoration: none;
              border-radius: 4px;
          }
          .footer {
              margin-top: 20px;
              color: #666666;
          }
      </style>
  </head>
  <body>
      <div class="email-container">
          <div class="header">
              <p style="font-size:24px"><b>DesktopCRM</b></p>
              <p style="font-size:16px">Reset Password OTP </p>
          </div>
          <div class="content">
              <p>Hello ${is_user_exist.name},</p>
              <p>We have generated a one-time password (OTP) for your <b>DesktopCRM</b> account. Please use the following OTP to verify your identity:</p>
              <h2 class="otp">${otp_code}</h2>
              <p>This OTP is valid for a limited time period and can only be used once.</p>
              <p>If you did not initiate this action or have any concerns regarding your account security, please contact our support team immediately at [support@app.desktopcrm.com].</p>
          </div>
          <div class="footer">
              <p>Thank you,<br>The <b>DesktopCRM</b> Team</p>
          </div>
      </div>
  </body>
  </html>`;

  const sendResetOTP = await sendGridEmail(email, subject, htmlMessage);
  const dbOTP = await db("otps").insert({
    email: email,
    otp: otp_code,
    messageSid: sendResetOTP?.messageId,
    expires_at: moment().add(2, "hours").format("YYYY-MM-DD HH:mm:ss"),
  });
  if (dbOTP) {
    return helper.sendSuccess(
      req,
      res,
      { userData: is_user_exist },
      "OTP successfully sent."
    );
  }
  return helper.sendError(
    req,
    res,
    "Something went wrong while trying to send otp.",
    500
  );
});
exports.emailVerification = catchAssyncFunc(async (req, res, next) => {
  const schema = Joi.object({
    otp: Joi.number()
      .integer()
      .positive()
      .greater(100000)
      .less(1000000)
      .required(),
    email: Joi.string().email().required(),
    // password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  const { otp, email } = req.body;
  const currentTime = moment().format("YYYY-MM-DD HH:mm:ss");
  if (error) {
    return helper.sendError(
      req,
      res,
      "Validation failed " + error.message,
      403
    );
  }
  const is_exist = await db("otps")
    .where("otp", otp)
    .andWhere("email", email)
    .andWhere("expires_at", ">", currentTime)
    .first();
  if (!is_exist)
    return helper.sendError(req, res, "No otp found.Please try again.", 403);
  const user = await db("users").where("email", email).update({
    verified: true,
  });
  const exist_user = await db("users").where("email", email).first();
  const is_deleted = await db("otps")
    .select()
    .where("otp", otp)
    .andWhere("email", email)
    .andWhere("expires_at", ">", currentTime)
    .del();
  return helper.sendSuccess(req, res, { userData: exist_user }, "success");
  // if (exist_user && user && is_deleted)
  // return createSession(exist_user, req, res);
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
