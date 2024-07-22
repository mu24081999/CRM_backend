const express = require("express");
const router = express.Router();
const {
  createA2PVerification,
  updateA2PVerification,
  getAllVerifications,
} = require("../controllers/a2pVerification");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/a2p-verification",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  createA2PVerification
);
router.put(
  "/update-a2p-verification/:verification_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateA2PVerification
);
router.get(
  "/read-verification/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateA2PVerification
);
router.get(
  "/get-verifications",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getAllVerifications
);
module.exports = router;
