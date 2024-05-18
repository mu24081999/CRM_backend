const express = require("express");
const router = express.Router();
const {
  sendEmail,
  updateEmail,
  getEmails,
  deleteEmail,
  getEmailsByEmail,
  getEmailsByAccount,
  sendEmailBulk,
} = require("../controllers/email");

const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/send-email", sendEmail);
router.post("/send-email-bulk", sendEmailBulk);
router.put("/update-email/:emailId", updateEmail);
router.get(
  "/get-emails/:user_email/:page_size/:page",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getEmails
);
router.get(
  "/get-emails-by-account",
  // IsAuth,
  // authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getEmailsByAccount
);
router.post(
  "/get-emails-by-email",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getEmailsByEmail
);
router.delete(
  "/delete-email/:email_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteEmail
);

module.exports = router;
