const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const twilio = require("twilio");
const moment = require("moment");
const axios = require("axios");
async function getSubAccountsData(subaccounts) {
  const messagesArray = [];
  const callsArray = [];
  const activeNumbersArray = [];
  const emailsArray = [];
  const incomingEmails = [];
  const outgoingEmails = [];
  const leadsArray = [];

  const promises = subaccounts.map(async (acc) => {
    const client = twilio(acc?.accountSid, acc?.authToken);
    const [messagesData, callsData, numbers, emails, leads] = await Promise.all(
      [
        db("messages").where("account_sid", acc?.accountSid).select(),
        client.calls.list({}),
        client.incomingPhoneNumbers.list(),
        db("emails")
          .where("sender", acc?.email)
          .orWhere("reciever", acc?.email)
          .select(),
        db("contacts").where("user_id", acc?.id).select(),
      ]
    );

    const incoming_emails = emails.filter(
      (email) => email.reciever === acc.email
    );
    const outgoing_emails = emails.filter(
      (email) => email.sender === acc.email
    );

    messagesArray.push(...messagesData);
    activeNumbersArray.push(...numbers);
    callsArray.push(...callsData);
    emailsArray.push(...emails);
    incomingEmails.push(...incoming_emails);
    outgoingEmails.push(...outgoing_emails);
    leadsArray.push(...leads);
  });

  await Promise.all(promises);

  const getChartData = (items, dateField) => {
    const categories = items.map((item) =>
      moment(item[dateField]).format("YYYY-MM-DD")
    );
    const uniqueCategories = [...new Set(categories)];
    const series = uniqueCategories.map(
      (date) =>
        items.filter(
          (item) => moment(item[dateField]).format("YYYY-MM-DD") === date
        ).length
    );
    return { categories: uniqueCategories, series };
  };

  const inboundCalls = callsArray.filter(
    (call) => call?.direction === "inbound"
  );
  const outboundCalls = callsArray.filter(
    (call) => call?.direction === "outbound-dial"
  );

  const inboundMessages = messagesArray.filter(
    (message) => message?.direction === "inbound"
  );
  const outboundMessages = messagesArray.filter(
    (message) => message?.direction === "outbound"
  );

  const { categories: inboundCallCategories, series: inboundCallSeries } =
    getChartData(inboundCalls, "dateCreated");
  const { categories: outboundCallCategories, series: outboundCallSeries } =
    getChartData(outboundCalls, "dateCreated");

  const { categories: inboundMessageCategories, series: inboundMessageSeries } =
    getChartData(inboundMessages, "created_at");
  const {
    categories: outboundMessageCategories,
    series: outboundMessageSeries,
  } = getChartData(outboundMessages, "created_at");

  const { categories: inboundEmailCategories, series: inboundEmailSeries } =
    getChartData(incomingEmails, "created_at");
  const { categories: outboundEmailCategories, series: outboundEmailSeries } =
    getChartData(outgoingEmails, "created_at");

  return {
    numbers: activeNumbersArray,
    number_of_leads: leadsArray.length,
    messages: {
      number_of_recieved_sms: inboundMessages.length,
      number_of_sent_sms: outboundMessages.length,
      chart: {
        categories: [
          ...new Set([
            ...inboundMessageCategories,
            ...outboundMessageCategories,
          ]),
        ],
        series: [
          { name: "inbound-messages", data: inboundMessageSeries },
          { name: "outbound-messages", data: outboundMessageSeries },
        ],
      },
    },
    emails: {
      number_of_send_emails: outgoingEmails.length,
      number_of_emails_recieved: incomingEmails.length,
      chart: {
        categories: [
          ...new Set([...inboundEmailCategories, ...outboundEmailCategories]),
        ],
        series: [
          { name: "inbound-emails", data: inboundEmailSeries },
          { name: "outbound-emails", data: outboundEmailSeries },
        ],
      },
    },
    calls: {
      number_of_inbound_call: inboundCalls.length,
      number_of_outbound_call: outboundCalls.length,
      chart: {
        categories: [
          ...new Set([...inboundCallCategories, ...outboundCallCategories]),
        ],
        series: [
          { name: "inbound-calls", data: inboundCallSeries },
          { name: "outbound-calls", data: outboundCallSeries },
        ],
      },
    },
  };
}
// async function getSubAccountsData(subaccounts) {
//   const messagesArray = [];
//   const callsArray = [];
//   const activeNumbersArray = [];
//   const emailsArray = [];
//   const incomingEmails = [];
//   const outgoingEmails = [];
//   const leadsArray = [];

//   const promises = subaccounts.map(async (acc) => {
//     const client = twilio(acc?.accountSid, acc?.authToken);

//     const [dbData, callsData, numbers] = await Promise.all([
//       db
//         .select(
//           "messages.*",
//           "emails.*",
//           "contacts.*",
//           db.raw(
//             "CASE WHEN emails.reciever = ? THEN 'incoming' WHEN emails.sender = ? THEN 'outgoing' END as email_direction",
//             [acc.email, acc.email]
//           )
//         )
//         .from("messages")
//         .leftJoin("emails", "messages.account_sid", "=", "emails.account_sid")
//         .leftJoin(
//           "contacts",
//           "messages.account_sid",
//           "=",
//           "contacts.account_sid"
//         )
//         .where("messages.account_sid", acc?.accountSid)
//         .orWhere("emails.sender", acc?.email)
//         .orWhere("emails.reciever", acc?.email)
//         .orWhere("contacts.user_id", acc?.id),
//       client.calls.list({}),
//       client.incomingPhoneNumbers.list(),
//     ]);

//     const messagesData = dbData.filter((item) => item.type === "message");
//     const emails = dbData.filter((item) => item.type === "email");
//     const leads = dbData.filter((item) => item.type === "contact");

//     const incoming_emails = emails.filter(
//       (email) => email.email_direction === "incoming"
//     );
//     const outgoing_emails = emails.filter(
//       (email) => email.email_direction === "outgoing"
//     );

//     messagesArray.push(...messagesData);
//     activeNumbersArray.push(...numbers);
//     callsArray.push(...callsData);
//     emailsArray.push(...emails);
//     incomingEmails.push(...incoming_emails);
//     outgoingEmails.push(...outgoing_emails);
//     leadsArray.push(...leads);
//   });

//   await Promise.all(promises);

//   // Same logic as before for processing the data

//   const getChartData = (items, dateField) => {
//     const categories = items.map((item) =>
//       moment(item[dateField]).format("YYYY-MM-DD")
//     );
//     const uniqueCategories = [...new Set(categories)];
//     const series = uniqueCategories.map(
//       (date) =>
//         items.filter(
//           (item) => moment(item[dateField]).format("YYYY-MM-DD") === date
//         ).length
//     );
//     return { categories: uniqueCategories, series };
//   };

//   const inboundCalls = callsArray.filter(
//     (call) => call?.direction === "inbound"
//   );
//   const outboundCalls = callsArray.filter(
//     (call) => call?.direction === "outbound-dial"
//   );

//   const inboundMessages = messagesArray.filter(
//     (message) => message?.direction === "inbound"
//   );
//   const outboundMessages = messagesArray.filter(
//     (message) => message?.direction === "outbound"
//   );

//   const { categories: inboundCallCategories, series: inboundCallSeries } =
//     getChartData(inboundCalls, "dateCreated");
//   const { categories: outboundCallCategories, series: outboundCallSeries } =
//     getChartData(outboundCalls, "dateCreated");

//   const { categories: inboundMessageCategories, series: inboundMessageSeries } =
//     getChartData(inboundMessages, "created_at");
//   const {
//     categories: outboundMessageCategories,
//     series: outboundMessageSeries,
//   } = getChartData(outboundMessages, "created_at");

//   const { categories: inboundEmailCategories, series: inboundEmailSeries } =
//     getChartData(incomingEmails, "created_at");
//   const { categories: outboundEmailCategories, series: outboundEmailSeries } =
//     getChartData(outgoingEmails, "created_at");

//   return {
//     numbers: activeNumbersArray,
//     number_of_leads: leadsArray.length,
//     messages: {
//       number_of_recieved_sms: inboundMessages.length,
//       number_of_sent_sms: outboundMessages.length,
//       chart: {
//         categories: [
//           ...new Set([
//             ...inboundMessageCategories,
//             ...outboundMessageCategories,
//           ]),
//         ],
//         series: [
//           { name: "inbound-messages", data: inboundMessageSeries },
//           { name: "outbound-messages", data: outboundMessageSeries },
//         ],
//       },
//     },
//     emails: {
//       number_of_send_emails: outgoingEmails.length,
//       number_of_emails_recieved: incomingEmails.length,
//       chart: {
//         categories: [
//           ...new Set([...inboundEmailCategories, ...outboundEmailCategories]),
//         ],
//         series: [
//           { name: "inbound-emails", data: inboundEmailSeries },
//           { name: "outbound-emails", data: outboundEmailSeries },
//         ],
//       },
//     },
//     calls: {
//       number_of_inbound_call: inboundCalls.length,
//       number_of_outbound_call: outboundCalls.length,
//       chart: {
//         categories: [
//           ...new Set([...inboundCallCategories, ...outboundCallCategories]),
//         ],
//         series: [
//           { name: "inbound-calls", data: inboundCallSeries },
//           { name: "outbound-calls", data: outboundCallSeries },
//         ],
//       },
//     },
//   };
// }

exports.getDashboard = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken, user_phone, user_email, user_id } = req.body;
  const user = await db("users").where("id", user_id).first();
  const users = await db("users").select();
  const client = accountSid && authToken && twilio(accountSid, authToken);
  const sub_accounts =
    user?.parent_id === null &&
    user?.client_id === null &&
    user?.role === "USER"
      ? users.filter((usr) => parseInt(usr.parent_id) === user.id)
      : user?.parent_id === null &&
        user?.client_id === null &&
        user?.role === "ADMIN"
      ? users.filter((usr) => usr.parent_id !== null && usr.client_id === null)
      : [];

  const sub_accounts_data =
    sub_accounts.length > 0 ? await getSubAccountsData(sub_accounts) : {};

  const [messages, invoices, leads, subscriptions, numbers, calls] =
    await Promise.all([
      accountSid
        ? db("messages").where("account_sid", accountSid).select()
        : [],
      user?.role === "ADMIN"
        ? db("invoices").select()
        : db("invoices").where("user_id", user.id).select(),
      db("contacts").where("user_id", req.user.id).select(),
      user.role === "ADMIN"
        ? db("subscriptions").select()
        : db("subscriptions").where("customer_id", req.user.id).select(),
      accountSid && authToken ? client.incomingPhoneNumbers.list() : [],
      accountSid && authToken ? client.calls.list({ status: "completed" }) : [],
    ]);

  const outboundMessages = messages.filter(
    (message) => message.user_id === user_id && message.direction === "outbound"
  );
  const inboundMessages = messages.filter(
    (message) => message.user_id === user_id && message.direction === "inbound"
  );
  const getChartData = (items, dateField) => {
    const categories = items.map((item) =>
      moment(item[dateField]).format("YYYY-MM-DD")
    );
    const uniqueCategories = [...new Set(categories)];
    const series = uniqueCategories.map(
      (date) =>
        items.filter(
          (item) => moment(item[dateField]).format("YYYY-MM-DD") === date
        ).length
    );
    return { categories: uniqueCategories, series };
  };
  const { categories: inboundMessageCategories, series: inboundMessageSeries } =
    getChartData(inboundMessages, "created_at");
  const {
    categories: outboundMessageCategories,
    series: outboundMessageSeries,
  } = getChartData(outboundMessages, "created_at");

  const emails = await db("emails").select();
  const incomingEmails = emails.filter(
    (email) => email.reciever === user_email
  );
  const outgoingEmails = emails.filter((email) => email.sender === user_email);

  const { categories: inboundEmailCategories, series: inboundEmailSeries } =
    getChartData(incomingEmails, "created_at");
  const { categories: outboundEmailCategories, series: outboundEmailSeries } =
    getChartData(outgoingEmails, "created_at");

  const inboundCalls =
    user.role === "AGENT"
      ? calls.filter(
          (call) => call.direction === "inbound" && call.from === user_phone
        )
      : calls.filter((call) => call.direction === "inbound");
  const outboundCalls =
    user.role === "AGENT"
      ? calls.filter(
          (call) =>
            call.direction === "outbound-dial" && call.from === user_phone
        )
      : calls.filter((call) => call.direction === "outbound-dial");

  const { categories: inboundCallCategories, series: inboundCallSeries } =
    getChartData(inboundCalls, "dateCreated");
  const { categories: outboundCallCategories, series: outboundCallSeries } =
    getChartData(outboundCalls, "dateCreated");

  return helper.sendSuccess(
    req,
    res,
    {
      dashboardData: {
        sub_accounts_data,
        messages: {
          number_of_recieved_sms: inboundMessages.length,
          number_of_sent_sms: outboundMessages.length,
          chart: {
            categories: [
              ...new Set([
                ...inboundMessageCategories,
                ...outboundMessageCategories,
              ]),
            ],
            series: [
              { name: "inbound-messages", data: inboundMessageSeries },
              { name: "outbound-messages", data: outboundMessageSeries },
            ],
          },
        },
        emails: {
          number_of_send_emails: outgoingEmails.length,
          number_of_emails_recieved: incomingEmails.length,
          chart: {
            categories: [
              ...new Set([
                ...inboundEmailCategories,
                ...outboundEmailCategories,
              ]),
            ],
            series: [
              { name: "inbound-emails", data: inboundEmailSeries },
              { name: "outbound-emails", data: outboundEmailSeries },
            ],
          },
        },
        numbers,
        sub_accounts,
        calls: {
          number_of_inbound_call: inboundCalls.length,
          number_of_outbound_call: outboundCalls.length,
          chart: {
            categories: [
              ...new Set([...inboundCallCategories, ...outboundCallCategories]),
            ],
            series: [
              { name: "inbound-calls", data: inboundCallSeries },
              { name: "outbound-calls", data: outboundCallSeries },
            ],
          },
        },
        number_of_invoices_sent: invoices.length,
        number_of_leads: leads.length,
        number_of_subscriptions: subscriptions.length,
      },
    },
    "success"
  );
});

exports.getTwilioPricing = async function (req, res, next) {
  const { accountSid, authToken, country_code } = req.body;
  const client = new twilio(accountSid, authToken);
  const voicePricing = await client.pricing.v2.voice
    .countries(country_code)
    .fetch();
  const smsPricing = await client.pricing.v1.messaging
    .countries(country_code)
    .fetch();
  return helper.sendSuccess(
    req,
    res,
    {
      pricingData: {
        voicePricing,
        smsPricing,
      },
    },
    "success"
  );
};

// async function getSubAccountsData(subaccounts) {
//   const messagesArray = [];
//   const callsArray = [];
//   const activeNumbersArray = [];
//   const emailsArray = [];
//   const incomingEmails = [];
//   const outgoingEmails = [];
//   const leadsArray = [];

//   await Promise.all(
//     subaccounts.map(async (acc, index) => {
//       const client = twilio(acc?.accountSid, acc?.authToken);
//       const messagesData = await db("messages")
//         .where("account_sid", acc?.accountSid)
//         .select();
//       const callsData = await client.calls.list({});
//       const numbers = await client.incomingPhoneNumbers.list(); //list claimed number
//       const emails = await db("emails")
//         .where("sender", acc?.email)
//         .orWhere("reciever", acc?.email)
//         .select();
//       const leads = await db("contacts").where("user_id", acc?.id).select();
//       const incoming_emails = emails?.filter(
//         (email) => email.reciever === acc.email
//       );
//       const outgoing_emails = emails?.filter(
//         (email) => email.sender === acc.email
//       );
//       messagesArray.push(...messagesData);
//       activeNumbersArray.push(...numbers);
//       callsArray.push(...callsData);
//       emailsArray.push(...emails);
//       incomingEmails.push(...incoming_emails);
//       outgoingEmails.push(...outgoing_emails);
//       emailsArray.push(...emails);
//       leadsArray.push(...leads);
//     })
//   );
//   //calls
//   const inboundCalls = callsArray?.filter(
//     (call) => call?.direction === "inbound"
//   );
//   const outboundCalls = callsArray?.filter(
//     (call) => call?.direction === "outbound-dial"
//   );
//   const inboundChartSeries = [];
//   const inboundChartCategories = [];
//   await inboundCalls?.forEach((call) => {
//     const date_created = moment(call?.dateCreated).format("YYYY-MM-DD");
//     inboundChartCategories.push(date_created);
//   });
//   let newInboundChartCategories = [...new Set(inboundChartCategories)];
//   newInboundChartCategories?.forEach((date) => {
//     const series_value = inboundCalls?.filter(
//       (call) => moment(call?.dateCreated).format("YYYY-MM-DD") === date
//     ).length;
//     inboundChartSeries.push(series_value);
//   });

//   const outboundChartSeries = [];
//   const outboundChartCategories = [];
//   await outboundCalls?.forEach((call) => {
//     const date_created = moment(call?.dateCreated).format("YYYY-MM-DD");
//     outboundChartCategories.push(date_created);
//   });
//   let newOutboundChartCategories = [...new Set(outboundChartCategories)];
//   newOutboundChartCategories?.forEach((date) => {
//     const series_value = outboundCalls?.filter(
//       (call) => moment(call?.dateCreated).format("YYYY-MM-DD") === date
//     ).length;
//     outboundChartSeries.push(series_value);
//   });

//   //messages
//   const outboundMessages = messagesArray?.filter(
//     (message) => message?.direction === "outbound"
//   );
//   const inboundMessages = messagesArray?.filter(
//     (message) => message?.direction === "inbound"
//   );
//   const inboundMessageChartSeries = [];
//   const inboundMessageChartCategories = [];
//   await inboundMessages?.forEach((message) => {
//     const date_created = moment(message?.created_at).format("YYYY-MM-DD");
//     inboundMessageChartCategories.push(date_created);
//   });
//   let newInboundMessageChartCategories = [
//     ...new Set(inboundMessageChartCategories),
//   ];
//   newInboundMessageChartCategories.forEach((date) => {
//     const series_value = inboundMessages?.filter(
//       (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
//     ).length;
//     inboundMessageChartSeries.push(series_value);
//   });
//   const outboundMessageChartSeries = [];
//   const outboundMessageChartCategories = [];
//   await outboundMessages?.forEach((message) => {
//     const date_created = moment(message?.created_at).format("YYYY-MM-DD");
//     outboundMessageChartCategories.push(date_created);
//   });
//   let newOutboundMessageChartCategories = [
//     ...new Set(outboundMessageChartCategories),
//   ];
//   newOutboundMessageChartCategories.forEach((date) => {
//     const series_value = outboundMessages?.filter(
//       (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
//     ).length;
//     outboundMessageChartSeries.push(series_value);
//   });
//   //emails
//   // const incomingEmails = emailsArray;
//   // const outgoingEmails = emailsArray;
//   const inboundEmailChartSeries = [];
//   const inboundEmailChartCategories = [];
//   await incomingEmails?.forEach((email) => {
//     const date_created = moment(email?.created_at).format("YYYY-MM-DD");
//     inboundEmailChartCategories.push(date_created);
//   });
//   let newInboundEmailChartCategories = [
//     ...new Set(inboundEmailChartCategories),
//   ];
//   newInboundEmailChartCategories.forEach((date) => {
//     const series_value = incomingEmails?.filter(
//       (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
//     ).length;
//     inboundEmailChartSeries.push(series_value);
//   });
//   const outboundEmailChartSeries = [];
//   const outboundEmailChartCategories = [];
//   await outgoingEmails?.forEach((email) => {
//     const date_created = moment(email?.created_at).format("YYYY-MM-DD");
//     outboundEmailChartCategories.push(date_created);
//   });
//   let newOutboundEmailChartCategories = [
//     ...new Set(outboundEmailChartCategories),
//   ];
//   newOutboundEmailChartCategories.forEach((date) => {
//     const series_value = outgoingEmails?.filter(
//       (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
//     ).length;
//     outboundEmailChartSeries.push(series_value);
//   });
//   return {
//     // messagesArray,
//     // callsArray,
//     // activeNumbersArray,
//     // emailsArray,
//     numbers: activeNumbersArray,
//     number_of_leads: leadsArray?.length,
//     messages: {
//       number_of_recieved_sms: inboundMessages?.length,
//       number_of_sent_sms: outboundMessages?.length,
//       chart_categories: newInboundMessageChartCategories,
//       chart_series: inboundMessageChartSeries,
//       chart: {
//         // categories: newInboundMessageChartCategories,
//         categories: newOutboundMessageChartCategories,
//         series: [
//           {
//             name: "inbound-messages",
//             data: inboundMessageChartSeries,
//           },
//           { name: "outbound-messages", data: outboundMessageChartSeries },
//         ],
//       },
//     },
//     emails: {
//       number_of_send_emails: outgoingEmails?.length,
//       number_of_emails_recieved: incomingEmails?.length,
//       chart: {
//         categories:
//           newInboundEmailChartCategories.length > 0
//             ? newInboundEmailChartCategories
//             : newOutboundChartCategories,
//         series: [
//           {
//             name: "inbound-emails",
//             data: inboundEmailChartSeries,
//           },
//           { name: "outbound-emails", data: outboundEmailChartSeries },
//         ],
//       },
//       chart_categories: newInboundEmailChartCategories,
//       chart_series: inboundEmailChartSeries,
//     },
//     calls: {
//       number_of_inbound_call: inboundCalls?.length,
//       number_of_outbound_call: outboundCalls?.length,
//       chart: {
//         categories: newInboundChartCategories,
//         series: [
//           {
//             name: "inbound-calls",
//             data: inboundChartSeries,
//           },
//           { name: "outbound-calls", data: outboundChartSeries },
//         ],
//       },
//     },
//   };
// }
// exports.getDashboard = catchAssyncFunc(async function (req, res, next) {
//   const { accountSid, authToken, user_phone, user_email, user_id } = req.body;
//   const user = await db("users").where("id", user_id).first();
//   const users = await db("users").select();
//   const client = accountSid && authToken && twilio(accountSid, authToken);
//   const sub_accounts =
//     user?.parent_id === null &&
//     user?.client_id === null &&
//     user?.role === "USER"
//       ? users?.filter((usr) => parseInt(usr.parent_id) === user.id)
//       : user?.parent_id === null &&
//         user?.client_id === null &&
//         user?.role === "ADMIN" &&
//         users?.filter(
//           (usr) => usr.parent_id !== null && usr.client_id === null
//         );
//   const sub_accounts_data =
//     sub_accounts?.length > 0 && (await getSubAccountsData(sub_accounts));
//   const messages =
//     accountSid &&
//     (await db("messages").where("account_sid", accountSid).select());
//   const invoices = await db("invoices").select();
//   const leads = await db("contacts").where("user_id", req.user.id).select();
//   const subscriptions =
//     user?.role === "ADMIN"
//       ? await db("subscriptions").select()
//       : await db("subscriptions").where("customer_id", req.user.id).select();
//   const outboundMessages = messages?.filter(
//     (message) => message.user_id === user_id && message.direction === "outbound"
//   );
//   const inboundMessages = messages?.filter(
//     (message) => message.user_id === user_id && message.direction === "inbound"
//   );
//   const inboundMessageChartSeries = [];
//   const inboundMessageChartCategories = [];
//   await inboundMessages?.forEach((message) => {
//     const date_created = moment(message?.created_at).format("YYYY-MM-DD");
//     inboundMessageChartCategories.push(date_created);
//   });
//   let newInboundMessageChartCategories = [
//     ...new Set(inboundMessageChartCategories),
//   ];
//   newInboundMessageChartCategories.forEach((date) => {
//     const series_value = inboundMessages?.filter(
//       (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
//     ).length;
//     inboundMessageChartSeries.push(series_value);
//   });
//   const outboundMessageChartSeries = [];
//   const outboundMessageChartCategories = [];
//   await outboundMessages?.forEach((message) => {
//     const date_created = moment(message?.created_at).format("YYYY-MM-DD");
//     outboundMessageChartCategories.push(date_created);
//   });
//   let newOutboundMessageChartCategories = [
//     ...new Set(outboundMessageChartCategories),
//   ];
//   newOutboundMessageChartCategories.forEach((date) => {
//     const series_value = outboundMessages?.filter(
//       (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
//     ).length;
//     outboundMessageChartSeries.push(series_value);
//   });

//   const emails = await db("emails").select();
//   const incomingEmails = emails?.filter(
//     (email) => email.reciever === user_email
//   );
//   const outgoingEmails = emails?.filter((email) => email.sender === user_email);
//   const inboundEmailChartSeries = [];
//   const inboundEmailChartCategories = [];
//   await incomingEmails?.forEach((email) => {
//     const date_created = moment(email?.created_at).format("YYYY-MM-DD");
//     inboundEmailChartCategories.push(date_created);
//   });
//   let newInboundEmailChartCategories = [
//     ...new Set(inboundEmailChartCategories),
//   ];
//   newInboundEmailChartCategories.forEach((date) => {
//     const series_value = incomingEmails?.filter(
//       (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
//     ).length;
//     inboundEmailChartSeries.push(series_value);
//   });
//   const outboundEmailChartSeries = [];
//   const outboundEmailChartCategories = [];
//   await outgoingEmails?.forEach((email) => {
//     const date_created = moment(email?.created_at).format("YYYY-MM-DD");
//     outboundEmailChartCategories.push(date_created);
//   });
//   let newOutboundEmailChartCategories = [
//     ...new Set(outboundEmailChartCategories),
//   ];
//   newOutboundEmailChartCategories.forEach((date) => {
//     const series_value = outgoingEmails?.filter(
//       (msg) => moment(msg?.created_at).format("YYYY-MM-DD") === date
//     ).length;
//     outboundEmailChartSeries.push(series_value);
//   });

//   const numbers =
//     accountSid && authToken ? await client.incomingPhoneNumbers.list() : []; //list claimed numbers

//   const calls =
//     accountSid && authToken
//       ? await client.calls.list({
//           // limit: 10,
//           status: "completed",
//         })
//       : [];
//   const inboundCalls =
//     user?.role === "AGENT"
//       ? calls?.filter(
//           (call) => call?.direction === "inbound" && call?.from === user_phone
//         )
//       : calls?.filter((call) => call?.direction === "inbound");
//   const outboundCalls =
//     user?.role === "AGENT"
//       ? calls?.filter(
//           (call) =>
//             call?.direction === "outbound-dial" && call?.from === user_phone
//         )
//       : calls?.filter((call) => call?.direction === "outbound-dial");
//   const inboundChartSeries = [];
//   const inboundChartCategories = [];
//   await inboundCalls?.forEach((call) => {
//     const date_created = moment(call?.dateCreated).format("YYYY-MM-DD");
//     inboundChartCategories.push(date_created);
//   });
//   let newInboundChartCategories = [...new Set(inboundChartCategories)];
//   newInboundChartCategories?.forEach((date) => {
//     const series_value = inboundCalls?.filter(
//       (call) => moment(call?.dateCreated).format("YYYY-MM-DD") === date
//     ).length;
//     inboundChartSeries.push(series_value);
//   });

//   const outboundChartSeries = [];
//   const outboundChartCategories = [];
//   await outboundCalls?.forEach((call) => {
//     const date_created = moment(call?.dateCreated).format("YYYY-MM-DD");
//     outboundChartCategories.push(date_created);
//   });
//   let newOutboundChartCategories = [...new Set(outboundChartCategories)];
//   newOutboundChartCategories?.forEach((date) => {
//     const series_value = outboundCalls?.filter(
//       (call) => moment(call?.dateCreated).format("YYYY-MM-DD") === date
//     ).length;
//     outboundChartSeries.push(series_value);
//   });

//   return helper.sendSuccess(
//     req,
//     res,
//     {
//       dashboardData: {
//         sub_accounts_data,
//         messages: {
//           number_of_recieved_sms: inboundMessages?.length,
//           number_of_sent_sms: outboundMessages?.length,
//           chart_categories: newInboundMessageChartCategories,
//           chart_series: inboundMessageChartSeries,
//           chart: {
//             // categories: newInboundMessageChartCategories,
//             categories: newOutboundMessageChartCategories,
//             series: [
//               {
//                 name: "inbound-messages",
//                 data: inboundMessageChartSeries,
//               },
//               { name: "outbound-messages", data: outboundMessageChartSeries },
//             ],
//           },
//         },
//         emails: {
//           number_of_send_emails: outgoingEmails?.length,
//           number_of_emails_recieved: incomingEmails?.length,
//           chart: {
//             categories:
//               newInboundEmailChartCategories.length > 0
//                 ? newInboundEmailChartCategories
//                 : newOutboundChartCategories,
//             series: [
//               {
//                 name: "inbound-emails",
//                 data: inboundEmailChartSeries,
//               },
//               { name: "outbound-emails", data: outboundEmailChartSeries },
//             ],
//           },
//           chart_categories: newInboundEmailChartCategories,
//           chart_series: inboundEmailChartSeries,
//         },
//         numbers,
//         sub_accounts,
//         calls: {
//           number_of_inbound_call: inboundCalls?.length,
//           number_of_outbound_call: outboundCalls?.length,
//           chart: {
//             categories: newInboundChartCategories,
//             series: [
//               {
//                 name: "inbound-calls",
//                 data: inboundChartSeries,
//               },
//               { name: "outbound-calls", data: outboundChartSeries },
//             ],
//           },
//         },
//         number_of_invoices_sent: invoices?.length,
//         number_of_leads: leads?.length,
//         number_of_subscriptions: subscriptions?.length,
//       },
//     },
//     "success"
//   );
// });
