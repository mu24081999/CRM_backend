const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");

exports.getUserPermissions = catchAssyncFunc(async function (req, res, next) {
  const { subaccount_id } = req.params;
  const permissionDetails = await db("permissions")
    .where("subaccount_id", subaccount_id)
    .first();
  return helper.sendSuccess(
    req,
    res,
    {
      permissionDetails: permissionDetails,
    },
    "success"
  );
});
exports.readAgent = catchAssyncFunc(async function (req, res, next) {
  const { agent_id } = req.params;
  const agent = await db("agents").where("id", agent_id).first();
  return helper.sendSuccess(req, res, { agentData: agent }, "success");
});
exports.softDeleteAgent = catchAssyncFunc(async function (req, res, next) {
  const { agent_id } = req.params;
  const is_deleted = await db("agents").where("id", agent_id).update({
    status: "blocked",
  });
  return helper.sendSuccess(req, res, {}, "Agent Deleted!");
});
exports.addPermissions = catchAssyncFunc(async function (req, res, next) {
  const {
    user_id,
    subaccount_id,
    user_role,
    subaccount_role,
    dashboard,
    email,
    sms,
    call,
    todos,
    phone_numbers,
    chat,
    group_chat,
    leads_pipeline,
    contacts,
    file_manager,
    agents,
    call_recordings,
    bulk_emails,
    bulk_sms,
    sms_logs,
    calendar,
    wallet,
  } = req.body;
  const is_exist = await db("permissions")
    .where("subaccount_id", subaccount_id)
    .first();
  if (is_exist) {
    const is_updated = await db("permissions")
      .where("subaccount_id", subaccount_id)
      .update({
        dashboard,
        email,
        sms,
        call,
        todos,
        phone_numbers,
        chat,
        group_chat,
        leads_pipeline,
        contacts,
        file_manager,
        agents,
        call_recordings,
        bulk_emails,
        bulk_sms,
        sms_logs,
        calendar,
        wallet,
      });
    if (is_updated) {
      return helper.sendSuccess(
        req,
        res,
        {},
        "Permission updated successfully"
      );
    }
  } else {
    const is_inserted = await db("permissions").insert({
      user_id,
      subaccount_id,
      user_role,
      subaccount_role,
      dashboard,
      email,
      sms,
      call,
      todos,
      phone_numbers,
      chat,
      group_chat,
      leads_pipeline,
      contacts,
      file_manager,
      agents,
      call_recordings,
      bulk_emails,
      bulk_sms,
      sms_logs,
      calendar,
      wallet,
    });
    return helper.sendSuccess(
      req,
      res,
      {},
      "Permissions successfully granted to the account"
    );
  }
});
exports.updateAgent = catchAssyncFunc(async function (req, res, next) {
  const { agent_id } = req.params;
  const { username, name, email, phoneNumber, status, accountSid, authToken } =
    req.body;
  console.log(req.body);
  const is_exist_agent = await db("agents")
    .where("email", email)
    .orWhere("username", username)
    .first();
  if (!is_exist_agent) {
    return helper.sendSuccess(
      req,
      res,
      {},
      "Aggent with this email/username not exists"
    );
  }

  const userParams = {
    name,
    username,
    email,
    role,
    phone: phoneNumber,
    status: status,
    accountSid,
    authToken,
  };
  const is_updated = await db("agents")
    .where("id", agent_id)
    .update(userParams);

  if (is_updated) return helper.sendSuccess(req, res, {}, "Agent Updated!");
});
