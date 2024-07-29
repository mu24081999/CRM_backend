const express = require("express");
const router = express.Router();
const { IsAuth, authorizedRole } = require("../middlewares/auth");
const {
  createRegulatoryBundle,
  readRegulatoryBundle,
  getAllBundles,
  getUserBundles,
} = require("../controllers/regulatoryBundle");
router.post(
  "/create-regulatory-bundle",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  createRegulatoryBundle
);
router.get(
  "/read-regulatory-bundle/:bundle_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readRegulatoryBundle
);
router.get(
  "/get-user-regulatory-bundles/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getUserBundles
);
router.get(
  "/get-all-bundles",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getAllBundles
);
module.exports = router;
