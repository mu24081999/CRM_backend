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
router.get("/get-emails", IsAuth, getEmails);
router.post("/get-emails-by-email", IsAuth, getEmailsByEmail);
router.delete("/delete-email/:email_id", IsAuth, deleteEmail);

module.exports = router;
