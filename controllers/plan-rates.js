const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const fs = require("fs");
const moment = require("moment");

exports.addRates = catchAssyncFunc(async function (req, res, next) {
  const { starter, growth, enterprise, user_id } = req.body;
  const balanceData = await db("plan-rates").insert({
    user_id: user_id,
    starter: starter,
    growth: growth,
    enterprise: enterprise,
  });
  return helper.sendSuccess(req, res, {}, "Rates added successfully");
});
exports.updateRates = catchAssyncFunc(async function (req, res, next) {
  const { rate_id } = req.params;
  const { starter, growth, enterprise, user_id } = req.body;
  const balanceData = await db("plan-rates").where("id", rate_id).update({
    user_id: user_id,
    starter: starter,
    growth: growth,
    enterprise: enterprise,
  });
  return helper.sendSuccess(req, res, {}, "Rates updated successfully");
});
exports.readRate = catchAssyncFunc(async function (req, res, next) {
  const { rate_id } = req.params;
  const rateDetail = await db("plan-rates").where("id", rate_id).first();
  return helper.sendSuccess(req, res, { rateDetail: rateDetail }, "success");
});
