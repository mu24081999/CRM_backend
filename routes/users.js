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
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getUsers
);
router.get(
  "/user-details/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  readUser
);
router.delete(
  "/delete-user/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  softDeleteUser
);
router.put(
  "/update-user-status/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updateStatus
);
router.put(
  "/update-user-details/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updateUser
);

module.exports = router;
