const express = require("express");
const router = express.Router();
const {
  getPackages,
  addPackages,
  updatePackages,
  readPackage,
} = require("../controllers/packages");
const { IsAuth, authorizedRole } = require("../middlewares/auth");

router.get(
  "/get-packages",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getPackages
);
router.get(
  "/get-package/:package_id",
  // IsAuth,
  // authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readPackage
);
router.post(
  "/add-package",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addPackages
);
router.put(
  "/update-package/:package_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updatePackages
);
module.exports = router;
