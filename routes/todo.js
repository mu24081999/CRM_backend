const express = require("express");
const router = express.Router();
const {
  addTodo,
  getTodos,
  deleteTodo,
  readTodo,
  updateTodo,
} = require("../controllers/todos");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/post-todo",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addTodo
);
router.get(
  "/get-todos",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getTodos
);
router.delete(
  "/delete-todo/:todo_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteTodo
);
router.get(
  "/todo-details/:todo_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readTodo
);
router.put(
  "/todo-update/:todo_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateTodo
);

module.exports = router;
