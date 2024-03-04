const express = require("express");
const router = express.Router();
const {
  addEvent,
  getEvents,
  deleteEvent,
  readEvent,
} = require("../controllers/calendar_events");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/add-event", IsAuth, addEvent);
router.get("/get-events", IsAuth, getEvents);
router.delete("/delete-event/:event_id", IsAuth, deleteEvent);
router.get("/event-details/:event_id", IsAuth, readEvent);

module.exports = router;
