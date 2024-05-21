const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const fs = require("fs");
const moment = require("moment");

exports.getUserBalance = catchAssyncFunc(async function (req, res, next) {
  const balanceData = await db("balance").where("user_id", req.user.id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      balanceData: balanceData,
    },
    "success"
  );
});
exports.addUpdateUserBalance = catchAssyncFunc(async function (req, res, next) {
  const { user_id, credit } = req.body;
  const is_exist = await db("balance").where("user_id", user_id).first();
  if (is_exist) {
    const balance = parseInt(credit) + parseInt(is_exist?.credit);
    const is_record_updated = await db("balance")
      .where("user_id", user_id)
      .update({
        credit: balance,
      });
  } else {
    const is_record_inserted = await db("balance").insert({
      user_id: user_id,
      credit: credit,
    });
  }
  return helper.sendSuccess(req, res, {}, "Balance successfully added.");
});
