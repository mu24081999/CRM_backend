const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");

exports.callUser = catchAssyncFunc(async function (req, res, next) {
  const params = {
    DestinationPhoneNumber: "+923174660027", // The number you want to call
    ContactFlowId: "34813782-1f58-4dbe-9769-178baef044bb", // The ID of the contact flow to use
    InstanceId: "a0ef515b-a3f7-4e4f-8998-6c87aaf9687d", // The ID of your Amazon Connect instance
    SourcePhoneNumber: "+542994361052", // The phone number from which the call will originate
  };

  // Initiate the outbound call
  await connect.startOutboundVoiceContact(params, (err, data) => {
    if (err) {
      console.error("Error initiating outbound call:", err);
    } else {
      console.log("Outbound call initiated successfully:", data);
    }
  });
});
exports.listPhoneNumbers = catchAssyncFunc(async function (req, res, next) {
  const params = {
    InstanceId: "a0ef515b-a3f7-4e4f-8998-6c87aaf9687d", // The ID of your Amazon Connect instance
  };

  // List phone numbers
  connect.listPhoneNumbers(params, (err, data) => {
    if (err) {
      console.error("Error listing phone numbers:", err);
    } else {
      console.log("Phone numbers:", data.PhoneNumbers);
    }
  });
});
