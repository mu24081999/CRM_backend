const express = require("express");
const router = express.Router();
const {
  addPermissions,
  getUserPermissions,
} = require("../controllers/permissions");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/add-permissions",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addPermissions
);
router.get(
  "/get-user-permissions/:subaccount_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getUserPermissions
);

module.exports = router;
