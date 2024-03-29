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
router.post(
  "/post-task",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addTask
);
router.get(
  "/get-tasks",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getTasks
);
router.delete(
  "/delete-task/:task_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteTask
);
router.get(
  "/task-details/:task_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readTask
);
router.put(
  "/task-update/:task_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateTask
);

module.exports = router;
