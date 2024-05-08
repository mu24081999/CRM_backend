const express = require("express");
const router = express.Router();
const {
  createPayment,
  addPayment,
  getAllPayments,
  getUserPayments,
} = require("../controllers/payments");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/create-payment",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  createPayment
);
router.post(
  "/add_payment_record",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addPayment
);
router.get(
  "/get-payments",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getAllPayments
);
router.get(
  "/get-user-payments",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getUserPayments
);

module.exports = router;
