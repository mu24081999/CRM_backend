const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");
const nodeMailer = require("nodemailer");
const fs = require("fs");
const Imap = require("node-imap");
const { simpleParser } = require("mailparser");

exports.getEmailsByAccount = catchAssyncFunc(async (req, res, next) => {
  const config = {
    user: "mu24081999@gmail.com",
    password: "isqzrulwfzdkitpl",
    host: "imap.gmail.com",
    port: 993,
    tls: true,
  };

  const imap = new Imap(config);
  const emails = [];

  // Function to fetch emails and return a promise
  const fetchEmails = () => {
    return new Promise((resolve, reject) => {
      imap.once("ready", () => {
        imap.openBox("INBOX", true, (err, box) => {
          if (err) {
            return reject(err);
          }

          const fetchOptions = {
            bodies: ["HEADER.FIELDS (FROM TO SUBJECT DATE)"], // Fetch headers and body
            struct: true,
          };

          const fetcher = imap.fetch("1:*", fetchOptions);

          fetcher.on("message", (msg, seqno) => {
            console.log("🚀 ~ fetcher.on ~ seqno:", seqno);
            const emailData = {};
            msg.on("body", (stream, info) => {
              if (info.which === "HEADER.FIELDS (FROM TO SUBJECT DATE)") {
                // Parse headers
                simpleParser(stream, (err, mail) => {
                  if (err) {
                    console.error(err);
                  } else {
                    emailData.from = mail.from.text;
                    emailData.to = mail.to.text;
                    emailData.subject = mail.subject;
                    emailData.date = mail.date;
                  }
                });
              } else if (info.which === "TEXT") {
                // Parse body
                let body = "";
                stream.on("data", (chunk) => {
                  body += chunk.toString();
                });
                stream.on("end", () => {
                  emailData.body = body;
                });
              }
            });

            msg.once("end", () => {
              emails.push(emailData);
            });
          });

          fetcher.on("end", () => {
            resolve(true);
            imap.end();
          });
        });
      });

      imap.once("error", (err) => {
        reject(err);
      });

      imap.connect();
    });
  };

  try {
    // Wait for fetchEmails to complete
    await fetchEmails();

    // Once fetching is complete, send the success response
    helper.sendSuccess(req, res, { emailsData: emails }, "success");
  } catch (err) {
    // Handle errors if fetching fails
    next(err);
  }
});
// exports.sendEmail = catchAssyncFunc(async function (req, res, next) {
//   const { from, to, subject, body, type, parent_id } = req.body;
//   console.log("🚀 ~ to:", req.body);
//   const transporter = nodeMailer.createTransport({
//     service: "gmail",
//     auth: {
//       host: "smpt.gmail.com",
//       port: "465",
//       user: config.EMAIL_FROM_ACC,
//       pass: config.EMAIL_FROM_ACC_PASS,
//     },
//   });
//   const saveAttachments = async (data) => {
//     const is_added = await db("email_attachments").insert({
//       file_link: data.file_link,
//       size: data.size,
//       file_type: data.file_type,
//       email_id: data.email_id,
//     });
//     if (!is_added) {
//       reject(new Error("Error Uploading File: " + err));
//       return helper.sendError(
//         req,
//         res,
//         "Something went wrong while uploading.",
//         500
//       );
//     }
//     return is_added;
//   };
//   const uploadFiles = async (files, is_email_added) => {
//     let is_email_attachments_added;
//     const email_attachments = [];
//     if (Array.isArray(files)) {
//       is_email_attachments_added = await Promise.all(
//         files.map(async (file) => {
//           return new Promise((resolve, reject) => {
//             fs.readFile(file.tempFilePath, async (err, data) => {
//               if (err) {
//                 console.error("Error reading file:", err);
//                 reject(new Error("Error reading file: " + err));
//                 return helper.sendError(
//                   req,
//                   res,
//                   "Error uploading files.",
//                   500
//                 );
//               }
//               const params = {
//                 Bucket: config.S3_BUCKET,
//                 Key: "emails/attachments/" + from + "/" + file.name,
//                 Body: data,
//                 ContentType: file.mimetype,
//               };
//               s3.upload(params, {}, async (err, data) => {
//                 if (err) {
//                   console.error(err);
//                   reject(new Error("Error Uploading File: " + err));
//                   return helper.sendError(
//                     req,
//                     res,
//                     "Error uploading files.",
//                     500
//                   );
//                 }

//                 email_attachments.push({
//                   filename: data.key,
//                   path: data.Location,
//                   size: file.size,
//                   file_type: file.mimetype,
//                 });
//                 resolve(true);
//               });
//             });
//           });
//         })
//       );
//       return {
//         status: is_email_attachments_added,
//         attachments: email_attachments,
//       };
//     } else {
//       const { tempFilePath, size, mimetype, name } = files;
//       is_email_attachments_added = await new Promise((resolve, reject) => {
//         fs.readFile(tempFilePath, async (err, data) => {
//           if (err) {
//             console.error("Error reading file:", err);
//             return helper.sendError(req, res, "Error uploading files.", 500);
//           }
//           const params = {
//             Bucket: config.S3_BUCKET,
//             Key: "emails/attachments/" + from + "/" + name,
//             Body: data,
//             ContentType: mimetype,
//           };
//           s3.upload(params, {}, async (err, data) => {
//             console.log("🚀 ~ s3.upload ~ data:", data);
//             if (err) {
//               console.error(err);
//               reject(new Error("Error Uploading File: " + err));
//             }
//             email_attachments.push({
//               filename: data.key,
//               path: data.Location,
//               size: size,
//               file_type: mimetype,
//             });
//             resolve(true);
//           });
//         });
//       });
//       if (!is_email_attachments_added) {
//         return helper.sendError(req, res, "Error uploading attachments.", 500);
//       }
//       console.log("Uploading attachments", {
//         status: is_email_attachments_added,
//         attachments: email_attachments,
//       });
//       return {
//         status: is_email_attachments_added,
//         attachments: email_attachments,
//       };
//     }
//   };
//   const sendEmail = async (mailOptions) => {
//     console.log("🚀 ~ sendEmail ~ mailOptions:", mailOptions);
//     const emailResponse = await transporter.sendMail(mailOptions); // Upload file to S3
//     return emailResponse;
//   };
//   const saveEmail = async (emailData) => {
//     console.log("🚀 ~ saveEmail ~ emailData:", emailData);
//     const is_email_added = await db("emails").insert(emailData);
//     if (!is_email_added) {
//       return helper.sendError(req, res, "Error sending email.", 500);
//     }
//     return is_email_added;
//   };

//   if (Array.isArray(to)) {
//     is_loop_completed = await Promise.all(
//       to.map(async (toEmail) => {
//         return new Promise(async (resolve, reject) => {
//           let email_response;
//           let emailResponse;
//           let is_email_attachments_added;

//           if (req.files) {
//             const { files } = req.files;
//             is_email_attachments_added = await uploadFiles(files);
//           }
//           let mailOptions = {};
//           if (req.files && is_email_attachments_added) {
//             console.log(
//               "Uploading email attachments",
//               is_email_attachments_added?.attachments
//             );
//             mailOptions = {
//               from: from,
//               to: toEmail,
//               subject: subject,
//               // text: body,
//               attachments:
//                 is_email_attachments_added &&
//                 is_email_attachments_added?.attachments,
//               // [
//               //   {
//               //     // use URL as an attachment
//               //     filename: "license.txt",
//               //     path: "https://raw.github.com/nodemailer/nodemailer/master/LICENSE",
//               //   },
//               //   {
//               //     // use URL as an attachment
//               //     filename: "license.txt",
//               //     path: "https://raw.github.com/nodemailer/nodemailer/master/LICENSE",
//               //   },
//               // ],

//               html: body,
//             };
//           } else {
//             mailOptions = {
//               from: from,
//               to: toEmail,
//               subject: subject,
//               // text: body,
//               html: body,
//             };
//           }

//           emailResponse = await sendEmail(mailOptions);
//           let emailData = {}; // Initialize emailData to an empty object
//           if (emailResponse) {
//             emailData = {
//               subject: subject,
//               body: body,
//               sender: from,
//               ...(type === "reply" && emailResponse
//                 ? {
//                     reciever: emailResponse.envelope.to,
//                     parent_id: parent_id,
//                   }
//                 : {
//                     reciever: emailResponse.envelope.to,
//                   }),
//             };
//           }
//           email_response = await saveEmail(emailData);
//           let is_attachments_saved;
//           if (
//             req.files &&
//             is_email_attachments_added &&
//             is_email_attachments_added?.attachments?.length > 0 &&
//             email_response
//           ) {
//             is_attachments_saved = await Promise.all(
//               is_email_attachments_added?.attachments?.map((file, inex) => {
//                 console.log(
//                   "🚀 ~ is_email_attachments_added?.attachments?.map ~ file:",
//                   file
//                 );
//                 return new Promise(async (resolve, reject) => {
//                   const is_added = await saveAttachments({
//                     email_id: email_response[0],
//                     file_link: file.path || file.href,
//                     size: file.size,
//                     file_type: file.file_type,
//                   });
//                   if (is_added) {
//                     resolve(true);
//                   }
//                 });
//               })
//             );
//           }
//           if (
//             emailResponse &&
//             email_response &&
//             (req.files
//               ? is_email_attachments_added.status && is_attachments_saved
//               : true)
//           ) {
//             console.log("type: " + type);
//             resolve(true);
//           }
//         });
//       })
//     );
//     if (is_loop_completed.every((completed) => completed)) {
//       return helper.sendSuccess(req, res, {}, "Emails sent successfully.");
//     }
//   } else {
//     let email_response;
//     let emailResponse;
//     let is_email_attachments_added;

//     if (req.files) {
//       const { files } = req.files;
//       is_email_attachments_added = await uploadFiles(files);
//     }
//     let mailOptions = {};
//     if (req.files && is_email_attachments_added) {
//       console.log(
//         "Uploading email attachments",
//         is_email_attachments_added?.attachments
//       );
//       mailOptions = {
//         from: from,
//         to: to,
//         subject: subject,
//         // text: body,
//         html: body,
//         attachments:
//           is_email_attachments_added && is_email_attachments_added?.attachments,
//       };
//     } else {
//       mailOptions = {
//         from: from,
//         to: to,
//         subject: subject,
//         // text: body,
//         html: body,
//       };
//     }

//     emailResponse = await sendEmail(mailOptions);
//     let emailData = {}; // Initialize emailData to an empty object
//     if (emailResponse) {
//       emailData = {
//         subject: subject,
//         body: body,
//         sender: from,
//         ...(type === "reply" && emailResponse
//           ? {
//               reciever: emailResponse.envelope.to,
//               parent_id: parent_id,
//             }
//           : {
//               reciever: emailResponse.envelope.to,
//             }),
//       };
//     }
//     email_response = await saveEmail(emailData);
//     let is_attachments_saved;
//     if (
//       req.files &&
//       is_email_attachments_added &&
//       is_email_attachments_added?.attachments?.length > 0 &&
//       email_response
//     ) {
//       is_attachments_saved = await Promise.all(
//         is_email_attachments_added?.attachments?.map((file, inex) => {
//           console.log(
//             "🚀 ~ is_email_attachments_added?.attachments?.map ~ file:",
//             file
//           );
//           return new Promise(async (resolve, reject) => {
//             const is_added = await saveAttachments({
//               email_id: email_response[0],
//               file_link: file.path || file.href,
//               size: file.size,
//               file_type: file.file_type,
//             });
//             if (is_added) {
//               resolve(true);
//             }
//           });
//         })
//       );
//     }
//     if (
//       emailResponse &&
//       email_response &&
//       (req.files
//         ? is_email_attachments_added.status && is_attachments_saved
//         : true)
//     ) {
//       return helper.sendSuccess(req, res, {}, "Emails sent successfully.");
//     }
//   }
// });

exports.sendEmail = catchAssyncFunc(async function (req, res, next) {
  const { from, to, subject, body, type, parent_id, google_app_password } =
    req.body;
  console.log(req.body, config.EMAIL_FROM_ACC, config.EMAIL_FROM_ACC_PASS);
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      // host: "smpt.gmail.com",
      // port: "465",
      // user: config.EMAIL_FROM_ACC,
      // pass: config.EMAIL_FROM_ACC_PASS,
      user: from,
      pass: google_app_password,
    },
  });
  const saveAttachments = async (data) => {
    const is_added = await db("email_attachments").insert({
      file_link: data.file_link,
      size: data.size,
      file_type: data.file_type,
      email_id: data.email_id,
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
    return is_added;
  };
  const uploadFiles = async (files, is_email_added) => {
    let is_email_attachments_added;
    const email_attachments = [];
    if (Array.isArray(files)) {
      is_email_attachments_added = await Promise.all(
        files.map(async (file) => {
          return new Promise(async (resolve, reject) => {
            const [fileData] = await storage
              .bucket("crm-justcall")
              .upload(file.tempFilePath, {
                // Specify the destination file name in GCS (optional)
                destination: "emails/attachments/" + from + "/" + file.name,
                // Set ACL to public-read
                predefinedAcl: "publicRead",
              });
            publicUrl = fileData.publicUrl();
            email_attachments.push({
              filename: file.name,
              path: publicUrl,
              size: file.size,
              file_type: file.mimetype,
            });
            resolve(true);
            // fs.readFile(file.tempFilePath, async (err, data) => {
            //   if (err) {
            //     console.error("Error reading file:", err);
            //     reject(new Error("Error reading file: " + err));
            //     return helper.sendError(
            //       req,
            //       res,
            //       "Error uploading files.",
            //       500
            //     );
            //   }
            //   const params = {
            //     Bucket: config.S3_BUCKET,
            //     Key: "emails/attachments/" + from + "/" + file.name,
            //     Body: data,
            //     ContentType: file.mimetype,
            //   };
            //   s3.upload(params, {}, async (err, data) => {
            //     if (err) {
            //       console.error(err);
            //       reject(new Error("Error Uploading File: " + err));
            //       return helper.sendError(
            //         req,
            //         res,
            //         "Error uploading files.",
            //         500
            //       );
            //     }

            //     email_attachments.push({
            //       filename: data.key,
            //       path: data.Location,
            //       size: file.size,
            //       file_type: file.mimetype,
            //     });
            //     resolve(true);
            //   });
            // });
          });
        })
      );
      return {
        status: is_email_attachments_added,
        attachments: email_attachments,
      };
    } else {
      const { tempFilePath, size, mimetype, name } = files;

      is_email_attachments_added = await new Promise(
        async (resolve, reject) => {
          const [fileData] = await storage
            .bucket("crm-justcall")
            .upload(tempFilePath, {
              // Specify the destination file name in GCS (optional)
              destination: "emails/attachments/" + from + "/" + name,

              // Set ACL to public-read
              predefinedAcl: "publicRead",
            });
          publicUrl = fileData.publicUrl();
          email_attachments.push({
            filename: name,
            path: publicUrl,
            size: size,
            file_type: mimetype,
          });
          resolve(true);
          // fs.readFile(tempFilePath, async (err, data) => {
          //   if (err) {
          //     console.error("Error reading file:", err);
          //     return helper.sendError(req, res, "Error uploading files.", 500);
          //   }
          //   const params = {
          //     Bucket: config.S3_BUCKET,
          //     Key: "emails/attachments/" + from + "/" + name,
          //     Body: data,
          //     ContentType: mimetype,
          //   };
          //   s3.upload(params, {}, async (err, data) => {
          //     console.log("🚀 ~ s3.upload ~ data:", data);
          //     if (err) {
          //       console.error(err);
          //       reject(new Error("Error Uploading File: " + err));
          //     }
          //     email_attachments.push({
          //       filename: data.key,
          //       path: data.Location,
          //       size: size,
          //       file_type: mimetype,
          //     });
          //     resolve(true);
          //   });
          // });
        }
      );
      if (!is_email_attachments_added) {
        return helper.sendError(req, res, "Error uploading attachments.", 500);
      }
      console.log("Uploading attachments", {
        status: is_email_attachments_added,
        attachments: email_attachments,
      });
      return {
        status: is_email_attachments_added,
        attachments: email_attachments,
      };
    }
  };
  const sendEmail = async (mailOptions) => {
    console.log("🚀 ~ sendEmail ~ mailOptions:", mailOptions);
    const emailResponse = await transporter.sendMail(mailOptions); // Upload file to S3
    return emailResponse;
  };
  const saveEmail = async (emailData) => {
    const is_email_added = await db("emails").insert(emailData);
    if (!is_email_added) {
      return helper.sendError(req, res, "Error sending email.", 500);
    }
    return is_email_added;
  };

  if (Array.isArray(to)) {
    is_loop_completed = await Promise.all(
      to.map(async (toEmail) => {
        return new Promise(async (resolve, reject) => {
          let email_response;
          let emailResponse;
          let is_email_attachments_added;

          if (req.files) {
            const { files } = req.files;
            is_email_attachments_added = await uploadFiles(files);
          }
          let mailOptions = {};
          if (req.files && is_email_attachments_added) {
            console.log(
              "Uploading email attachments",
              is_email_attachments_added?.attachments
            );
            mailOptions = {
              // from: from,
              from: `"Desktop-CRM" <${from}>`,
              to: toEmail,
              subject: subject,
              // text: body,
              attachments:
                is_email_attachments_added &&
                is_email_attachments_added?.attachments,
              // [
              //   {
              //     // use URL as an attachment
              //     filename: "license.txt",
              //     path: "https://raw.github.com/nodemailer/nodemailer/master/LICENSE",
              //   }
              // ],

              html: body,
            };
          } else {
            mailOptions = {
              from: `"Desktop-CRM" <${from}>`,
              to: toEmail,
              subject: subject,
              // text: body,
              html: body,
            };
          }

          emailResponse = await sendEmail(mailOptions);
          let emailData = {}; // Initialize emailData to an empty object
          if (emailResponse) {
            emailData = {
              subject: subject,
              body: body,
              sender: from,
              ...(type === "reply" && emailResponse
                ? {
                    reciever: emailResponse.envelope.to,
                    parent_id: parent_id,
                  }
                : {
                    reciever: emailResponse.envelope.to,
                  }),
            };
          }
          email_response = await saveEmail(emailData);
          let is_attachments_saved;
          if (
            req.files &&
            is_email_attachments_added &&
            is_email_attachments_added?.attachments?.length > 0 &&
            email_response
          ) {
            is_attachments_saved = await Promise.all(
              is_email_attachments_added?.attachments?.map((file, inex) => {
                return new Promise(async (resolve, reject) => {
                  const is_added = await saveAttachments({
                    email_id: email_response[0],
                    file_link: file.path || file.href,
                    size: file.size,
                    file_type: file.file_type,
                  });
                  if (is_added) {
                    resolve(true);
                  }
                });
              })
            );
          }
          if (
            emailResponse &&
            email_response &&
            (req.files
              ? is_email_attachments_added.status && is_attachments_saved
              : true)
          ) {
            console.log("type: " + type);
            resolve(true);
          }
        });
      })
    );
    if (is_loop_completed.every((completed) => completed)) {
      return helper.sendSuccess(req, res, {}, "Emails sent successfully.");
    }
  } else {
    let email_response;
    let emailResponse;
    let is_email_attachments_added;

    if (req.files) {
      const { files } = req.files;
      is_email_attachments_added = await uploadFiles(files);
    }
    let mailOptions = {};
    if (req.files && is_email_attachments_added) {
      console.log(
        "Uploading email attachments",
        is_email_attachments_added?.attachments
      );
      mailOptions = {
        // from: from,
        from: `"Desktop-CRM" <${from}>`,
        to: to,
        subject: subject,
        // text: body,
        html: body,
        attachments:
          is_email_attachments_added && is_email_attachments_added?.attachments,
      };
    } else {
      mailOptions = {
        // from: from,
        from: `"Desktop-CRM" <${from}>`,
        to: to,
        subject: subject,
        // text: body,
        html: body,
      };
    }

    emailResponse = await sendEmail(mailOptions);
    let emailData = {}; // Initialize emailData to an empty object
    if (emailResponse) {
      emailData = {
        subject: subject,
        body: body,
        sender: from,
        ...(type === "reply" && emailResponse
          ? {
              reciever: emailResponse.envelope.to,
              parent_id: parent_id,
            }
          : {
              reciever: emailResponse.envelope.to,
            }),
      };
    }
    email_response = await saveEmail(emailData);
    let is_attachments_saved;
    if (
      req.files &&
      is_email_attachments_added &&
      is_email_attachments_added?.attachments?.length > 0 &&
      email_response
    ) {
      is_attachments_saved = await Promise.all(
        is_email_attachments_added?.attachments?.map((file, inex) => {
          return new Promise(async (resolve, reject) => {
            const is_added = await saveAttachments({
              email_id: email_response[0],
              file_link: file.path || file.href,
              size: file.size,
              file_type: file.file_type,
            });
            if (is_added) {
              resolve(true);
            }
          });
        })
      );
    }
    if (
      emailResponse &&
      email_response &&
      (req.files
        ? is_email_attachments_added.status && is_attachments_saved
        : true)
    ) {
      return helper.sendSuccess(req, res, {}, "Emails sent successfully.");
    }
  }
});

exports.updateEmail = catchAssyncFunc(async function (req, res, next) {
  const { emailId } = req.params;
  const { isDeleted, isRead, status } = req.body;
  const is_email_updated = await db("emails").where("id", emailId).update({
    is_deleted: isDeleted,
    is_read: isRead,
    status: status,
  });
  return helper.sendSuccess(req, res, {}, "Success.");
});
exports.getEmails = catchAssyncFunc(async function (req, res, next) {
  const user = await db("users").where("id", req.user.id).first();
  console.log("🚀 ~ user:", user);
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
exports.getEmailsByEmail = catchAssyncFunc(async function (req, res, next) {
  const { senderEmail, recieverEmail } = req.body;
  const emails = await db("emails")
    .where({ sender: senderEmail, reciever: recieverEmail })
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
exports.deleteEmail = catchAssyncFunc(async function (req, res, next) {
  const { email_id } = req.params;
  const is_deleted = await db("emails").where("id", email_id).update({
    status: "blocked",
  });
  return helper.sendSuccess(req, res, {}, "Email deleted successfully.");
});
