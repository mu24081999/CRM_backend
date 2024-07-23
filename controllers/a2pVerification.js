const helper = require("../helper/helper");
const catchAsyncFunc = require("../middlewares/catchAsyncFunc");
const twilio = require("twilio");

// exports.createA2PVerification = catchAsyncFunc(async (req, res, next) => {
//   const { accountSid, authToken } = req.body;
//   const client = twilio(accountSid, authToken);

//   try {
//     // Create Customer Profile
//     const twilio = require("twilio");
//     const client = twilio(accountSid, authToken);
//     // Step 1: Create a Business Profile
//     client.trusthub.v1.customerProfiles
//       .create({
//         friendlyName: "My Business Profile",
//         email: "business@example.com",
//         businessName: "My Business",
//         ein: "YOUR_EIN",
//         policySid: "",
//         address: {
//           street: "123 Main St",
//           city: "San Francisco",
//           state: "CA",
//           postalCode: "94105",
//           country: "US",
//         },
//       })
//       .then((profile) => {
//         console.log("Business Profile Created:", profile.sid);

//         // Step 2: Register Your Brand
//         return client.trusthub.v1.trustProducts.create({
//           customerProfileSid: profile.sid,
//           friendlyName: "My Brand",
//           ein: "YOUR_EIN",
//         });
//       })
//       .then((brand) => {
//         console.log("Brand Registered:", brand.sid);

//         // Step 3: Create a Messaging Service
//         return client.messaging.v1.services.create({
//           friendlyName: "My Messaging Service",
//         });
//       })
//       .then((service) => {
//         console.log("Messaging Service Created:", service.sid);

//         // Step 4: Register Your Campaign
//         return client.messaging.v1.services(service.sid).campaigns.create({
//           useCase: "marketing",
//           description: "Marketing Campaign",
//         });
//       })
//       .then((campaign) => {
//         console.log("Campaign Registered:", campaign.sid);

//         // Step 5: Associate Phone Numbers
//         return client.messaging.v1.services(service.sid).phoneNumbers.create({
//           phoneNumberSid: "PN700e8bb4c9814ba867033cf101d221ce",
//         });
//       })
//       .then((phoneNumber) => {
//         console.log("Phone Number Associated:", phoneNumber.sid);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   } catch (error) {
//     console.log(error.message);
//   }
// });
exports.createA2PVerification = catchAsyncFunc(async (req, res, next) => {
  const {
    user_id,
    username,
    legal_business_name,
    business_type,
    business_registration_id_type,
    business_reg_no,
    business_industry,
    website_url,
    rigion,
    street,
    city,
    postal_code,
    country,
    name,
    email,
    phone_number,
    brand_type,
    amount_paid,
    payment_status,
  } = req.body;
  const params = {
    user_id,
    username,
    legal_business_name,
    business_type,
    business_registration_id_type,
    business_reg_no,
    business_industry,
    website_url,
    rigion,
    street,
    city,
    postal_code,
    country,
    name,
    email,
    phone_number,
    brand_type,
    amount_paid,
    payment_status,
  };
  const is_inserted = await db("verifications").insert(params);
  if (is_inserted) {
    return helper.sendSuccess(
      req,
      res,
      {},
      "Details added successfully, We'll update you soon."
    );
  }
});
exports.updateA2PVerification = catchAsyncFunc(async (req, res, next) => {
  const { verification_id } = req.params;
  const {
    user_id,
    username,
    legal_business_name,
    business_type,
    business_registration_id_type,
    business_reg_no,
    business_industry,
    website_url,
    rigion,
    street,
    city,
    postal_code,
    country,
    name,
    email,
    phone_number,
    brand_type,
    amount_paid,
    status,
    payment_status,
  } = req.body;
  const params = {
    user_id,
    username,
    legal_business_name,
    business_type,
    business_registration_id_type,
    business_reg_no,
    business_industry,
    website_url,
    rigion,
    street,
    city,
    postal_code,
    country,
    name,
    email,
    phone_number,
    brand_type,
    amount_paid,
    status,
    payment_status,
  };
  const is_updated = await db("verifications")
    .where("id", verification_id)
    .update(params);
  if (is_updated) {
    return helper.sendSuccess(req, res, {}, "Details updated successfully.");
  }
});
exports.readUserVerification = catchAsyncFunc(async (req, res, next) => {
  const { user_id } = req.params;
  const verification = await db("verifications")
    .where("user_id", user_id)
    .first();
  console.log(
    "🚀 ~ exports.readUserVerification=catchAsyncFunc ~ verification:",
    verification
  );
  return helper.sendSuccess(
    req,
    res,
    { verificationData: verification },
    "success"
  );
});
exports.getAllVerifications = catchAsyncFunc(async (req, res, next) => {
  const getAllVerifications = await db("verifications").select();
  return helper.sendSuccess(
    req,
    res,
    { verifications: getAllVerifications },
    "success"
  );
});
