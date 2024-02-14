const express = require("express");
const router = express.Router();
const {
  addContact,
  getContacts,
  deleteContact,
  readContact,
} = require("../controllers/contacts");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/post-contact", IsAuth, addContact);
router.get("/get-contacts", IsAuth, getContacts);
router.get("/delete-contact/:contact_id", IsAuth, deleteContact);
router.get("/contact-details/:contact_id", IsAuth, readContact);

module.exports = router;
