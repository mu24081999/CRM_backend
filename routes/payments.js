const express = require("express");
const router = express.Router();
const { createPayment } = require("../controllers/payments");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/create-payment",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  createPayment
);

module.exports = router;
