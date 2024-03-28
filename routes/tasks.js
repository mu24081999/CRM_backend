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
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  addTask
);
router.get(
  "/get-tasks",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getTasks
);
router.delete(
  "/delete-task/:task_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  deleteTask
);
router.get(
  "/task-details/:task_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  readTask
);
router.put(
  "/task-update/:task_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updateTask
);

module.exports = router;
