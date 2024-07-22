const express = require("express");
const router = express.Router();
const { createA2PVerification } = require("../controllers/a2pVerification");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/a2p-verification",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  createA2PVerification
);
module.exports = router;
