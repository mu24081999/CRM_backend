const express = require("express");
const router = express.Router();
const { getUserNotifications } = require("../controllers/notifications");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get(
  "/get-user-notifications/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getUserNotifications
);

module.exports = router;
