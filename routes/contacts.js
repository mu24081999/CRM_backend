const express = require("express");
const router = express.Router();
const { addContact } = require("../controllers/contacts");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/post-contact", IsAuth, addContact);

module.exports = router;
