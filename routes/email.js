const express = require("express");
const router = express.Router();
const { sendEmail, updateEmail, getEmails } = require("../controllers/email");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/send-email", sendEmail);
router.put("/update-email/:emailId", updateEmail);
router.get("/get-emails", IsAuth, getEmails);

module.exports = router;
