const nodeMailer = require("nodemailer");

// Function to create transporter for given credentials
function createTransporter(credentials) {
  return nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: credentials.user,
      pass: credentials.pass,
    },
  });
}

// Map to store transporters for different credentials
const transporterMap = new Map();

// Function to get or create transporter for given credentials
function getTransporter(credentials) {
  if (transporterMap.has(credentials)) {
    return transporterMap.get(credentials);
  } else {
    const transporter = createTransporter(credentials);
    transporterMap.set(credentials, transporter);
    return transporter;
  }
}

module.exports = { getTransporter };
