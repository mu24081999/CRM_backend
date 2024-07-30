const helper = require("../helper/helper");
const catchAsyncFunc = require("../middlewares/catchAsyncFunc");
const twilio = require("twilio");

exports.createRegulatoryBundle = catchAsyncFunc(async (req, res, next) => {
  const {
    user_id,
    country,
    number_type,
    end_user_type,
    firstname,
    lastname,
    email,
    phone_number,
    purpose_phone,
    friendly_name,
    business_name,
    business_ein,
    status,
    status_description,
  } = req.body;
  const { supporting_documents } = req.files;
  console.log(req.body, req.files);
  const [fileData] = await storage
    .bucket("crm-justcall")
    .upload(supporting_documents.tempFilePath, {
      // Specify the destination file name in GCS (optional)
      destination: "regulatory_bundles/attachments/" + email,
      // Set ACL to public-read
      predefinedAcl: "publicRead",
    });
  publicUrl = fileData.publicUrl();
  const params = {
    user_id,
    country,
    number_type,
    end_user_type,
    firstname,
    lastname,
    email,
    phone_number,
    purpose_phone,
    friendly_name,
    business_name,
    business_ein,
    status,
    status_description,
    supporting_documents: publicUrl,
  };

  const is_inserted = await db("regulatory-bundles").insert(params);
  if (is_inserted) {
    return helper.sendSuccess(
      req,
      res,
      {},
      "Details added successfully, We'll update you soon."
    );
  }
});
exports.readRegulatoryBundle = catchAsyncFunc(async (req, res, next) => {
  const { bundle_id } = req.params;
  const bundle = await db("regulatory-bundles").where("id", bundle_id).first();
  return helper.sendSuccess(req, res, { bundleData: bundle }, "success");
});
exports.getAllBundles = catchAsyncFunc(async (req, res, next) => {
  const bundles = await db("regulatory-bundles").select();
  return helper.sendSuccess(req, res, { bundlesData: bundles }, "success");
});
exports.getUserBundles = catchAsyncFunc(async (req, res, next) => {
  const { user_id } = req.params;
  const bundles = await db("regulatory-bundles")
    .where("user_id", user_id)
    .select();
  return helper.sendSuccess(req, res, { bundlesData: bundles }, "success");
});
