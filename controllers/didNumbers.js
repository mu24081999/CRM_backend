const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");

exports.getAllPhoneNumbers = catchAssyncFunc(async function (req, res, next) {
  const numbers = await db("did-numbers").select();
  return helper.sendSuccess(
    req,
    res,
    {
      phoneNumbersData: numbers,
    },
    "success"
  );
});
exports.readPhoneNumber = catchAssyncFunc(async function (req, res, next) {
  const { number_id } = req.params;
  const number = await db("did-numbers").where("id", number_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      phoneNumberData: number,
    },
    "success"
  );
});
exports.getUserPhoneNumbers = catchAssyncFunc(async function (req, res, next) {
  const { user_id } = req.params;
  const numbers = await db("did-numbers").where("user_id", user_id).select();
  return helper.sendSuccess(
    req,
    res,
    {
      phoneNumberData: numbers,
    },
    "success"
  );
});
exports.readUserSpecificNumber = catchAssyncFunc(async function (
  req,
  res,
  next
) {
  const { user_id, phoneNumber } = req.params;
  const number = await db("did-numbers")
    .select("*")
    .whereRaw('JSON_EXTRACT(phoneNumber, "$.phoneNumber") = ?', [phoneNumber])
    .where("user_id", user_id);
  return helper.sendSuccess(
    req,
    res,
    {
      phoneNumberData: number,
    },
    "success"
  );
});
exports.addDIDNumbers = catchAssyncFunc(async function (req, res, next) {
  const {
    user_id,
    phoneNumber,
    subscription_start_date,
    subscription_end_date,
  } = req.body;
  const params = {
    user_id,
    phoneNumber,
    subscription_start_date,
    subscription_end_date,
  };
  const is_record_inserted = await db("did-numbers").insert(params);
  if (!is_record_inserted) {
    return helper.sendError(req, res, "Server Error!.", 500);
  }
  return helper.sendSuccess(req, res, {}, "Phone Number successfully created.");
});
exports.updateTeam = catchAssyncFunc(async function (req, res, next) {
  const [number_id] = req.params;
  const {
    user_id,
    phoneNumber,
    subscription_start_date,
    subscription_end_date,
  } = req.body;
  const params = {
    user_id,
    phoneNumber,
    subscription_start_date,
    subscription_end_date,
  };
  const is_record_updated = await db("did-numbers")
    .where("id", number_id)
    .update(params);
  if (!is_record_updated) {
    return helper.sendError(req, res, "Server Error!.", 500);
  }
  return helper.sendSuccess(req, res, {}, "Phone Number successfully updated.");
});
