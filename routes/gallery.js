const express = require("express");
const router = express.Router();
const {
  addFile,
  getAllFiles,
  deleteFile,
  readFile,
} = require("../controllers/gallery");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/post-file",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addFile
);
router.get(
  "/get-files",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getAllFiles
);
router.delete(
  "/delete-file/:file_id/:user_name",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteFile
);
router.get(
  "/file-details/:file_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readFile
);

module.exports = router;
