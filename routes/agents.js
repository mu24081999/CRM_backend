const express = require("express");
const router = express.Router();
const {
  getUserAgents,
  readAgent,
  softDeleteAgent,
  updateAgent,
  addAgent,
} = require("../controllers/agents");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get(
  "/get-agents/:user_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getUserAgents
);
router.get(
  "/agent-details/:agent_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  readAgent
);
router.delete(
  "/delete-agent/:agent_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  softDeleteAgent
);
router.put(
  "/update-agent-details/:agent_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updateAgent
);
router.post(
  "/add-agent",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  addAgent
);

module.exports = router;
