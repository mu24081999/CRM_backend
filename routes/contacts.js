const express = require("express");
const router = express.Router();
const {
  addContact,
  getContacts,
  deleteContact,
  readContact,
  updateContact,
  uploadFile,
} = require("../controllers/contacts");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/post-contact",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  addContact
);
router.get(
  "/get-contacts",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getContacts
);
router.post("/upload-file", uploadFile);
router.get(
  "/delete-contact/:contact_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  deleteContact
);
router.get(
  "/contact-details/:contact_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  readContact
);
router.put(
  "/contact-update/:contact_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updateContact
);

module.exports = router;
