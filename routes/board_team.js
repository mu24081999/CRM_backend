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
router.post("/post-team", IsAuth, addTeam);
router.get("/get-teams", IsAuth, getTeams);
router.get("/delete-team/:team_id", IsAuth, deleteTeam);
router.get("/team-details/:team_id", IsAuth, readTeam);
router.put("/team-update/:team_id", IsAuth, updateTeam);

module.exports = router;
