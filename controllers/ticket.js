const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");

exports.getAllTickets = catchAssyncFunc(async function (req, res, next) {
  const tickets = await db("tickets").select();
  return helper.sendSuccess(
    req,
    res,
    {
      ticketsData: tickets,
    },
    "success"
  );
});

exports.readTicket = catchAssyncFunc(async function (req, res, next) {
  const { ticket_id } = req.params;
  const ticket = await db("tickets").where("id", ticket_id).first();
  return helper.sendSuccess(
    req,
    res,
    {
      ticketData: ticket,
    },
    "success"
  );
});
exports.deleteTicket = catchAssyncFunc(async function (req, res, next) {
  const { ticket_id } = req.params;
  const ticket = await db("tickets").where("id", ticket_id).del();
  return helper.sendSuccess(req, res, {}, "Ticket deleted successfully.");
});
exports.addTicket = catchAssyncFunc(async function (req, res, next) {
  const {
    user_name,
    user_email,
    user_id,
    subject,
    problem,
    // solution,
    // responder_id,
    // responder_email,
    // responder_role,
    // responder_name,
    // status,
  } = req.body;

  const is_record_inserted = await db("tickets").insert({
    user_id,
    user_name,
    user_email,
    subject,
    problem,
    // solution,
    // responder_id,
    // responder_email,
    // responder_name,
    // responder_role,
    // status,
  });
  if (!is_record_inserted) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating board.",
      500
    );
  }
  return helper.sendSuccess(
    req,
    res,
    {},
    "Ticket successfully submitted, we come back to you soon."
  );
});

exports.updateTicket = catchAssyncFunc(async function (req, res, next) {
  const { ticket_id } = req.params;
  const {
    user_name,
    user_email,
    user_id,
    subject,
    problem,
    solution,
    responder_id,
    responder_email,
    responder_role,
    responder_name,
    status,
  } = req.body;

  const is_record_updated = await db("tickets").where("id", ticket_id).insert({
    user_id,
    user_name,
    user_email,
    subject,
    problem,
    solution,
    responder_id,
    responder_email,
    responder_name,
    responder_role,
    status,
  });
  if (!is_record_updated) {
    return helper.sendError(
      req,
      res,
      "Something went wrong, while creating board.",
      500
    );
  }
  helper.sendEmail(req, res, subject, user_email, solution);
  return helper.sendSuccess(req, res, {}, "Responded successfully .");
});
