const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const stripe = require("stripe")(config.STRIPE_API_KEY);

exports.createPayment = catchAssyncFunc(async (req, res, next) => {
  const payment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
  });
  return helper.sendSuccess(req, res, { paymentData: payment }, "success");
});
