const express = require("express");
const router = express.Router();
const {
  addSetting,
  updateSetting,
  readGeneralSettings,
  getGeneralSettings,
} = require("../controllers/generalSettings");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/post-setting",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addSetting
);
router.get(
  "/get-settings",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getGeneralSettings
);
router.put(
  "/update-setting/:setting_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateSetting
);
router.get(
  "/get-setting/:setting_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readGeneralSettings
);

module.exports = router;
