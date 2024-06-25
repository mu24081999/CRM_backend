const express = require("express");
const router = express.Router();
const { getDashboard, getTwilioPricing } = require("../controllers/dashboard");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/get-dashboard",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getDashboard
);

router.post(
  "/get-pricing",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getTwilioPricing
);
module.exports = router;
