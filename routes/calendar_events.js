const express = require("express");
const router = express.Router();
const {
  addEvent,
  getEvents,
  deleteEvent,
  readEvent,
} = require("../controllers/calendar_events");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/add-event",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  addEvent
);
router.get(
  "/get-events",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  getEvents
);
router.delete(
  "/delete-event/:event_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  deleteEvent
);
router.get(
  "/event-details/:event_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN"]),
  readEvent
);

module.exports = router;
