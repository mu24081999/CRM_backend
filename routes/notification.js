const express = require("express");
const router = express.Router();
const {
  getUserNotifications,
  updateNotification,
} = require("../controllers/notifications");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get(
  "/get-user-notifications/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getUserNotifications
);
router.put(
  "/update-user-notification/:notification_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateNotification
);

module.exports = router;
