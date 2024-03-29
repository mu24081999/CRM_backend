const express = require("express");
const router = express.Router();
const {
  getUsers,
  readUser,
  softDeleteUser,
  updateStatus,
  updateUser,
} = require("../controllers/users");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get(
  "/get-users",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getUsers
);
router.get(
  "/user-details/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readUser
);
router.delete(
  "/delete-user/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  softDeleteUser
);
router.put(
  "/update-user-status/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateStatus
);
router.put(
  "/update-user-details/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateUser
);

module.exports = router;
