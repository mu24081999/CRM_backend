const express = require("express");
const router = express.Router();
const {
  addBoard,
  getBoards,
  deleteBoard,
  readBoard,
  updateBoard,
} = require("../controllers/boards");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/post-board",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addBoard
);
router.get(
  "/get-boards",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getBoards
);
router.delete(
  "/delete-board/:board_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteBoard
);
router.get(
  "/board-details/:board_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readBoard
);
router.put(
  "/board-update/:board_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateBoard
);

module.exports = router;
