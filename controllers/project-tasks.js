const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");

exports.getTasks = catchAssyncFunc(async function (req, res, next) {
  const tasks = await db("board-tasks").select();
  return helper.sendSuccess(
    req,
    res,
    {
      tasksData: tasks,
    },
    "success"
  );
});
exports.readTask = catchAssyncFunc(async function (req, res, next) {
  const { task_id } = req.params;
  const task = await db("board-tasks").where("id", task_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      taskData: task,
    },
    "success"
  );
});
exports.deleteTask = catchAssyncFunc(async function (req, res, next) {
  const { task_id } = req.params;
  const is_deleted = await db("board-tasks").where("id", task_id).del();
  return helper.sendSuccess(req, res, {}, "Task deleted successfully.");
});
exports.addTask = catchAssyncFunc(async function (req, res, next) {
  const {
    name,
    start_date,
    end_date,
    description,
    priority,
    asign_to,
    board_id,
    status,
  } = req.body;
  const data = {
    name,
    start_date,
    end_date,
    description,
    priority,
    board_id,
    asign_to: { members: asign_to },
    status,
  };
  const is_added = await db("board-tasks").insert(data);
  if (!is_added) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating board.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Task added successfully");
});

exports.updateTask = catchAssyncFunc(async function (req, res, next) {
  const { task_id } = req.params;
  const {
    name,
    start_date,
    end_date,
    description,
    priority,
    asign_to,
    status,
  } = req.body;
  const data = {
    name,
    start_date,
    end_date,
    description,
    priority,
    // asign_to: { members: asign_to },
    status,
  };
  console.log(data);
  const is_added = await db("board-tasks").where("id", task_id).update(data);
  if (!is_added) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating board.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Task updated successfully");
});
