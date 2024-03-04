const express = require("express");
const router = express.Router();
const { callUser, listPhoneNumbers } = require("../controllers/call");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get("/call-user", callUser);
router.get("/list-phone-numbers", listPhoneNumbers);

module.exports = router;
