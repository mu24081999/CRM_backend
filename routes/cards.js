const express = require("express");
const router = express.Router();
const {
  addCard,
  getCards,
  deleteCard,
  readCard,
  updateCard,
} = require("../controllers/cards");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/post-card",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addCard
);
router.get(
  "/get-cards",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getCards
);
router.delete(
  "/delete-card/:card_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteCard
);
router.get(
  "/card-details/:card_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readCard
);
router.put(
  "/card-update/:card_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateCard
);

module.exports = router;
