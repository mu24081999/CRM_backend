const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const fs = require("fs");
const moment = require("moment");

exports.getEvents = catchAssyncFunc(async function (req, res, next) {
  const events = await db("calender_events").select();
  return helper.sendSuccess(
    req,
    res,
    {
      eventsData: events,
    },
    "success"
  );
});
exports.readEvent = catchAssyncFunc(async function (req, res, next) {
  const { event_id } = req.params;
  const event = await db("calender_events").where("id", event_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      eventData: event,
    },
    "success"
  );
});
exports.deleteEvent = catchAssyncFunc(async function (req, res, next) {
  const { event_id } = req.params;
  const is_deleted = await db("calender_events").where("id", event_id).del();
  return helper.sendSuccess(req, res, {}, "Event deleted successfully.");
});
exports.addEvent = catchAssyncFunc(async function (req, res, next) {
  const {
    name,
    description,
    start_date,
    start_time,
    end_date,
    end_time,
    location,
    category,
    visibility,
    event_color,
    priority,
    user_id,
    user_name,
    user_image,
    team_members,
  } = req.body;
  const is_added = await db("calender_events").insert({
    name,
    description,
    start_date,
    start_time,
    end_date,
    end_time,
    location,
    category,
    visibility,
    event_color,
    priority,
    end_time,
    user_id,
    user_name,
    user_image,
    team_members: { members: team_members },
  });
  if (!is_added) {
    return helper.sendError(req, res, "Error creating calender event.", 500);
  }
  return helper.sendSuccess(
    req,
    res,
    {},
    "Calender event created successfully."
  );
});
