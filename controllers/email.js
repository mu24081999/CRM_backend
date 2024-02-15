const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");
const nodeMailer = require("nodemailer");

exports.sendEmail = catchAssyncFunc(async function (req, res, next) {
  const { from, to, subject, body, type, parentId } = req.body;
  const { file } = req.files;
  const { name, mimetype, data, size } = file;
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      host: "smpt.gmail.com",
      port: "465",
      user: process.env.EMAIL_FROM_ACC,
      pass: process.env.EMAIL_FROM_ACC_PASS,
    },
  });

  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: body,
    // html: htmlMessage,
  };
  const emailResponse = await transporter.sendMail(mailOptions); // Upload file to S3
  let emailData;
  if (type === "email") {
    emailData = {
      subject: subject,
      body: body,
      sender: emailResponse.envelope.from,
      reciever: emailResponse.envelope.to,
    };
  } else if (type === "reply") {
    emailData = {
      subject: subject,
      body: body,
      sender: emailResponse.envelope.from,
      reciever: emailResponse.envelope.to,
      parent_id: parentId,
    };
  }
  const is_email_added = await db("emails").insert(emailData);
  if (!is_email_added) {
    return helper.sendError(req, res, "Error sending email.", 500);
  }
  if (Array.isArray(file)) {
    // Multiple files selected
    file.forEach(async (fileItem, index) => {
      // Handle each fileItem here
      const params = {
        Bucket: process.env.S3_BUCKET,
        Key: fileItem.name,
        Body: fileItem.data,
        ContentType: fileItem.mimetype,
      };

      const is_added = await new Promise((resolve, reject) => {
        s3.upload(params, {}, async (err, data) => {
          if (err) {
            console.error(err);
            reject(new Error("Error Uploading File: " + err));
          } else {
            const is_added = await db("email_attachments").insert({
              file_link: data.Location,
              size: fileItem.size,
              email_id: is_email_added[0],
            });
            if (!is_added) {
              reject(new Error("Error Uploading File: " + err));
              return helper.sendError(
                req,
                res,
                "Something went wrong while uploading.",
                500
              );
            }
            resolve(true);
          }
        });
      });
    });
  } else {
    // Single file selected
    const params = {
      Bucket: process.env.S3_BUCKET,
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
          const is_added = await db("email_attachments").insert({
            file_link: data.Location,
            size: size,
            email_id: is_email_added[0],
          });
          if (!is_added) {
            reject(new Error("Error Uploading File: " + err));
            return helper.sendError(
              req,
              res,
              "Something went wrong while uploading.",
              500
            );
          }
          resolve(true);
        }
      });
    });
    // return helper.sendSuccess(req, res, { data }, "File uploaded successfully");
  }

  return helper.sendSuccess(
    req,
    res,
    // { emailData: emailResponse },
    {},
    "Email sent successfully."
  );
});

exports.updateEmail = catchAssyncFunc(async function (req, res, next) {
  const { emailId } = req.params;
  const { isDeleted, isRead } = req.body;
  const is_email_updated = await db("emails").where("id", emailId).update({
    is_deleted: isDeleted,
    is_read: isRead,
  });
  return helper.sendSuccess(req, res, {}, "Email updated successfully.");
});
exports.getEmails = catchAssyncFunc(async function (req, res, next) {
  const user = await db("users").where("id", req.user.id).first();
  const emails = await db("emails")
    .where("sender", user.email)
    .orWhere("reciever", user.email)
    .select();
  return helper.sendSuccess(
    req,
    res,
    { emailsData: emails },
    "Email updated successfully."
  );
});
