// emailQueue.js

const nodemailer = require("nodemailer");
const Queue = require("bee-queue");

// Redis configuration (customize if needed)
const redisConfig = {
  host: "redis-18953.c8.us-east-1-4.ec2.redns.redis-cloud.com", // Redis server host
  port: 18953, // Redis server port
  password: "RVV54NgVq8oR9Uks9sB3IILZdyV4OQad", // Uncomment if your Redis server requires a password
};
// Create Bee-Queue instance
// Create Bee-Queue instance with Redis configuration
const emailQueue = new Queue("email", {
  redis: redisConfig,
});
// Create Nodemailer transporter
const createTransporter = (from, google_app_password) => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: from,
      pass: google_app_password,
    },
  });
};

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
// Process queue jobs
emailQueue.process(async (job) => {
  const { from, google_app_password, mailOptions, subject, body } = job.data;
  const transporter = createTransporter(from, google_app_password);
  const emailResponse = await sendEmail(transporter, mailOptions);
  console.log("🚀 ~ emailQueue.process ~ emailResponse:", emailResponse);
  let emailData = {}; // Initialize emailData to an empty object
  if (emailResponse) {
    emailData = {
      subject: subject,
      body: body,
      sender: from,
      reciever: emailResponse.envelope.to,
    };
  }
  await saveEmail(emailData);
  //   await delay(3000);
});
// Event listeners for better logging
emailQueue.on("succeeded", (job, result) => {
  console.log(`Job ${job.id} succeeded with result: ${result}`);
});

emailQueue.on("failed", (job, err) => {
  console.error(`Job ${job.id} failed with error: ${err.message}`);
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

// process.on("SIGINT", shutdown); // Listen for Ctrl+C
// process.on("SIGTERM", shutdown); // Listen for termination signal (e.g., from a process manager)

module.exports = {
  emailQueue,
};
