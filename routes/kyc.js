const express = require("express");
const router = express.Router();
const {
  addKYCForm,
  getKYCForms,
  deleteKYCForm,
  readKYCForm,
  updateKYCForm,
  getUserKYCForms,
} = require("../controllers/kyc");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/post-kyc",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addKYCForm
);
router.get(
  "/get-kycs",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getKYCForms
);
router.get(
  "/get-user-kycs",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getUserKYCForms
);
router.delete(
  "/delete-kyc/:form_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteKYCForm
);
router.get(
  "/kyc-details/:form_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readKYCForm
);
router.put(
  "/kyc-update/:form_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateKYCForm
);

module.exports = router;
