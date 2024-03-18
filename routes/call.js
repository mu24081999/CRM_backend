const express = require("express");
const router = express.Router();
const { callUser, instanceList } = require("../controllers/call");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/call-user", callUser);
router.get("/list-phone-numbers", instanceList);

module.exports = router;
