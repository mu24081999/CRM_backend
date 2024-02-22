const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");
const nodeMailer = require("nodemailer");
const fs = require("fs");

exports.sendEmail = catchAssyncFunc(async function (req, res, next) {
  const { from, to, subject, body, type, parent_id } = req.body;
  console.log("🚀 ~ req.body:", req.body);
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      host: "smpt.gmail.com",
      port: "465",
      user: config.EMAIL_FROM_ACC,
      pass: config.EMAIL_FROM_ACC_PASS,
    },
  });

  if (Array.isArray(to)) {
    to.forEach(async (toEmail) => {
      const mailOptions = {
        from: from,
        to: toEmail,
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
          sender: from,
          reciever: emailResponse.envelope.to,
        };
      } else if (type === "reply") {
        emailData = {
          subject: subject,
          body: body,
          sender: from,
          reciever: emailResponse.envelope.to,
          parent_id: parent_id,
        };
      }
      const is_email_added = await db("emails").insert(emailData);
      if (!is_email_added) {
        return helper.sendError(req, res, "Error sending email.", 500);
      }
      if (req.files) {
        const { files } = req.files;
        if (Array.isArray(files)) {
          // Multiple files selected
          files.forEach(async (fileItem, index) => {
            // Read file content
            fs.readFile(fileItem.tempFilePath, async (err, data) => {
              if (err) {
                console.error("Error reading file:", err);
                return res.status(500).send("Internal Server Error");
              }
              // Handle each fileItem here
              const params = {
                Bucket: config.S3_BUCKET,
                Key: fileItem.name,
                Body: data,
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
                      file_type: fileItem.mimetype,
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
          });
        } else {
          const { name, tempFilePath, mimetype } = files;
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
                  const is_added = await db("email_attachments").insert({
                    file_link: data.Location,
                    size: fileItem.size,
                    file_type: fileItem.mimetype,
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
        }
      }
    });
  } else {
    const mailOptions = {
      from: from,
      to: to,
      subject: subject,
      text: body,
      // html: htmlMessage,
    };
    const emailResponse = await transporter.sendMail(mailOptions); // Upload file to S3
    console.log("🚀 ~ emailResponse:", emailResponse);
    let emailData;
    if (type === "email") {
      emailData = {
        subject: subject,
        body: body,
        sender: from,
        reciever: emailResponse.envelope.to,
      };
    } else if (type === "reply") {
      emailData = {
        subject: subject,
        body: body,
        sender: from,
        reciever: emailResponse.envelope.to,
        parent_id: parent_id,
      };
    }
    console.log("🚀 ~ emailData:", emailData);

    const is_email_added = await db("emails").insert(emailData);
    if (!is_email_added) {
      return helper.sendError(req, res, "Error sending email.", 500);
    }
    if (req.files) {
      const { files } = req.files;
      if (Array.isArray(files)) {
        // Multiple files selected
        files.forEach(async (fileItem, index) => {
          // Read file content
          fs.readFile(fileItem.tempFilePath, async (err, data) => {
            if (err) {
              console.error("Error reading file:", err);
              return res.status(500).send("Internal Server Error");
            }
            // Handle each fileItem here
            const params = {
              Bucket: config.S3_BUCKET,
              Key: fileItem.name,
              Body: data,
              file_type: fileItem.mimetype,
              ContentType: fileItem.mimetype,
            };
            console.log(params);

            const is_added = await new Promise((resolve, reject) => {
              s3.upload(params, {}, async (err, data) => {
                if (err) {
                  console.error(err);
                  reject(new Error("Error Uploading File: " + err));
                } else {
                  const is_added = await db("email_attachments").insert({
                    file_link: data.Location,
                    size: fileItem.size,
                    file_type: fileItem.mimetype,
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
        });
      } else {
        const { name, tempFilePath, mimetype, size } = files;
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
        });
      }
    }
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

  for (const element of emails) {
    element.files = await db("email_attachments")
      .where("email_id", element.id)
      .select();
  }
  return helper.sendSuccess(
    req,
    res,
    { emailsData: emails },
    "Email updated successfully."
  );
});
