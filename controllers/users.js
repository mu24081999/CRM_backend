const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");

exports.getUsers = catchAssyncFunc(async function (req, res, next) {
  const users = await db("users").select();
  return helper.sendSuccess(
    req,
    res,
    {
      usersData: users,
    },
    "success"
  );
});
