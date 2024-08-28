// emailQueue.js

const nodemailer = require("nodemailer");
const Queue = require("bee-queue");
const { getTransporter } = require("../helper/transporter");

// Redis configuration (customize if needed)
// const redisConfig = {
//   host: "redis-18953.c8.us-east-1-4.ec2.redns.redis-cloud.com", // Redis server host
//   port: 18953, // Redis server port
//   password: "RVV54NgVq8oR9Uks9sB3IILZdyV4OQad", // Uncomment if your Redis server requires a password
// };
const redisConfig = {
  host: "redis-11942.c103.us-east-1-mz.ec2.redns.redis-cloud.com",
  port: 11942,
  password: "N0XiF2vOwBHIgGGOs4XkQ85VdtEfuZ0b", // Uncomment if your Redis server requires a password
};

// Create Bee-Queue instance
// Create Bee-Queue instance with Redis configuration
const emailQueue = new Queue("email", {
  redis: redisConfig,
  activateDelayedJobs: true,
});
// Create Nodemailer transporter
// const createTransporter = (from, google_app_password) => {
//   return nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: from,
//       pass: google_app_password,
//     },
//   });
// };

// Function to send email
const sendEmail = async (transporter, mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId} to ${mailOptions.to}`);
    return info;
  } catch (err) {
    console.error(`Error sending email to ${mailOptions.to}: ${err}`);
    return false;
  }
};
const saveEmail = async (emailData) => {
  const is_email_added = await db("emails").insert(emailData);
  if (!is_email_added) {
    return helper.sendError(req, res, "Error sending email.", 500);
  }
  return is_email_added;
};
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
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
const uploadFiles = async (files, from) => {
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
        });
      })
    );
    return {
      status: is_email_attachments_added,
      attachments: email_attachments,
    };
  } else {
    const { tempFilePath, size, mimetype, name } = files;

    is_email_attachments_added = await new Promise(async (resolve, reject) => {
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
    });
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
// Process queue jobs
emailQueue.process(async (job) => {
  const {
    from,
    google_app_password,
    mailOptions,
    subject,
    body,
    files,
    email_type,
    mail_provider,
  } = job.data;
  let is_email_attachments_added;
  let is_attachments_saved;
  // const transporter = createTransporter(from, google_app_password);
  const credentials = {
    user: from,
    pass: google_app_password,
  };
  if (files) {
    is_email_attachments_added = await uploadFiles(files, from);
    mailOptions.attachments =
      is_email_attachments_added && is_email_attachments_added?.attachments;
  }
  const transporter = getTransporter(credentials, email_type, mail_provider);
  const emailResponse = await sendEmail(transporter, mailOptions);
  let emailData = {}; // Initialize emailData to an empty object
  if (emailResponse) {
    emailData = {
      subject: subject,
      body: body,
      sender: from,
      reciever: emailResponse.envelope.to,
    };
  }

  const email_response = await saveEmail(emailData);
  if (files) {
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
  await delay(15000);
});
// Event listeners for better logging
emailQueue.on("succeeded", (job, result) => {
  console.log(`Job ${job.id} succeeded with result: ${result}`);
});

emailQueue.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
});
emailQueue.on("progress", function (progress) {
  console.log("Job " + job.id + " reported progress: " + progress + "%");
});
// Handle graceful shutdown
const shutdown = () => {
  console.log("Shutting down gracefully...");
  emailQueue
    .close(5000) // wait up to 5 seconds for jobs to finish
    .then(() => {
      console.log("Queue closed. Exiting process.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("Error closing queue:", err);
      process.exit(1);
    });
};

process.on("SIGINT", shutdown); // Listen for Ctrl+C
process.on("SIGTERM", shutdown); // Listen for termination signal (e.g., from a process manager)

module.exports = {
  emailQueue,
};
