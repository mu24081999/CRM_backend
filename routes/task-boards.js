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
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  addTaskBoard
);
router.get(
  "/get-task-boards",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getTaskBoard
);
router.delete(
  "/delete-task-board/:task_board_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  deleteTaskBoard
);
router.get(
  "/task-board-details/:task_board_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  readTaskBoard
);
router.put(
  "/task-board-update/:task_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updateTaskBoard
);

module.exports = router;
