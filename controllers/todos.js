const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const fs = require("fs");
const moment = require("moment");

exports.getTodos = catchAssyncFunc(async function (req, res, next) {
  const todos = await db("todos").select();
  return helper.sendSuccess(
    req,
    res,
    {
      todosData: todos,
    },
    "success"
  );
});
exports.readTodo = catchAssyncFunc(async function (req, res, next) {
  const { todo_id } = req.params;
  const todo = await db("todos").where("id", todo_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      todoData: todo,
    },
    "success"
  );
});
exports.deleteTodo = catchAssyncFunc(async function (req, res, next) {
  const { todo_id } = req.params;
  const todo = await db("todos").where("id", todo_id).del();
  return helper.sendSuccess(req, res, {}, "Task deleted successfully.");
});
exports.addTodo = catchAssyncFunc(async function (req, res, next) {
  const {
    name,
    code,
    description,
    start_date,
    start_time,
    end_date,
    end_time,
    // category_id,
    status,
    priority,
    asign_to,
    labels,
  } = req.body;
  const formData = {
    name,
    code,
    description,
    start_date,
    start_time,
    end_date,
    end_time,
    // category_id,
    status,
    priority,
    asign_to: { members: asign_to },
    labels: { labels: labels },
  };
  const is_added = await db("todos").insert(formData);
  if (!is_added) {
    return helper.sendError(req, res, "Something went wrong", 500);
  }
  return helper.sendSuccess(req, res, {}, "Task added successfully.");
});

exports.updateTodo = catchAssyncFunc(async function (req, res, next) {
  const { todo_id } = req.params;
  const {
    name,
    code,
    description,
    start_date,
    start_time,
    end_date,
    end_time,
    category_id,
    status,
    priority,
    asign_to,
    labels,
  } = req.body;
  const formData = {
    name,
    code,
    description,
    start_date,
    start_time,
    end_date,
    end_time,
    category_id,
    status,
    priority,
    asign_to: JSON.stringify({ members: asign_to }),
    labels: JSON.stringify({ labels: labels }),
  };
  console.log(formData, req.body);

  const is_updated = await db("todos").where("id", todo_id).update(formData);
  if (!is_updated) {
    return helper.sendError(req, res, "Something went wrong", 500);
  }
  return helper.sendSuccess(req, res, {}, "Task updated successfully.");
});
