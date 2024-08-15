const express = require("express");
const router = express.Router();
const {
  getUserAgents,
  readAgent,
  softDeleteAgent,
  updateAgent,
  addAgent,
  uploadCloudinaryFile,
} = require("../controllers/agents");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get(
  "/get-agents/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  upload.single("file"),
  getUserAgents
);
router.post("/post-cloudinary-file", uploadCloudinaryFile);
router.get(
  "/agent-details/:agent_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readAgent
);
router.delete(
  "/delete-agent/:agent_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  softDeleteAgent
);
router.put(
  "/update-agent-details/:agent_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateAgent
);
router.post(
  "/add-agent",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addAgent
);

module.exports = router;
