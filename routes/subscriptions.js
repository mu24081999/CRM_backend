const express = require("express");
const router = express.Router();
const {
  addSubscription,
  deleteSubscription,
  readSubscriptions,
  getAllSubscriptions,
} = require("../controllers/subscriptions");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/add-subscription",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addSubscription
);
router.get(
  "/get-subscriptions",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getAllSubscriptions
);
router.delete(
  "/delete-subscription/:subscription_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteSubscription
);
router.get(
  "/subscription-details/:subscription_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readSubscriptions
);

module.exports = router;
