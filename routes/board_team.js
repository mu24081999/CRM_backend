const express = require("express");
const router = express.Router();
const {
  addTeam,
  getTeams,
  deleteTeam,
  readTeam,
  updateTeam,
} = require("../controllers/board_teams");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/post-team",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addTeam
);
router.get(
  "/get-teams",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getTeams
);
router.get(
  "/delete-team/:team_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteTeam
);
router.get(
  "/team-details/:team_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readTeam
);
router.put(
  "/team-update/:team_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateTeam
);

module.exports = router;
