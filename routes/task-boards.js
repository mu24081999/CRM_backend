const express = require("express");
const router = express.Router();
const {
  addTaskBoard,
  updateTaskBoard,
  deleteTaskBoard,
  readTaskBoard,
  getTaskBoard,
} = require("../controllers/task-boards");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/post-task-board",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addTaskBoard
);
router.get(
  "/get-task-boards",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getTaskBoard
);
router.delete(
  "/delete-task-board/:task_board_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteTaskBoard
);
router.get(
  "/task-board-details/:task_board_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readTaskBoard
);
router.put(
  "/task-board-update/:task_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateTaskBoard
);

module.exports = router;
