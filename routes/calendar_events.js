const express = require("express");
const router = express.Router();
const {
  addEvent,
  getEvents,
  deleteEvent,
  readEvent,
  updateEvent,
} = require("../controllers/calendar_events");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/add-event",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  addEvent
);
router.put(
  "/update-event",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateEvent
);
router.get(
  "/get-events",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getEvents
);
router.delete(
  "/delete-event/:event_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  deleteEvent
);
router.get(
  "/event-details/:event_id",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  readEvent
);

module.exports = router;
