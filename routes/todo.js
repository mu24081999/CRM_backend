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
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  addTodo
);
router.get(
  "/get-todos",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getTodos
);
router.delete(
  "/delete-todo/:todo_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  deleteTodo
);
router.get(
  "/todo-details/:todo_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  readTodo
);
router.put(
  "/todo-update/:todo_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  updateTodo
);

module.exports = router;
