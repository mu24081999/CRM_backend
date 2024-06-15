const express = require("express");
const router = express.Router();
const { IsAuth, authorizedRole } = require("../middlewares/auth");
const {
  addRates,
  updateRates,
  readRate,
} = require("../controllers/plan-rates");
router.post(
  "/add-rate",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addRates
);
router.put(
  "/update-rate/:rate_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateRates
);
router.get(
  "/plan-rate/:rate_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readRate
);

module.exports = router;
