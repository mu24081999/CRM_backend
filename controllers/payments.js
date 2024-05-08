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
exports.getAllPayments = catchAssyncFunc(async function (req, res, next) {
  const payments = await db("payments").select();
  return helper.sendSuccess(
    req,
    res,
    {
      paymentsData: payments,
    },
    "success"
  );
});
exports.getUserPayments = catchAssyncFunc(async function (req, res, next) {
  const payments = await db("payments").where("user_id", req.user.id).select();
  return helper.sendSuccess(
    req,
    res,
    {
      paymentsData: payments,
    },
    "success"
  );
});

exports.readPayment = catchAssyncFunc(async function (req, res, next) {
  const { payment_id } = req.params;
  const payment = await db("payments").where("id", payment_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      paymentData: payment,
    },
    "success"
  );
});
exports.addPayment = catchAssyncFunc(async function (req, res, next) {
  const {
    user_id,
    card_holder_name,
    card_number,
    cvc,
    expiration,
    postal_code,
    amount,
    policy_accepted,
    description,
  } = req.body;
  const is_record_inserted = await db("payments").insert({
    user_id,
    card_holder_name,
    card_number,
    cvc,
    expiration,
    postal_code,
    amount,
    policy_accepted,
    description,
  });
  if (!is_record_inserted) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating payment.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Success");
});
