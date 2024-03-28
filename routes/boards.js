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
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  addBoard
);
router.get(
  "/get-boards",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getBoards
);
router.delete(
  "/delete-board/:board_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  deleteBoard
);
router.get(
  "/board-details/:board_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  readBoard
);
router.put(
  "/board-update/:board_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updateBoard
);

module.exports = router;
