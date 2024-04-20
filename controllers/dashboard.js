const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const twilio = require("twilio");
const moment = require("moment");

exports.getDashboard = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken, user_phone, user_email, user_id } = req.body;
  const client = twilio(accountSid, authToken);

  const messages = await db("messages").select();
  const outboundMessages = messages?.filter(
    (message) => message?.from_phone === user_phone
  );
  const inboundMessages = messages?.filter(
    (message) => message?.to_phone === user_phone
  );
  const inboundMessageChartSeries = [];
  const inboundMessageChartCategories = [];
  await messages?.forEach((message) => {
    const date_created = moment(message?.created_at).format("YYYY-MM-DD");
    inboundMessageChartCategories.push(date_created);
  });
  let newInboundMessageChartCategories = [
    ...new Set(inboundMessageChartCategories),
  ];
  newInboundMessageChartCategories.forEach((date) => {
    const series_value = calls?.filter(
      (call) => moment(call?.dateCreated).format("YYYY-MM-DD") === date
    ).length;
    console.log(series_value, date);
    inboundMessageChartSeries.push(series_value);
  });

  const emails = await db("emails").select();
  const incomingEmails = emails?.filter((email) => email.sender === user_email);
  const outgoingEmails = emails?.filter(
    (email) => email.reciever === user_email
  );

  const numbers = await client.incomingPhoneNumbers.list(); //list claimed numbers
  const sub_accounts = await db("sub_accounts")
    .where("user_id", user_id)
    .select();
  const calls = await client.calls.list({
    limit: 10,
    status: "completed",
  });
  const inboundCalls = calls?.filter((call) => call?.direction === "inbound");
  const outboundCalls = calls?.filter(
    (call) => call?.direction === "outbound-dial"
  );
  const inboundChartSeries = [];
  const inboundChartCategories = [];
  await calls?.forEach((call) => {
    const date_created = moment(call?.dateCreated).format("YYYY-MM-DD");
    inboundChartCategories.push(date_created);
  });
  let newInboundChartCategories = [...new Set(inboundChartCategories)];
  newInboundChartCategories.forEach((date) => {
    const series_value = calls?.filter(
      (call) => moment(call?.dateCreated).format("YYYY-MM-DD") === date
    ).length;
    console.log(series_value, date);
    inboundChartSeries.push(series_value);
  });

  const invoices = await db("invoices").select();
  const leads = await db("contacts").select();
  const subscriptions = await db("subscriptions").select();
  return helper.sendSuccess(
    req,
    res,
    {
      dashboardData: {
        messages: {
          number_of_recieved_sms: inboundMessages?.length,
          number_of_sent_sms: outboundMessages?.length,
        },
        emails: {
          number_of_send_emails: incomingEmails?.length,
          number_of_emails_recieved: outgoingEmails?.length,
        },
        numbers,
        sub_accounts,
        calls: {
          number_of_inbound_call: inboundCalls?.length,
          number_of_outbound_call: outboundCalls?.length,
          chart_categories: newInboundChartCategories,
          chart_series: inboundChartSeries,
        },
        invoices,
        leads,
        subscriptions,
      },
    },
    "success"
  );
});
