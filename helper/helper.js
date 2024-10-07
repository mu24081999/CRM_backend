const nodeMailer = require("nodemailer");
module.exports = {
  sendError: function (req, res, errorMessage, errorCode) {
    res.send({
      action: req.originalUrl,
      statusCode: errorCode,
      message: errorMessage,
      data: {},
    });
  },
  sendSuccess: function (req, res, data, successMessage) {
    res.send({
      action: req.originalUrl,
      statusCode: 200,
      message: successMessage,
      data: data,
    });
  },
  sendEmail: async function (
    req,
    res,
    subject,
    toEmail,
    textMessage,
    htmlMessage
  ) {
    try {
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
        from: `"Desktop-CRM" <${process.env.EMAIL_FROM_ACC}>`,
        to: toEmail,
        subject: subject,
        text: textMessage,
        html: htmlMessage,
      };
      const emailResponse = await transporter
        .sendMail(mailOptions)
        .then((email_response) => {
          console.log(email_response);
        })
        .catch((error) => {
          console.log("Email Error:", error);
        });
      return emailResponse;
    } catch (error) {
      res.send({
        action: req.originalUrl,
        code: 500,
        status: false,
        data: {
          error: error,
        },
        message: "Something went wrong. Please try again.",
      });
    }
  },
  // Verify Token
  verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== "undefined") {
      // Split at the space
      const bearer = bearerHeader.split(" ");
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      return res.sendStatus(403);
    }
  },
  makeid() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },
  validateEmail: function (email) {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  validatePhone: function (phone) {
    var valid_number = phone.replace("+", "00");
    valid_number = valid_number.replace(/-/g, "");
    valid_number = valid_number.replace(/ /g, "");
    valid_number = valid_number.replace(/[\])}[{(]/g, "");
    valid_number = valid_number.substr(valid_number.length - 9);
    return valid_number;
  },
};
