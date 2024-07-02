const express = require("express");
const router = express.Router();
const {
  getAllBrands,
  readUserBrand,
  addUpdateBrand,
} = require("../controllers/brands");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get(
  "/get-brands",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getAllBrands
);
router.get(
  "/user-brand-details/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readUserBrand
);
router.post(
  "/add-update-brand",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addUpdateBrand
);

module.exports = router;
