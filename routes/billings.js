const express = require("express");
const router = express.Router();
const {
  addBilling,
  getUserBillings,
  deleteBilling,
  readBilling,
  updateBilling,
} = require("../controllers/billings");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/add-billing",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addBilling
);
router.get(
  "/get-user-billing",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getUserBillings
);
router.delete(
  "/delete-billing/:billing_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteBilling
);
router.get(
  "/billing-details/:billing_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readBilling
);
router.put(
  "/billing-update/:billing_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateBilling
);

module.exports = router;
