const express = require("express");
const router = express.Router();
const {
  addTask,
  getTasks,
  deleteTask,
  readTask,
  updateTask,
} = require("../controllers/project-tasks");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/post-task", IsAuth, addTask);
router.get("/get-tasks", IsAuth, getTasks);
router.delete("/delete-task/:task_id", IsAuth, deleteTask);
router.get("/task-details/:task_id", IsAuth, readTask);
router.put("/task-update/:task_id", IsAuth, updateTask);

module.exports = router;
