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
router.post("/post-todo", IsAuth, addTodo);
router.get("/get-todos", IsAuth, getTodos);
router.delete("/delete-todo/:todo_id", IsAuth, deleteTodo);
router.get("/todo-details/:todo_id", IsAuth, readTodo);
router.put("/todo-update/:todo_id", IsAuth, updateTodo);

module.exports = router;
