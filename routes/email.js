const express = require("express");
const router = express.Router();
const {
  sendEmail,
  updateEmail,
  getEmails,
  deleteEmail,
  getEmailsByEmail,
} = require("../controllers/email");

const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/send-email", sendEmail);
router.put("/update-email/:emailId", updateEmail);
router.get(
  "/get-emails",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getEmails
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
