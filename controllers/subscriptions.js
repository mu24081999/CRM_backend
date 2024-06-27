const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const nodemailer = require("nodemailer");
const moment = require("moment");
exports.getAllSubscriptions = catchAssyncFunc(async function (req, res, next) {
  const subscriptions = await db("subscriptions").select();
  return helper.sendSuccess(
    req,
    res,
    {
      subscriptionsData: subscriptions,
    },
    "success"
  );
});
exports.getUserSubscriptions = catchAssyncFunc(async function (req, res, next) {
  const subscriptions = await db("subscriptions")
    .where("customer_id", req.user.id)
    .select();
  return helper.sendSuccess(
    req,
    res,
    {
      subscriptionsData: subscriptions,
    },
    "success"
  );
});

exports.readSubscriptions = catchAssyncFunc(async function (req, res, next) {
  const { subscription_id } = req.params;
  const subscription = await db("subscriptions")
    .where("id", subscription_id)
    .first();
  return helper.sendSuccess(
    req,
    res,
    {
      subscriptionData: subscription,
    },
    "success"
  );
});
exports.deleteSubscription = catchAssyncFunc(async function (req, res, next) {
  const { subscription_id } = req.params;
  const subscription = await db("subscriptions")
    .where("id", subscription_id)
    .update({
      visibility: "deleted",
    });
  return helper.sendSuccess(req, res, {}, "Subscription deleted successfully.");
});
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
exports.addSubscription = catchAssyncFunc(async function (req, res, next) {
  const { customer_id, plan, start_date, end_date, plan_type, amount_payed } =
    req.body;
  const is_record_inserted = await db("subscriptions").insert({
    customer_id,
    plan,
    start_date,
    end_date,
    plan_type,
    amount_payed,
  });
  const user = await db("users").where("id", customer_id).first();
  const amount_paid = parseInt(amount_payed) / 100;
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
              background-color: #28a745;
              color: white;
              padding: 10px;
              text-align: center;
              border-radius: 8px 8px 0 0;
          }
          .content {
              padding: 20px;
          }
          .button {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              background-color: #28a745;
              color: white;
              text-decoration: none;
              border-radius: 4px;
              text-decoration: none;
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
              <p style="font-size:16px">Payment Successful</p>
          </div>
          <div class="content">
              <p>Hello ${user.name},</p>
              <p>We are pleased to inform you that your payment for the <b>${plan}</b> package has been successfully processed.</p>
              <p>Details of your purchase are as follows:</p>
              <ul>
                  <li>Package: ${plan}</li>
                  <li>Amount Paid: $${amount_paid}</li>
                  <li>Date of Purchase: ${moment(new Date()).format(
                    "ddd MMM,YYYY"
                  )}</li>
              </ul>
              <p>We hope you enjoy the benefits of your selected package. Should you have any questions or need further assistance, please do not hesitate to contact our support team at [support@app.desktopcrm.com].</p>
              <a href="https://app.desktopcrm.com" class="button">Go to Dashboard</a>
          </div>
          <div class="footer">
              <p>Thank you for choosing <b>DesktopCRM</b>!<br>The <b>DesktopCRM</b> Team</p>
          </div>
      </div>
  </body>
  </html>`;

  const sendEmail = await sendGridEmail(
    user?.email,
    "Subscription payment success",
    htmlMessage
  );
  return helper.sendSuccess(req, res, {}, "Subscription successfully created.");
});
