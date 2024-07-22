const helper = require("../helper/helper");
const catchAsyncFunc = require("../middlewares/catchAsyncFunc");
const twilio = require("twilio");

exports.createA2PVerification = catchAsyncFunc(async (req, res, next) => {
  const { accountSid, authToken } = req.body;
  const client = twilio(accountSid, authToken);
  // Create Customer Profile
  client.trusthub.v1.customers
    .create({
      friendlyName: "My Business",
      email: "contact@mybusiness.com",
      phoneNumber: "+1234567890",
      businessName: "My Business LLC",
      businessType: "LLC",
      ein: "12-3456789",
      address: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        postalCode: "12345",
        country: "US",
      },
    })
    .then((customer) => {
      console.log("Customer Profile Created:", customer.sid);

      // Register Brand
      return client.trusthub.v1.brands.create({
        customerSid: customer.sid,
        brandType: "STANDARD",
        brandName: "My Business Brand",
        ein: "12-3456789",
      });
    })
    .then((brand) => {
      console.log("Brand Registered:", brand.sid);

      // Register Campaign
      return client.trusthub.v1.campaigns.create({
        brandSid: brand.sid,
        useCase: "MARKETING",
        description: "Marketing Campaign for My Business",
      });
    })
    .then((campaign) => {
      console.log("Campaign Registered:", campaign.sid);

      // Register Phone Number
      return client.trusthub.v1.phoneNumbers.create({
        phoneNumber: "+18258700307",
        campaignSid: campaign.sid,
      });
    })
    .then((phoneNumber) => {
      console.log("Phone Number Registered:", phoneNumber.sid);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
