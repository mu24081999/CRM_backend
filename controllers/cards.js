const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");

exports.getCards = catchAssyncFunc(async function (req, res, next) {
  const cards = await db("cards").where("user_id", req.user.id).select();
  return helper.sendSuccess(
    req,
    res,
    {
      cardsData: cards,
    },
    "success"
  );
});

exports.readCard = catchAssyncFunc(async function (req, res, next) {
  const { card_id } = req.params;
  const card = await db("cards").where("id", card_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      cardData: card,
    },
    "success"
  );
});
exports.deleteCard = catchAssyncFunc(async function (req, res, next) {
  const { card_id } = req.params;
  const card = await db("cards").where("id", card_id).update({
    visibility: "deleted",
  });
  return helper.sendSuccess(req, res, {}, "Card deleted successfully.");
});
exports.addCard = catchAssyncFunc(async function (req, res, next) {
  const {
    card_number,
    cardholder_name,
    expiration_date,
    cvc,
    firstname,
    lastname,
    address,
    city,
    state,
    country,
    zip_code,
  } = req.body;
  const is_card_exist = await db("cards")
    .where("card_number", card_number)
    .first();
  if (is_card_exist) {
    return helper.sendError(req, res, "Card already exists.", 500);
  }
  const is_record_inserted = await db("cards").insert({
    user_id: req.user.id,
    cardholder_name,
    expiration_date,
    cvc,
    card_number,
    address,
    state,
    city,
    country,
    zip_code,
    firstname,
    lastname,
  });
  if (!is_record_inserted) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating card.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Card successfully created.");
});

exports.updateCard = catchAssyncFunc(async function (req, res, next) {
  const { card_id } = req.params;
  const {
    card_number,
    cardholder_name,
    expiration_date,
    cvc,
    address,
    state,
    city,
    country,
    zip_code,
    firstname,
    lastname,
  } = req.body;
  const is_record_updated = await db("cards").where(card_id).update({
    cardholder_name,
    expiration_date,
    cvc,
    card_number,
    cardholder_name,
    expiration_date,
    cvc,
    card_number,
    address,
    state,
    city,
    country,
    zip_code,
    firstname,
    lastname,
  });
  if (!is_record_updated) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating card.",
      500
    );
  }
  return helper.sendSuccess(req, res, {}, "Card successfully updated.");
});
