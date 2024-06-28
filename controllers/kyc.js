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
exports.getUserKYCForms = catchAssyncFunc(async function (req, res, next) {
  const form = await db("kyc-forms").where("user_id", req.user.id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      kycData: form,
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
  return helper.sendSuccess(req, res, {}, "Form deleted successfully.");
});
exports.addKYCForm = catchAssyncFunc(async function (req, res, next) {
  const {
    firstname,
    lastname,
    martial_status,
    company_do,
    company_size,
    company_details,
    company_type,
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
  } = req.body;
  const is_exist_user_form = await db("kyc-forms")
    .where("user_id", req.user.id)
    .first();
  if (is_exist_user_form) {
    const is_record_updated = await db("kyc-forms")
      .where("user_id", req.user.id)
      .update({
        firstname,
        lastname,
        martial_status,
        gender,
        nationality,
        date_of_birth,
        company_do,
        company_size,
        company_details,
        company_type,
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
    if (is_record_updated) {
      return helper.sendSuccess(
        req,
        res,
        {},
        "KYC information updated successfully!"
      );
    }
  }
  const is_record_inserted = await db("kyc-forms").insert({
    user_id: req.user.id,
    firstname,
    lastname,
    martial_status,
    gender,
    nationality,
    company_do,
    company_size,
    company_details,
    company_type,
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
    company_do,
    company_size,
    company_details,
    company_type,
    state,
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
    is_approved,
    approved_by,
  } = req.body;
  const is_record_updated = await db("kyc-forms").where("id", form_id).update({
    firstname,
    lastname,
    martial_status,
    gender,
    nationality,
    date_of_birth,
    company_do,
    company_size,
    company_details,
    company_type,
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
    is_approved,
    approved_by,
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
