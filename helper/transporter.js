const nodeMailer = require("nodemailer");

// Function to create transporter for given credentials
function createTransporter(credentials, mail_provider, email_type) {
  return nodeMailer.createTransport({
    // service: "gmail",
    host:
      email_type === "professional_email" ? mail_provider : "smpt.gmail.com",
    port: "465",
    auth: {
      user: credentials.user,
      pass: credentials.pass,
    },
  });
}

// Map to store transporters for different credentials
const transporterMap = new Map();

// Function to get or create transporter for given credentials
function getTransporter(credentials, mail_provider, email_type) {
  if (transporterMap.has(credentials)) {
    return transporterMap.get(credentials);
  } else {
    const transporter = createTransporter(
      credentials,
      mail_provider,
      email_type
    );
    transporterMap.set(credentials, transporter);
    return transporter;
  }
}

module.exports = { getTransporter };
