const express = require("express");
const router = express.Router();
const {
  addFile,
  getAllFiles,
  deleteFile,
  readFile,
} = require("../controllers/gallery");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/post-file", IsAuth, addFile);
router.get("/get-files", IsAuth, getAllFiles);
router.delete("/delete-file/:file_id/:user_name", IsAuth, deleteFile);
router.get("/file-details/:file_id", IsAuth, readFile);

module.exports = router;
