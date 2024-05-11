const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const twilio = require("twilio");
const moment = require("moment");

async function getSubAccountsData(subaccounts) {
  const messagesArray = [];
  const callsArray = [];
  const activeNumbersArray = [];
  const emailsArray = [];
  const leadsArray = [];

  await Promise.all(
    subaccounts.map(async (acc, index) => {
      const client = twilio(acc?.accountSid, acc?.authToken);
      const messagesData = await db("messages")
        .where("account_sid", acc?.accountSid)
        .select();
      const callsData = await client.calls.list({});
      const numbers = await client.incomingPhoneNumbers.list(); //list claimed number
      const emails = await db("emails")
        .where("sender", acc?.email)
        .orWhere("reciever", acc?.email)
        .select();
      const leads = await db("contacts").where("user_id", acc?.id).select();
      messagesArray.push(...messagesData);
      activeNumbersArray.push(...numbers);
      callsArray.push(...callsData);
      emailsArray.push(...emails);
      leadsArray.push(...leads);
    })
  );
  //calls
  const inboundCalls = callsArray?.filter(
    (call) => call?.direction === "inbound"
  );
  const outboundCalls = callsArray?.filter(
    (call) => call?.direction === "outbound-dial"
  );
  const inboundChartSeries = [];
  const inboundChartCategories = [];
  await inboundCalls?.forEach((call) => {
    const date_created = moment(call?.dateCreated).format("YYYY-MM-DD");
    inboundChartCategories.push(date_created);
  });
  let newInboundChartCategories = [...new Set(inboundChartCategories)];
  newInboundChartCategories?.forEach((date) => {
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
  newOutboundChartCategories?.forEach((date) => {
    const series_value = outboundCalls?.filter(
      (call) => moment(call?.dateCreated).format("YYYY-MM-DD") === date
    ).length;
    outboundChartSeries.push(series_value);
  });

  //messages
  const outboundMessages = messagesArray?.filter(
    (message) => message?.direction === "outbound"
  );
  const inboundMessages = messagesArray?.filter(
    (message) => message?.direction === "inbound"
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
  //emails
  const incomingEmails = emailsArray?.filter(
    (email) => email.sender === user_email
  );
  const outgoingEmails = emailsArray?.filter(
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
  return {
    // messagesArray,
    // callsArray,
    // activeNumbersArray,
    // emailsArray,
    numbers: activeNumbersArray,
    number_of_leads: leadsArray?.length,
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
  };
}

exports.getDashboard = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken, user_phone, user_email, user_id } = req.body;
  const user = await db("users").where("id", user_id).first();
  const client = accountSid && authToken && twilio(accountSid, authToken);
  const sub_accounts = await db("users").where("parent_id", user_id).select();
  const sub_accounts_data =
    sub_accounts?.length > 0 && (await getSubAccountsData(sub_accounts));
  const messages =
    accountSid &&
    (await db("messages").where("account_sid", accountSid).select());
  const invoices = await db("invoices").select();
  const leads = await db("contacts").where("user_id", req.user.id).select();
  const subscriptions = await db("subscriptions")
    .where("customer_id", req.user.id)
    .select();
  const outboundMessages = messages?.filter(
    (message) => message.user_id === user_id && message.direction === "outbound"
  );
  // user?.role === "AGENT"
  //   ? messages?.filter((message) => message?.from_phone === user_phone)
  //   : messages?.filter((message) => message?.direction === "outbound");
  const inboundMessages = messages?.filter(
    (message) => message.user_id === user_id && message.direction === "inbound"
  );
  // user?.role === "AGENT"
  //   ? messages?.filter((message) => message?.to_phone === user_phone)
  //   : messages?.filter((message) => message?.direction === "inbound");
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

  const numbers =
    accountSid && authToken ? await client.incomingPhoneNumbers.list() : []; //list claimed numbers

  const calls =
    accountSid && authToken
      ? await client.calls.list({
          // limit: 10,
          status: "completed",
        })
      : [];
  const inboundCalls =
    user?.role === "AGENT"
      ? calls?.filter(
          (call) => call?.direction === "inbound" && call?.from === user_phone
        )
      : calls?.filter((call) => call?.direction === "inbound");
  const outboundCalls =
    user?.role === "AGENT"
      ? calls?.filter(
          (call) =>
            call?.direction === "outbound-dial" && call?.from === user_phone
        )
      : calls?.filter((call) => call?.direction === "outbound-dial");
  const inboundChartSeries = [];
  const inboundChartCategories = [];
  await inboundCalls?.forEach((call) => {
    const date_created = moment(call?.dateCreated).format("YYYY-MM-DD");
    inboundChartCategories.push(date_created);
  });
  let newInboundChartCategories = [...new Set(inboundChartCategories)];
  newInboundChartCategories?.forEach((date) => {
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
  newOutboundChartCategories?.forEach((date) => {
    const series_value = outboundCalls?.filter(
      (call) => moment(call?.dateCreated).format("YYYY-MM-DD") === date
    ).length;
    outboundChartSeries.push(series_value);
  });

  return helper.sendSuccess(
    req,
    res,
    {
      dashboardData: {
        sub_accounts_data,
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
