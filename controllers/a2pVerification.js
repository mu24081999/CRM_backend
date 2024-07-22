const helper = require("../helper/helper");
const catchAsyncFunc = require("../middlewares/catchAsyncFunc");
const twilio = require("twilio");

exports.createA2PVerification = catchAsyncFunc(async (req, res, next) => {
  const { accountSid, authToken } = req.body;
  const client = twilio(accountSid, authToken);

  try {
    // Create Customer Profile
    const customer = await client.trusthub.v1.customerProfiles.create({
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
    });
    console.log("Customer Profile Created:", customer.sid);

    // Register Brand
    const brand = await client.trusthub.v1.brands.create({
      customerSid: customer.sid,
      brandType: "STANDARD",
      brandName: "My Business Brand",
      ein: "12-3456789",
    });
    console.log("Brand Registered:", brand.sid);

    // Register Campaign
    const campaign = await client.trusthub.v1.campaigns.create({
      brandSid: brand.sid,
      useCase: "MARKETING",
      description: "Marketing Campaign for My Business",
    });
    console.log("Campaign Registered:", campaign.sid);

    // Register Phone Number
    const phoneNumber = await client.trusthub.v1.phoneNumbers.create({
      phoneNumber: "+18258700307",
      campaignSid: campaign.sid,
    });
    console.log("Phone Number Registered:", phoneNumber.sid);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    next(error);
  }
});
