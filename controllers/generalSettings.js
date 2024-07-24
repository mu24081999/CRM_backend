const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");

exports.getGeneralSettings = catchAssyncFunc(async function (req, res, next) {
  const settings = await db("general-settings").select();
  return helper.sendSuccess(
    req,
    res,
    {
      settingsData: settings,
    },
    "success"
  );
});
exports.readGeneralSettings = catchAssyncFunc(async function (req, res, next) {
  const { setting_id } = req.params;
  const setting = await db("general-settings").where("id", setting_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      settingData: setting,
    },
    "success"
  );
});

exports.addSetting = catchAssyncFunc(async function (req, res, next) {
  const { local_number_price, toll_free_number_price, user_id } = req.body;
  const is_inserted = await db("general-settings").insert({
    user_id: user_id,
    local_number_price: local_number_price,
    toll_free_number_price: toll_free_number_price,
  });
  return helper.sendSuccess(
    req,
    res,
    {
      id: is_inserted[0],
    },
    "success"
  );
});
exports.updateSetting = catchAssyncFunc(async function (req, res, next) {
  const { local_number_price, toll_free_number_price, user_id } = req.body;

  const { setting_id } = req.params;
  const params = { local_number_price, toll_free_number_price, user_id };
  const is_record_updated = await db("general-setting")
    .where("id", setting_id)
    .update(params);
  if (!is_record_updated) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while adding form.",
      500
    );
  }
  return helper.sendSuccess(
    req,
    res,
    { id: setting_id },
    "Record successfully updated."
  );
});
