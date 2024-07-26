const express = require("express");
const router = express.Router();
const {
  addSubscription,
  deleteSubscription,
  readSubscriptions,
  getAllSubscriptions,
  getUserSubscriptions,
  updateSubscription,
} = require("../controllers/subscriptions");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/add-subscription",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addSubscription
);
router.put(
  "/update-subscription/:subscription_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateSubscription
);
router.get(
  "/get-subscriptions",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getAllSubscriptions
);
router.get(
  "/get-user-subscriptions",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getUserSubscriptions
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
