const express = require("express");
const router = express.Router();
const {
  addContact,
  getContacts,
  deleteContact,
  readContact,
  updateContact,
  uploadFile,
  getContactsByBoard,
} = require("../controllers/contacts");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/post-contact",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addContact
);
router.get(
  "/get-contacts",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getContacts
);
router.get(
  "/get-contacts-by-board/:board_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getContactsByBoard
);
router.post("/upload-file", uploadFile);
router.get(
  "/delete-contact/:contact_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteContact
);
router.get(
  "/contact-details/:contact_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readContact
);
router.put(
  "/contact-update/:contact_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateContact
);

module.exports = router;
