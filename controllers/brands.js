const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");
const fs = require("fs");
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
  const user = await db("users").where("id", user_id).first();
  let brand;
  if (user.client_id !== null) {
    brand = await db("brands")
      .where("user_id", parseInt(user?.client_id))
      .first();
  } else {
    brand = await db("brands").where("user_id", user_id).first();
  }
  return helper.sendSuccess(req, res, { brandData: brand }, "success");
});
exports.addUpdateBrand = catchAssyncFunc(async function (req, res, next) {
  const { user_id, brand_name, brand_details, text_color, font_family } =
    req.body;
  console.log("🚀 ~ req.body:", req.body);
  const is_exist_brand = await db("brands").where("user_id", user_id).first();
  let publicUrl;
  let params;

  if (req.files) {
    const { brand_logo } = req.files;
    const data = await fs.promises.readFile(brand_logo?.tempFilePath);

    const documentParams = {
      Bucket: process.env.DIGITAL_OCEAN_BUCKET_NAME,
      Key: brand_logo.name, // The name of the file in the Space
      Body: data,
      ACL: "public-read", // Optional: makes the file publicly accessible
    };
    const response = await s3.upload(documentParams).promise();
    publicUrl = response.Location;

    // const [fileData] = await storage
    //   .bucket("crm-justcall")
    //   .upload(brand_logo.tempFilePath, {
    //     destination: "brands/" + user_id + "/" + brand_logo.name,
    //     predefinedAcl: "publicRead",
    //   });
    // publicUrl = fileData.publicUrl();
  }
  if (is_exist_brand) {
    if (req.files) {
      params = {
        brand_name: brand_name,
        brand_details: brand_details,
        brand_logo: publicUrl,
        text_color: text_color,
        font_family: font_family,
      };
    } else {
      params = {
        brand_name: brand_name,
        brand_details: brand_details,
        text_color: text_color,
        font_family: font_family,
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
      text_color: text_color,
      font_family: font_family,
    };
  } else {
    params = {
      user_id: user_id,
      brand_name: brand_name,
      brand_details: brand_details,
      text_color: text_color,
      font_family: font_family,
    };
  }
  const is_added = await db("brands").insert(params);
  if (is_added)
    return helper.sendSuccess(req, res, {}, "Brand successfully added!");
});
