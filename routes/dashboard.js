const express = require("express");
const router = express.Router();
const { getDashboard, getTwilioRates } = require("../controllers/dashboard");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/get-dashboard",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getDashboard
);
router.post(
  "/get-twilio-rates",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getTwilioRates
);

module.exports = router;
