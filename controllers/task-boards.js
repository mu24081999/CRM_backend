const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");

exports.getTaskBoard = catchAssyncFunc(async function (req, res, next) {
  const taskBoard = await db("board-task-status-boards").select();
  return helper.sendSuccess(
    req,
    res,
    {
      taskBoardData: taskBoard,
    },
    "success"
  );
});
exports.readTaskBoard = catchAssyncFunc(async function (req, res, next) {
  const { task_board_id } = req.params;
  const taskBoard = await db("board-task-status-boards")
    .where("id", task_board_id)
    .first();
  return helper.sendSuccess(
    req,
    res,
    {
      taskBoard: taskBoard,
    },
    "success"
  );
});
exports.deleteTaskBoard = catchAssyncFunc(async function (req, res, next) {
  const { task_board_id } = req.params;
  const is_deleted = await db("board-task-status-boards")
    .where("id", task_board_id)
    .del();
  return helper.sendSuccess(req, res, {}, "Task board deleted successfully.");
});
exports.addTaskBoard = catchAssyncFunc(async function (req, res, next) {
  const { board_id, name } = req.body;
  const data = {
    board_id,
    name,
  };
  const is_added = await db("board-task-status-boards").insert(data);
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

exports.updateTaskBoard = catchAssyncFunc(async function (req, res, next) {
  const { task_board_id } = req.params;
  const { name } = req.body;
  const data = {
    name,
  };
  const is_updated = await db("board-task-status-boards")
    .where("id", task_board_id)
    .update(data);
  if (!is_updated) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating board.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Task updated successfully");
});
