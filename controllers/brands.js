const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");

exports.getAllBrands = catchAssyncFunc(async function (req, res, next) {
  const brands = await db("brands").select();
  return helper.sendSuccess(
    req,
    res,
    {
      brandsData: brands,
    },
    "success"
  );
});
exports.readUserBrand = catchAssyncFunc(async function (req, res, next) {
  const { user_id } = req.params;
  const user = await db("users").where("user_id", user_id).first();
  let brand;
  if (user.client_id !== null) {
    brand = await db("brands")
      .where("user_id", parseInt(user?.client_id))
      .first();
  }
  brand = await db("brands").where("user_id", user_id).first();
  return helper.sendSuccess(req, res, { brandData: brand }, "success");
});
exports.addUpdateBrand = catchAssyncFunc(async function (req, res, next) {
  const { user_id, brand_name, brand_details } = req.body;
  console.log("🚀 ~ req.body:", req.body, req.files);
  const is_exist_brand = await db("brands").where("user_id", user_id).first();
  let publicUrl;
  let params;

  if (req.files) {
    const { brand_logo } = req.files;
    const [fileData] = await storage
      .bucket("crm-justcall")
      .upload(brand_logo.tempFilePath, {
        destination: "brands/" + user_id + "/" + brand_logo.name,
        predefinedAcl: "publicRead",
      });
    publicUrl = fileData.publicUrl();
  }
  if (is_exist_brand) {
    if (req.files) {
      params = {
        brand_name: brand_name,
        brand_details: brand_details,
        brand_logo: publicUrl,
      };
    } else {
      params = {
        brand_name: brand_name,
        brand_details: brand_details,
      };
    }
    const is_updated = await db("brands")
      .where("user_id", user_id)
      .update(params);
    return helper.sendSuccess(req, res, {}, "Brand updated successfully");
  }
  if (req.files) {
    params = {
      user_id: user_id,
      brand_name: brand_name,
      brand_details: brand_details,
      brand_logo: publicUrl,
    };
  } else {
    params = {
      user_id: user_id,
      brand_name: brand_name,
      brand_details: brand_details,
    };
  }
  const is_added = await db("brands").insert(params);
  if (is_added)
    return helper.sendSuccess(req, res, {}, "Brand successfully added!");
});
