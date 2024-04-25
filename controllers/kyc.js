const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");

exports.getKYCForms = catchAssyncFunc(async function (req, res, next) {
  const forms = await db("kyc-forms").select();
  return helper.sendSuccess(
    req,
    res,
    {
      kycData: forms,
    },
    "success"
  );
});

exports.readKYCForm = catchAssyncFunc(async function (req, res, next) {
  const { form_id } = req.params;
  const kyc = await db("kyc-forms").where("id", form_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      kycData: kyc,
    },
    "success"
  );
});
exports.deleteKYCForm = catchAssyncFunc(async function (req, res, next) {
  const { form_id } = req.params;
  const form = await db("kyc-forms").where("id", form_id).update({
    status: "deleted",
  });
  return helper.sendSuccess(req, res, {}, "Card deleted successfully.");
});
exports.addKYCForm = catchAssyncFunc(async function (req, res, next) {
  const {
    firstname,
    lastname,
    martial_status,
    gender,
    nationality,
    date_of_birth,
    email,
    phone,
    city,
    address,
    zip_code,
    document_type,
    document_url,
    is_policy_accepted,
    signature_data,
    status,
  } = req.body;
  const is_record_inserted = await db("kyc-forms").insert({
    user_id: req.user.id,
    firstname,
    lastname,
    martial_status,
    gender,
    nationality,
    date_of_birth,
    email,
    phone,
    state,
    city,
    address,
    zip_code,
    document_type,
    document_url,
    is_policy_accepted,
    signature_data,
    status,
  });
  if (!is_record_inserted) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while adding form.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Form successfully added.");
});

exports.updateKYCForm = catchAssyncFunc(async function (req, res, next) {
  const { form_id } = req.params;
  const {
    firstname,
    lastname,
    martial_status,
    gender,
    nationality,
    date_of_birth,
    email,
    phone,
    city,
    address,
    zip_code,
    document_type,
    document_url,
    is_policy_accepted,
    signature_data,
    status,
  } = req.body;
  const is_record_updated = await db("kyc-forms").where("id", form_id).update({
    firstname,
    lastname,
    martial_status,
    gender,
    nationality,
    date_of_birth,
    email,
    phone,
    state,
    city,
    address,
    zip_code,
    document_type,
    document_url,
    is_policy_accepted,
    signature_data,
    status,
  });
  if (!is_record_updated) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while updating form.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Form successfully added.");
});
