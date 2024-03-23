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
router.post("/post-task-board", IsAuth, addTaskBoard);
router.get("/get-task-boards", IsAuth, getTaskBoard);
router.delete("/delete-task-board/:task_board_id", IsAuth, deleteTaskBoard);
router.get("/task-board-details/:task_board_id", IsAuth, readTaskBoard);
router.put("/task-board-update/:task_id", IsAuth, updateTaskBoard);

module.exports = router;
