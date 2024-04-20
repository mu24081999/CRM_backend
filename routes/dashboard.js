const express = require("express");
const router = express.Router();
const { getDashboard } = require("../controllers/dashboard");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/get-dashboard",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getDashboard
);

module.exports = router;
