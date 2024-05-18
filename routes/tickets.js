const express = require("express");
const router = express.Router();
const {
  addTicket,
  getAllTickets,
  deleteTicket,
  readTicket,
  updateTicket,
} = require("../controllers/ticket");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/post-ticket",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addTicket
);
router.get(
  "/get-tickets",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getAllTickets
);
router.delete(
  "/delete-ticket/:ticket_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteTicket
);
router.get(
  "/ticket-details/:ticket_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readTicket
);
router.put(
  "/ticket-update/:ticket_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateTicket
);

module.exports = router;
