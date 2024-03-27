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
router.get("/get-users", IsAuth, getUsers);
router.get("/user-details/:user_id", IsAuth, readUser);
router.delete("/delete-user/:user_id", IsAuth, softDeleteUser);
router.put("/update-user-status/:user_id", IsAuth, updateStatus);
router.put("/update-user-details/:user_id", IsAuth, updateUser);

module.exports = router;
