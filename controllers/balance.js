const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const fs = require("fs");
const moment = require("moment");

exports.getUserBalance = catchAssyncFunc(async function (req, res, next) {
  const user = await db("users").where("id", req.user.id).first();
  const balanceData = await db("balance")
    .where("user_id", user?.client_id ? parseInt(user?.client_id) : req.user.id)
    .first();
  return helper.sendSuccess(
    req,
    res,
    {
      balanceData: balanceData,
    },
    "success"
  );
});
exports.asignBalance = catchAssyncFunc(async function (req, res, next) {
  const { user_id, credit, to_user } = req.body;
  const is_exist = await db("balance").where("user_id", user_id).first();
  const is_to_user_balance_exist = await db("balance")
    .where("user_id", to_user)
    .first();
  if (is_exist?.credit >= credit) {
    if (is_to_user_balance_exist?.user_id === to_user) {
      const balance =
        parseInt(credit) + parseInt(is_to_user_balance_exist?.credit);
      const is_record_updated = await db("balance")
        .where("user_id", to_user)
        .update({
          credit: balance,
        });
    } else {
      const is_record_inserted = await db("balance").insert({
        user_id: to_user,
        credit: credit,
      });
    }
  }
  const is_exist_updated = await db("balance")
    .where("id", is_exist.id)
    .update({
      credit: is_exist?.credit - credit,
    });
  return helper.sendSuccess(req, res, {}, "Balance successfully added.");
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
