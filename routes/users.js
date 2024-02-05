const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/users");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get("/get-users", IsAuth, getUsers);

module.exports = router;
