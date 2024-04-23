const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const fs = require("fs");
const moment = require("moment");

exports.getUserBillings = catchAssyncFunc(async function (req, res, next) {
  const billings = await db("billings").where("user_id", req.user.id).select();
  return helper.sendSuccess(
    req,
    res,
    {
      billingsData: billings,
    },
    "success"
  );
});

exports.readBilling = catchAssyncFunc(async function (req, res, next) {
  const { billing_id } = req.params;
  const billing = await db("billings").where("id", billing_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      billingData: billing,
    },
    "success"
  );
});
exports.deleteBilling = catchAssyncFunc(async function (req, res, next) {
  const { billing_id } = req.params;
  const billing = await db("billings").where("id", billing_id).del();
  return helper.sendSuccess(req, res, {}, "Billing deleted successfully.");
});

exports.addBilling = catchAssyncFunc(async function (req, res, next) {
  const { firstname, lastname, address, state, city, country, zip_code } =
    req.body;
  const is_record_inserted = await db("billings").insert({
    user_id: req.user.id,
    firstname,
    lastname,
    address,
    state,
    city,
    country,
    zip_code,
  });
  if (!is_record_inserted) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating billings.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Billings successfully created.");
});

exports.updateBilling = catchAssyncFunc(async function (req, res, next) {
  const { billing_id } = req.params;
  const { firstname, lastname, address, state, city, country, zip_code } =
    req.body;
  const is_record_inserted = await db("billings")
    .where("id", billing_id)
    .insert({
      firstname,
      lastname,
      address,
      state,
      city,
      country,
      zip_code,
    });
  if (!is_record_inserted) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while updating billings.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Billings successfully created.");
});
