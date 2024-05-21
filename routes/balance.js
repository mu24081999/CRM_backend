const express = require("express");
const router = express.Router();
const {
  addUpdateUserBalance,
  getUserBalance,
} = require("../controllers/balance");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/add-balance",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addUpdateUserBalance
);
router.get(
  "/get-user-balance",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getUserBalance
);

module.exports = router;
