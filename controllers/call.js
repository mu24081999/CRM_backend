const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");
const util = require("util");
const startOutboundVoiceContactPromise = util
  .promisify(connect.startOutboundVoiceContact)
  .bind(connect);

exports.callUser = async function (req, res, next) {
  try {
    const params = {
      DestinationPhoneNumber: "+14849993639", // The number you want to call
      ContactFlowId: "34813782-1f58-4dbe-9769-178baef044bb", // The ID of the contact flow to use
      InstanceId: "a0ef515b-a3f7-4e4f-8998-6c87aaf9687d",
      SourcePhoneNumber: "+542994361052", // The phone number from which the call will originate
    };

    // Initiate the outbound call
    const data = await startOutboundVoiceContactPromise(params);
    console.log("Outbound call initiated successfully:", data);
    res
      .status(200)
      .json({ message: "Outbound call initiated successfully", data });
  } catch (err) {
    console.error("Error initiating outbound call:", err);
    if (err.code === "ResourceNotFoundException") {
      res
        .status(404)
        .json({ error: "Resource not found", message: err.message });
    } else {
      res
        .status(500)
        .json({ error: "Internal server error", message: err.message });
    }
  }
};
exports.instanceList = catchAssyncFunc(async function (req, res, next) {
  // Describe the Amazon Connect instance
  connect.listInstances({}, function (err, data) {
    if (err) {
      console.error("Error describing instance:", err);
      return helper.sendError(req, res, err, 500);
    } else {
      console.log("Instance details:", data);
      return helper.sendSuccess(req, res, data, "success");
    }
  });
});
