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
  await inboundMessages?.forEach((message) => {
    const date_created = moment(message?.created_at).format("YYYY-MM-DD");
    inboundMessageChartCategories.push(date_created);
  });
  let newInboundMessageChartCategories = [
    ...new Set(inboundMessageChartCategories),
  ];
  newInboundMessageChartCategories.forEach((date) => {
    const series_value = inboundMessages?.filter(
      (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
    ).length;
    inboundMessageChartSeries.push(series_value);
  });
  const outboundMessageChartSeries = [];
  const outboundMessageChartCategories = [];
  await outboundMessages?.forEach((message) => {
    const date_created = moment(message?.created_at).format("YYYY-MM-DD");
    outboundMessageChartCategories.push(date_created);
  });
  let newOutboundMessageChartCategories = [
    ...new Set(outboundMessageChartCategories),
  ];
  newOutboundMessageChartCategories.forEach((date) => {
    const series_value = outboundMessages?.filter(
      (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
    ).length;
    outboundMessageChartSeries.push(series_value);
  });

  const emails = await db("emails").select();
  const incomingEmails = emails?.filter((email) => email.sender === user_email);
  const outgoingEmails = emails?.filter(
    (email) => email.reciever === user_email
  );
  const inboundEmailChartSeries = [];
  const inboundEmailChartCategories = [];
  await incomingEmails?.forEach((email) => {
    const date_created = moment(email?.created_at).format("YYYY-MM-DD");
    inboundEmailChartCategories.push(date_created);
  });
  let newInboundEmailChartCategories = [
    ...new Set(inboundEmailChartCategories),
  ];
  newInboundEmailChartCategories.forEach((date) => {
    const series_value = incomingEmails?.filter(
      (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
    ).length;
    inboundEmailChartSeries.push(series_value);
  });
  const outboundEmailChartSeries = [];
  const outboundEmailChartCategories = [];
  await outgoingEmails?.forEach((email) => {
    const date_created = moment(email?.created_at).format("YYYY-MM-DD");
    outboundEmailChartCategories.push(date_created);
  });
  let newOutboundEmailChartCategories = [
    ...new Set(outboundEmailChartCategories),
  ];
  newOutboundEmailChartCategories.forEach((date) => {
    const series_value = incomingEmails?.filter(
      (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
    ).length;
    outboundEmailChartSeries.push(series_value);
  });

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
  await inboundCalls?.forEach((call) => {
    const date_created = moment(call?.dateCreated).format("YYYY-MM-DD");
    inboundChartCategories.push(date_created);
  });
  let newInboundChartCategories = [...new Set(inboundChartCategories)];
  newInboundChartCategories.forEach((date) => {
    const series_value = inboundCalls?.filter(
      (call) => moment(call?.dateCreated).format("YYYY-MM-DD") === date
    ).length;
    inboundChartSeries.push(series_value);
  });

  const outboundChartSeries = [];
  const outboundChartCategories = [];
  await outboundCalls?.forEach((call) => {
    const date_created = moment(call?.dateCreated).format("YYYY-MM-DD");
    outboundChartCategories.push(date_created);
  });
  let newOutboundChartCategories = [...new Set(outboundChartCategories)];
  newOutboundChartCategories.forEach((date) => {
    const series_value = outboundCalls?.filter(
      (call) => moment(call?.dateCreated).format("YYYY-MM-DD") === date
    ).length;
    outboundChartSeries.push(series_value);
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
          chart_categories: newInboundMessageChartCategories,
          chart_series: inboundMessageChartSeries,
          chart: {
            // categories: newInboundMessageChartCategories,
            categories: newOutboundMessageChartCategories,
            series: [
              {
                name: "inbound-messages",
                data: inboundMessageChartSeries,
              },
              { name: "outbound-messages", data: outboundMessageChartSeries },
            ],
          },
        },
        emails: {
          number_of_send_emails: incomingEmails?.length,
          number_of_emails_recieved: outgoingEmails?.length,
          chart: {
            categories: newInboundEmailChartCategories,
            series: [
              {
                name: "inbound-emails",
                data: inboundEmailChartSeries,
              },
              { name: "outbound-emails", data: outboundEmailChartSeries },
            ],
          },
          chart_categories: newInboundEmailChartCategories,
          chart_series: inboundEmailChartSeries,
        },
        numbers,
        sub_accounts,
        calls: {
          number_of_inbound_call: inboundCalls?.length,
          number_of_outbound_call: outboundCalls?.length,
          chart: {
            categories: newInboundChartCategories,
            series: [
              {
                name: "inbound-calls",
                data: inboundChartSeries,
              },
              { name: "outbound-calls", data: outboundChartSeries },
            ],
          },
        },
        number_of_invoices_sent: invoices?.length,
        number_of_leads: leads?.length,
        number_of_subscriptions: subscriptions?.length,
      },
    },
    "success"
  );
});
