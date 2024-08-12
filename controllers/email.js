const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");
const nodeMailer = require("nodemailer");
const fs = require("fs");
const Imap = require("node-imap");
const { simpleParser } = require("mailparser");
const { emailQueue } = require("../Queue/BulkEmails");
const nodemailer = require("nodemailer");
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
exports.sendGridEmail = catchAssyncFunc(async (req, res, next) => {
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
    from: `"Desktopcrm" <support@app.desktopcrm.com>`, // Sender address
    to: "mu24081999@gmail.com", // List of recipients
    subject: "Sending Email using Nodemailer with SendGrid",
    text: "This is a test email sent using Nodemailer with SendGrid.",
    html: "<strong>This is a test email sent using Nodemailer with SendGrid.</strong>",
  };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error:", error);
    }
    console.log("Email sent:", info);
  });
  res.end();
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
  const {
    from,
    to,
    subject,
    body,
    type,
    parent_id,
    google_app_password,
    from_name,
  } = req.body;
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      // host: "smtp.ethereal.email",
      // port: 587,
      secure: true, // Use `true` for port 465, `false` for all other ports
      host: "smpt.gmail.com",
      port: "465",
      pool: true,
      user: from,
      pass: google_app_password,
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      },
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
  // Function to simulate delay
  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const sendEmail = async (mailOptions) => {
    const emailResponse = await transporter.sendMail(mailOptions); // Upload file to S3
    await delay(30000);
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
              from: `${from_name} <${from}>`,
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
              from: `${from_name} <${from}>`,
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
      mailOptions = {
        // from: from,
        from: `${from_name} <${from}>`,
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
        from: `${from_name} <${from}>`,
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
  transporter.close();
});
exports.sendEmailBulk = catchAssyncFunc(async function (req, res, next) {
  const {
    from,
    to,
    subject,
    body,
    type,
    parent_id,
    google_app_password,
    from_name,
  } = req.body;
  const send_bulk = async () => {
    const files = req.files;

    if (Array.isArray(to)) {
      const is_all_enqueued = await Promise.all(
        to?.map(async (email, index) => {
          return new Promise(async (resolve, reject) => {
            const mailOptions = {
              from: `${from_name} <${from}>`,
              to: email,
              subject: subject,
              html: body,
            };
            // Enqueue email job
            await emailQueue
              .createJob({
                from,
                google_app_password,
                mailOptions,
                subject,
                body,
                files: files?.files,
              })
              .delayUntil(Date.now() + 15000) // Delay for 15 seconds
              .save()
              .then(() => resolve(true))
              .catch((err) => reject(err));
            resolve(true);
          });
        })
      );
    }
    return helper.sendSuccess(req, res, {}, "Email enqueued successfully.");
  };
  const today = new Date();
  const formattedToday = moment(today).format("YYYY-MM-DD");
  const user = await db("users").where("email", from).first();
  console.log("🚀 ~ user:", user);
  if (
    moment(user?.last_bulk_email_request_send).format("YYYY-MM-DD") !==
    formattedToday
  ) {
    const update_user = await db("users").where("email", user?.email).update({
      last_bulk_email_request_send: formattedToday,
      bulk_emails_request_count: 0,
    });
  }
  const user_subscription = await db("subscriptions")
    .where("customer_id", user?.id)
    .first();
  if (
    user_subscription?.plan === "Solo Starter" &&
    user?.bulk_emails_request_count === 0
  ) {
    send_bulk();
  } else if (
    user_subscription?.plan === "Growth" &&
    user?.bulk_emails_request_count > 0 &&
    user?.bulk_emails_request_count < 2
  ) {
    send_bulk();
  } else if (
    user_subscription?.plan === "Enterprise" &&
    user?.bulk_emails_request_count > 0 &&
    user?.bulk_emails_request_count < 4
  ) {
    send_bulk();
  } else {
    return helper.sendError(
      req,
      res,
      "You have reached your daily limits",
      400
    );
  }
  // Construct mailOptions
  // const mailOptions = {
  //   from: `${from_name} <${from}>`,
  //   to: Array.isArray(to) ? to.join(", ") : to,
  //   subject: subject,
  //   html: body,
  // };
  // const transporter = nodeMailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     user: from,
  //     pass: google_app_password,
  //   },
  // });
  // // Enqueue email job
  // await emailQueue
  //   .createJob({ from, google_app_password, mailOptions, subject, body })
  //   .delayUntil(10000)
  //   .save();
  // return helper.sendSuccess(req, res, {}, "Email enqueued successfully.");
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
  const user_email = req.params.user_email;
  const page = parseInt(req.params.page) || 1;
  const pageSize = parseInt(req.params.page_size) || 10;
  const offset = (page - 1) * pageSize;
  const emails = await db("emails")
    .where("sender", user_email)
    .orWhere("reciever", user_email)
    .limit(pageSize)
    .offset(offset)
    .select()
    .orderBy("created_at", "desc");

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
  const is_deleted = await db("emails").where("id", email_id).del();
  return helper.sendSuccess(req, res, {}, "Email deleted successfully.");
});
