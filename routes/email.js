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
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getEmails
);
router.post(
  "/get-emails-by-email",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getEmailsByEmail
);
router.delete(
  "/delete-email/:email_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  deleteEmail
);

module.exports = router;
