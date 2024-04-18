const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");

exports.getAllSubscriptions = catchAssyncFunc(async function (req, res, next) {
  const subscriptions = await db("subscriptions").select();
  return helper.sendSuccess(
    req,
    res,
    {
      subscriptionsData: subscriptions,
    },
    "success"
  );
});

exports.readSubscriptions = catchAssyncFunc(async function (req, res, next) {
  const { subscription_id } = req.params;
  const subscription = await db("subscriptions")
    .where("id", subscription_id)
    .first();
  return helper.sendSuccess(
    req,
    res,
    {
      subscriptionData: subscription,
    },
    "success"
  );
});
exports.deleteSubscription = catchAssyncFunc(async function (req, res, next) {
  const { subscription_id } = req.params;
  const subscription = await db("boards").where("id", subscription_id).update({
    visibility: "deleted",
  });
  return helper.sendSuccess(req, res, {}, "Subscription deleted successfully.");
});
exports.addSubscription = catchAssyncFunc(async function (req, res, next) {
  const { customer_id, plan, start_date, end_date } = req.body;
  const is_record_inserted = await db("boards").insert({
    customer_id,
    plan,
    start_date,
    end_date,
  });
  if (!is_record_inserted) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating subscription.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Subscription successfully created.");
});
