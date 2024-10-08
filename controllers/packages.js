const catchAsyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");

exports.getPackages = catchAsyncFunc(async (req, res, next) => {
  const packages = await db("packages").select();
  return helper.sendSuccess(req, res, { packages: packages }, "");
});
exports.readPackage = catchAsyncFunc(async (req, res, next) => {
  const { package_id } = req.params;
  const packages = await db("packages").where("id", package_id).first();
  return helper.sendSuccess(req, res, { packageDetails: packages }, "");
});

exports.addPackages = catchAsyncFunc(async (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().positive().required(),
    packages: Joi.object().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return helper.sendError(req, res, "Validation failed:" + error.message);
  }
  const { user_id, packages } = req.body;
  const params = {
    user_id: user_id,
    packages: packages,
  };
  const is_inserted = await db("packages").insert(params);
  if (is_inserted) {
    return helper.sendSuccess(
      req,
      res,
      { id: is_inserted[0] },
      "Packages details inserted successfully"
    );
  }
  return helper.sendError(req, res, "Server Error!", 500);
});
exports.updatePackages = catchAsyncFunc(async (req, res, next) => {
  const schema = Joi.object({
    user_id: Joi.number().positive().required(),
    packages: Joi.object().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return helper.sendError(req, res, "Validation failed:" + error.message);
  }
  const { package_id } = req.params;
  const { user_id, packages } = req.body;
  const params = {
    packages: JSON.stringify(packages),
  };
  const is_updated = await db("packages")
    .where("id", package_id)
    .update(params);
  if (is_updated) {
    return helper.sendSuccess(
      req,
      res,
      { id: package_id },
      "Packages details updated successfully"
    );
  }
  return helper.sendError(req, res, "Server Error!", 500);
});
