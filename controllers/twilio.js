const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");
const twilio = require("twilio");
const bcrypt = require("bcryptjs");
const nodeMailer = require("nodemailer");
const { AccessToken } = twilio.jwt;
const VoiceResponse = twilio.twiml.VoiceResponse;

async function sendGridEmail(toEmail, subject, htmlText) {
  const transporter = nodeMailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey", // This is the fixed username for SendGrid SMTP
      pass: config.SENDGRID_API_KEY, // Your SendGrid API key
    },
  });
  // Define the email options
  const mailOptions = {
    from: "Desktopcrm <support@app.desktopcrm.com>", // Sender address
    to: toEmail, // List of recipients
    subject: subject,
    // text: "This is a test email sent using Nodemailer with SendGrid.",
    html: htmlText,
  };
  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error:", error);
    }
    console.log("Email sent:", info);
  });
}
exports.sendFax = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken, fromFaxNumber, toFaxNumber } = req.body;
  const client = twilio(accountSid, authToken);
  const fax_sent = await client.fax.faxes.create({
    from: fromFaxNumber,
    to: toFaxNumber,
    mediaUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqGK3diR3Zi-mnOXEaj-3ewmFyRYVxGzVzZw&s", // URL to the document you want to fax
  });
});
exports.getAvailableNumbers = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken } = req.body;
  const numbers = await twilio(accountSid, authToken)
    .availablePhoneNumbers("US")
    .local.list(); //list by country code
  // const numbers = await twilioClient.incomingPhoneNumbers.list();//list claimed numbers
  // const numbers = await twilioClient.availablePhoneNumbers.list();
  return helper.sendSuccess(
    req,
    res,
    {
      availablePhoneNumbers: numbers,
    },
    "success"
  );
});
exports.updateBalanceAfterCall = catchAssyncFunc(async function (
  req,
  res,
  next
) {
  const { accountSid, authToken, user_id } = req.body;
  const client = twilio(accountSid, authToken);
  const is_exist_balance = await db("balance")
    .where("user_id", user_id)
    .first();
  const calls = await client.calls.list({ limit: 2 });
  let credit = 0;
  calls?.map((call) => {
    if (call?.status === "completed" && call?.price !== null) {
      credit = credit + parseFloat(call.price) * 100 * 2;
    }
  });
  console.log("credit: " + credit);
  const is_balance_updated = await db("balance")
    .where("user_id", user_id)
    .update({
      credit: parseFloat(is_exist_balance?.credit) + credit,
    });
  return helper.sendSuccess(req, res, {}, "balance updated successfully");
});
exports.getClaimedNumbers = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken } = req.body;

  const numbers = await twilio(
    accountSid,
    authToken
  ).incomingPhoneNumbers.list(); //list claimed numbers
  return helper.sendSuccess(
    req,
    res,
    {
      claimedNumbers: numbers,
    },
    "success"
  );
});
exports.getMainClaimedNumbers = catchAssyncFunc(async function (
  req,
  res,
  next
) {
  const activeNumbersArray = [];
  const sub_accounts = await db("users")
    .where("parent_id", req.user.id)
    .select();
  await Promise.all(
    sub_accounts.map(async (acc, index) => {
      const client = twilio(acc?.accountSid, acc?.authToken);

      const numbers = await client.incomingPhoneNumbers.list(); //list claimed number
      activeNumbersArray.push(...numbers);
    })
  );
  return helper.sendSuccess(
    req,
    res,
    {
      claimedNumbers: activeNumbersArray,
    },
    "success"
  );
});
exports.getAdminClaimedNumbers = catchAssyncFunc(async function (
  req,
  res,
  next
) {
  const activeNumbersArray = [];
  const sub_accounts = await db("users").whereNotNull("parent_id").select();
  await Promise.all(
    sub_accounts.map(async (acc, index) => {
      const client = twilio(acc?.accountSid, acc?.authToken);
      const numbers = await client.incomingPhoneNumbers.list(); //list claimed number
      activeNumbersArray.push(...numbers);
    })
  );
  return helper.sendSuccess(
    req,
    res,
    {
      claimedNumbers: activeNumbersArray,
    },
    "success"
  );
});
exports.createSubAccount = catchAssyncFunc(async function (req, res, next) {
  const { account_name, username, name, email, password } = req.body;
  const is_exist_user = await db("users").where("email", email).first();
  if (is_exist_user) {
    return helper.sendSuccess(
      req,
      res,
      {},
      "User already exists with this email."
    );
  }

  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  // Create a subaccount
  twilioClient.api.accounts.create(
    {
      friendlyName: account_name, // Provide a friendly name for the subaccount
    },
    async (err, account) => {
      if (err) {
        return helper.sendError(req, res, err, 500);
      } else {
        const is_added_to_database = await db("sub_accounts").insert({
          user_id: req.user.id,
          authToken: account.authToken,
          sid: account.sid,
          friendlyName: account.friendlyName,
          status: account.status,
          subresourceUris: account.subresourceUris,
          type: account.type,
          uri: account.uri,
          name,
          username,
          email,
          password: hashedPassword,
        });

        return helper.sendSuccess(
          req,
          res,
          account,
          "Accounts created successfully."
        );
      }
    }
  );
});
exports.getUserSubAccounts = catchAssyncFunc(async function (req, res, next) {
  const sub_accounts = await db("sub_accounts")
    .where("user_id", req.user.id)
    .select();
  return helper.sendSuccess(
    req,
    res,
    { subAccountsData: sub_accounts },
    "success"
  );
});
exports.recieveSMS = catchAssyncFunc(async function (req, res, next) {
  console.log(req.body);
  const user = await db("users")
    .where("accountSid", req.body.AccountSid)
    .first();
  const is_added_to_database = await db("messages").insert({
    from_phone: req.body.From,
    to_phone: req.body.To,
    message: req.body.Body,
    sid: req.body.SmsSid,
    account_sid: req.body.AccountSid,
    // media_urls: { urls: [] },
    direction: "inbound",
  });

  const messages = await db("messages")
    .where("account_sid", req.body.AccountSid)
    .select();
  io.to(user.socket_id).emit("message_received", messages);
  if (user.connected === 0) {
    const htmlMessage = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #008080;
                color: white;
                padding: 10px;
                text-align: center;
                border-radius: 8px 8px 0 0;
            }
            .content {
                padding: 20px;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                margin-top: 20px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 4px;
                text-decoration: none;
            }
            .footer {
                margin-top: 20px;
                color: #666666;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <p style="font-size:24px"><b>DesktopCRM</b></p>
                <p style="font-size:16px">New Message Notification</p>
            </div>
            <div class="content">
                <p>Hello ${user?.name},</p>
                <p>You have received a new message:</p>
                <p><b>From:</b> ${req.body.From}</p>
                <p><b>Client ID:</b> ${req.body.To}</p>
                <p><b>Message:</b></p>
                <p>${req.body.Body?.slice(0, 100)}...</p>
                <a style="text-decoration:none,color:white" href="https://app.desktopcrm.com/chats" class="button">View Message</a>
                <p>If you have any questions or need further assistance, please contact our support team at [support@app.desktopcrm.com].</p>
            </div>
            <div class="footer">
                <p>Thank you for using <b>DesktopCRM</b>!<br>The <b>DesktopCRM</b> Team</p>
            </div>
        </div>
    </body>
    </html>`;
    const is_send = await sendGridEmail(
      user.email,
      "Message Notification",
      htmlMessage
    );
  }
  res.end();
});
exports.listenSMS = catchAssyncFunc(async function (req, res, next) {
  console.log(req.body);
  const messageSid = req.body.MessageSid;
  const messageStatus = req.body.MessageStatus;
  const user = await db("users").where("phone", req.body.to).first();
  const is_added_to_database = await db("messages").insert({
    user_id: "",
    from_name: data?.from?.name,
    to_name: data?.to?.name,
    from_phone: data?.from?.phone,
    to_phone: data?.to?.phone,
    message: data?.message,
    account_sid: data?.from?.accountSid,
  });
  const messages = await db("messages")
    .where("from_phone", user?.phone)
    .orWhere("to_phone", user?.phone)
    .select();
  console.log("🚀 ~ messages:", messages);
  io.to(user.socket_id).emit("message_received", messages);
  // Handle the message status update
  console.log(`Message SID: ${messageSid}, Status: ${messageStatus}`);
  console.log(req.body);
});
exports.getMessageDetails = catchAssyncFunc(async function (req, res, next) {
  const message = await twilioClient
    .messages("SM5be06050a67bdb9510fd1b3bc2b50534")
    .fetch();
  return helper.sendSuccess(req, res, message, "success");
  // {
  //   ToCountry: 'US',
  //   ToState: 'PA',
  //   SmsMessageSid: 'SM5be06050a67bdb9510fd1b3bc2b50534',
  //   NumMedia: '0',
  //   ToCity: '',
  //   FromZip: '',
  //   SmsSid: 'SM5be06050a67bdb9510fd1b3bc2b50534',
  //   FromState: '',
  //   SmsStatus: 'received',
  //   FromCity: '',
  //   Body: 'ffdgh',
  //   FromCountry: 'PK',
  //   To: '+14849993639',
  //   ToZip: '',
  //   NumSegments: '1',
  //   MessageSid: 'SM5be06050a67bdb9510fd1b3bc2b50534',
  //   AccountSid: 'AC1237366c79ad62eb76b0e0775cf053d3',
  //   From: '+923147003802',
  //   ApiVersion: '2010-04-01'
  // }
});
exports.inboundMessages = catchAssyncFunc(async function (req, res, next) {
  const { phoneNumber, accountSid, authToken } = req.body;
  const client = twilio(accountSid, authToken);
  const messages = await client.messages.list({
    // to: phoneNumber, // Filter by recipient's phone number
    // direction: "inbound", // Filter for inbound messages
    // limit: 20, // Limit the number of messages to retrieve (adjust as needed)
  });

  // Process the received messages or return them as needed
  return helper.sendSuccess(req, res, { messagesData: messages }, "success");
});
exports.userMessages = catchAssyncFunc(async function (req, res, next) {
  const messages = await db("messages")
    .where("from_phone", req.user.phone)
    .orWhere("to_phone", req.user.phone)
    .select();

  // Process the received messages or return them as needed
  return helper.sendSuccess(req, res, { messagesData: messages }, "success");
});
exports.updateWebhookUrl = catchAssyncFunc(async function (req, res, next) {
  const { phoneNumber, webhookUrl, subAccountSid, subAuthToken } = req.body;
  console.log("🚀 ~ req.body:", req.body);
  const client = twilio(subAccountSid, subAuthToken); // Use subaccount credentials

  const number = await client.incomingPhoneNumbers.list({
    phoneNumber: phoneNumber,
    limit: 1,
  });
  console.log("Number updated successfully:", number);

  if (number && number.length > 0) {
    const updatedNumber = await client
      .incomingPhoneNumbers(number[0].sid)
      .update({
        smsUrl: webhookUrl, // Update the webhook URL for incoming messages
      });
    return helper.sendSuccess(req, res, updatedNumber, "success");
  }
});
exports.claimPhoneNumber = catchAssyncFunc(async function (req, res, next) {
  const { phoneNumber, subAccountSid, subAuthToken, addressSid } = req.body;
  console.log("🚀 ~ req.body;:", req.body);
  const client = twilio(subAccountSid, subAuthToken); // Use subaccount credentials

  //claim phone number
  const incomingPhoneNumber = await client.incomingPhoneNumbers.create({
    phoneNumber: phoneNumber,
    addressSid: addressSid,
  });
  const number_config = await client
    .incomingPhoneNumbers(incomingPhoneNumber.sid)
    .update({
      voiceUrl: "https://desktopcrm.com:51/v1/user/calling/listen-call", // URL for handling incoming voice calls
      voiceMethod: "POST", // HTTP method for handling incoming voice calls
      smsUrl: "https://desktopcrm.com:51/v1/user/calling/recieve-sms",
      smsMethod: "POST",
      // statusCallback: "https://desktopcrm.com:51/v1/user/calling/listen-call-status", // URL for handling voice call status callbacks
      // statusCallbackMethod: "POST", // HTTP method for voice call status callbacks
    })
    .then((response) => {})
    .catch((error) => {
      return helper.sendError(req, res, error, 400);
    });
  return helper.sendSuccess(
    req,
    res,
    incomingPhoneNumber,
    "Phone Number claimed and configured successfully!"
  );
});
exports.searchPhoneNumbers = catchAssyncFunc(async function (req, res, next) {
  const {
    area_code,
    locality,
    number,
    country,
    numberType,
    voice,
    sms,
    mms,
    fax,
    accountSid,
    authToken,
  } = req.body;
  console.log("🚀 ~ req.body:", req.body);
  const filters = {};
  // if (area_code) {
  //   filters.areaCode = area_code;
  // }
  if (area_code) {
    filters.contains = area_code + "*"; // Filter by region name
  }
  if (number) {
    filters.contains = number; // Filter by region name
  }
  // Add filters for voice, SMS, MMS, and fax capabilities
  if (voice) {
    filters.voiceEnabled = voice;
  }
  if (sms) {
    filters.smsEnabled = sms;
  }
  if (mms) {
    filters.mmsEnabled = mms;
  }
  if (fax) {
    filters.faxEnabled = fax;
  }
  console.log("🚀 ~ filters:", filters);

  const numbers = await twilio(accountSid, authToken)
    .availablePhoneNumbers(country)
    [numberType].list(filters); //list by country code
  return helper.sendSuccess(
    req,
    res,
    {
      availablePhoneNumbers: numbers,
    },
    "success"
  );
});
exports.listenCallStatus = catchAssyncFunc(async function (req, res, next) {
  const To = req.body.To;
  const From = req.body.from || req.body.Caller;
  const client = new twilio.twiml.VoiceResponse();
  let user;
  if (req.body.CallToken) {
    user = await db("users").where("phone", To).first();
  } else {
    user = await db("users").where("phone", From).first();
  }
  console.log("🚀 ~ user:", user);
  const is_recording = user?.recording === 1 ? true : false;
  console.log("🚀 ~ is_recording:", req.body);

  if (req.body.CallToken) {
    // client.say("Incoming call");
    // client.say(
    //   {
    //     voice: "man",
    //     loop: 3,
    //     rate: -10, // Adjust the rate parameter to slow down the speech
    //   },
    //   "Press 1 for contacting with agent"
    // );

    // Check if DTMF input was received
    // const userInput = req.body.Digits;
    // console.log("🚀 ~ userInput:", userInput);
    // if (userInput === "1") {
    //   client.dial({ record: true }).client("mu24081999");
    // } else {
    //   client.say("Invalid input. Goodbye!"); // Handle invalid input
    // }
    client.dial({ record: true }).client(user?.username);
    const notificationData = await db("notifications").insert({
      user_id: user.id,
      notification: `A call comming from number ${From}`,
      type: "incoming_call",
    });
    const notifications = await db("notifications")
      .where("user_id", user.id)
      .select();
    io.to(user.socket_id).emit("trigger_notification", notifications);
  } else {
    const dial = client.dial({
      callerId: From,
      record: is_recording,
    });
    dial.number(To);
  }

  res.set("Content-Type", "text/xml");
  res.send(client.toString());
});
exports.transferCall = catchAssyncFunc(async function (req, res, next) {
  const { callSid, targetClient, accountSid, authToken } = req.body;
  // Basic input validation
  if (!callSid || !targetClient || !accountSid || !authToken) {
    return res.status(400).send({ error: "Missing required parameters" });
  }
  const client = twilio(accountSid, authToken);
  client
    .calls(callSid)
    .update({
      twiml: `<Response><Dial record="true"><Client>${targetClient}</Client></Dial></Response>`,
    })
    .then((call) => {
      console.log("call: ", call);
      res.send(call);
    })
    .catch((error) => res.status(500).send(error));
});
exports.addConfressCall = catchAssyncFunc(async function (req, res, next) {
  const { callSid, targetClient, accountSid, authToken } = req.body;
  // Basic input validation
  if (!callSid || !targetClient || !accountSid || !authToken) {
    return res.status(400).send({ error: "Missing required parameters" });
  }
  const client = twilio(accountSid, authToken);

  // Update the call to move it to a conference
  const call = await client.calls(callSid).update({
    twiml: `<Response><Dial><Conference>${targetClient}-conference</Conference></Dial></Response>`,
  });

  console.log("Call transferred to conference:", call);

  // Add the new participant to the conference
  await client.conferences(`${targetClient}-conference`).participants.create({
    to: `client:${targetClient}`,
    from: call.to,
  });
  res.send(call);
});
exports.pauseRecording = catchAssyncFunc(async function (req, res, next) {
  // const { callSid, accountSid, authToken } = req.body;
  // const client = twilio(accountSid, authToken);
  // const recording = await client.calls(callSid).recordings.list({ limit: 1 });
  // console.log("🚀 ~ recording:", recording);
  // if (recording.length > 0) {
  //   const recordingSid = recording[0].sid;
  //   await client
  //     .calls(callSid)
  //     .recordings(recordingSid)
  //     .update({ status: "paused" });
  //   return helper.sendSuccess(req, res, {}, "Recording Paused.");
  //   // res.status(200).send({ success: true, message: "Recording paused" });
  // } else {
  //   return helper.sendSuccess(req, res, {}, "No Recording Found.");
  // }
  const { callSid, accountSid, authToken } = req.body;
  const client = twilio(accountSid, authToken);
  client
    .calls(callSid)
    .update({
      twiml: `<Response>
      <StopRecording/></Response>`,
    })
    .then((call) => {
      console.log("call: ", call);
      res.send(call);
    })
    .catch((error) => res.status(500).send(error));
});
exports.resumeRecording = catchAssyncFunc(async function (req, res, next) {
  const { callSid, accountSid, authToken } = req.body;
  const client = twilio(accountSid, authToken);
  const recording = await client.calls(callSid).recordings.list({ limit: 1 });
  console.log("🚀 ~ recording:", recording);
  if (recording.length > 0) {
    const recordingSid = recording[0].sid;
    await client
      .calls(callSid)
      .recordings(recordingSid)
      .update({ status: "in-progress" });
    return helper.sendSuccess(req, res, {}, "Recording Resumed.");
    // res.status(200).send({ success: true, message: "Recording paused" });
  } else {
    return helper.sendSuccess(req, res, {}, "No Recording Found.");
  }
});
exports.getConversationsList = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken } = req.body;
  const client = twilio(accountSid, authToken);
  const calls = await client.calls.list();
  const conversations = [];
  calls?.map((call) => {
    if (call?.to && !call?.to?.includes("client"))
      conversations?.push(call?.to);
  });
  const filteredArray = conversations?.filter((item, index) => {
    return conversations.indexOf(item) === index;
  });
  return helper.sendSuccess(
    req,
    res,
    { conversations: filteredArray },
    "success"
  );
});
exports.getCallLogs = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken, phoneNumber, direction } = req.body;
  const client = twilio(accountSid, authToken);
  let calls = await client.calls.list({
    limit: 400,
    from: phoneNumber,
  });
  if (direction) {
    calls = calls?.filter((call) => call.direction === direction);
  }
  const allRecordings = await client.recordings.list({ limit: 200 });
  // console.log("🚀 ~ allRecordings:", allRecordings);

  // Iterate through each call
  const recordingsMap = {};
  for (const recording of allRecordings) {
    if (!recordingsMap[recording.callSid]) {
      recordingsMap[recording.callSid] = [];
    }
    recordingsMap[recording.callSid].push(recording);
  }
  const history = [];
  // Add recordings to the call objects
  for (const call of calls) {
    const recordings =
      recordingsMap[call.parentCallSid ? call.parentCallSid : call.sid] || [];
    history.push({
      call: call,
      recording: recordings?.length > 0 ? recordings[0] : {},
    });
  }
  return helper.sendSuccess(req, res, { callsData: history }, "success");
});
exports.getCallRecordings = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken } = req.body;
  const client = twilio(accountSid, authToken);
  const recordings = await client.recordings.list({ limit: 50 });
  return helper.sendSuccess(
    req,
    res,
    { recordingsData: recordings },
    "success"
  );
});
const ClientCapability = twilio.jwt.ClientCapability;
exports.getCalls = catchAssyncFunc(async function (req, res, next) {
  const response = new VoiceResponse();
  io.emit("callComming", req.body);
  response.say(
    { voice: "man", loop: 3 },
    "Press one for contacting with agent and press 2 for contacting with admin"
  );
  res.type("text/xml");
  res.send(response.toString());
  console.log("🚀 ~ req.body:", req.body);
});
exports.getCallToken = catchAssyncFunc(async function (req, res, next) {
  //   const capability = new twilio.jwt.ClientCapability({
  //     accountSid: accountSid,
  //     authToken: authToken,
  // });
  // capability.addScope(new twilio.jwt.ClientCapability.IncomingClientScope('identity'));
  // capability.addScope(new twilio.jwt.ClientCapability.OutgoingClientScope({ applicationSid: twiml_app_sid }));
  // const token = capability.toJwt();
  // res.send({ token: token });
  const {
    from_phone,
    accountSid,
    identity,
    authToken,
    twiml_app_sid,
    api_key_sid,
    api_key_secret,
  } = req.body;
  const accessToken = new AccessToken(
    // config.TWILLIO_ACCOUNT_SID,
    // accountSid,
    // config.TWILIO_API_KEY,
    // config.TWILIO_VOICE_API_KEY_AUTH_TOKEN,
    accountSid,
    api_key_sid,
    api_key_secret,
    {
      // identity: "umar",
      identity: identity,
    }
  );
  accessToken.identity = identity;

  const grant = new AccessToken.VoiceGrant({
    // outgoingApplicationSid: config.TWILIO_TWIML_SID,
    outgoingApplicationSid: twiml_app_sid,
    incomingAllow: true,
    outgoingApplicationParams: { from: from_phone }, // Set the "from" number here
  });
  accessToken.addGrant(grant);

  res.json({ token: accessToken.toJwt() });
});
exports.routeCall = catchAssyncFunc(async function (req, res, next) {
  console.log("route-call", req.body);
  const response = new VoiceResponse();
  response.dial().client("joey");
  res.type("text/xml");
  res.send(response.toString());
});
exports.answerCall = catchAssyncFunc(async function (req, res, next) {
  const { callId } = req.body;
  twilio(config.TWILLIO_ACCOUNT_SID, config.TWILLIO_AUTH_TOKEN)
    .calls(callId)
    .update({
      url: "https://6428-37-111-155-42.ngrok-free.app/v1/user/calling/routeCall",
      method: "POST",
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
});
exports.makeCall = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken, from, to, twiML_url } = req.body;
  console.log(req.body);
  twilio(accountSid, authToken)
    .calls.create({
      // url: "https://27bc-37-111-144-254.ngrok-free.app/v1/user/calling/voice.xml", // TwiML URL for handling the call
      twiml:
        "<Response><Connect><Stream url='https://cd36-2404-3100-18b0-9703-79e9-d30b-153a-cf7.ngrok-free.app/v1/user/calling/call_steam' /></Connect></Response",
      record: true,
      method: "GET",
      statusCallback:
        "https://cd36-2404-3100-18b0-9703-79e9-d30b-153a-cf7.ngrok-free.app/v1/user/calling/listen-call",
      statusCallbackMethod: "POST",
      to: to, // Receiver's phone number
      from: from, // Your Twilio phone number
    })
    .then((call) => {
      return helper.sendSuccess(req, res, { callData: call });
    })
    .catch((error) => helper.sendError(req, res, JSON.stringify(error), 500));
});
exports.sendSMSBulk = catchAssyncFunc(async function (req, res, next) {
  const { from, to, message } = req.body;
  const e164Regex = /^\+[1-9]\d{1,14}$/;

  const client = twilio(from?.accountSid, from?.authToken);
  if (Array.isArray(to)) {
    const is_sent_all = await Promise.all(
      to?.map(async (contact) => {
        return new Promise(async (resolve, reject) => {
          if (contact?.phone && e164Regex.test(contact?.phone)) {
            const params = {
              from: from.phone, // Your Twilio phone number
              to: contact.phone, // Recipient's phone number
              // sendAt: new Date(Date.UTC(2021, 10, 30, 20, 36, 27)),
              // scheduleType: 'fixed'
              body: message, // Message content
              // mediaUrl: [
              //   "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
              //   "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
              // ],
            };
            const is_sent = await client.messages.create(params);
            console.log("🚀 ~ returnnewPromise ~ is_sent:", is_sent);
            if (is_sent) {
              const is_added_to_database = await db("messages").insert({
                user_id: from?.user_id,
                from_name: from?.name,
                to_name: contact?.firstname + "" + contact?.lastname,
                from_phone: from?.phone,
                to_phone: contact?.phone,
                message: message,
                account_sid: from?.accountSid,
                sid: is_sent?.sid,
                price: is_sent?.price,
                uri: is_sent?.uri,
                num_media: is_sent?.numMedia,
              });
              resolve(true);
            } else {
              reject(true);
            }
          }
        });
      })
    );
    return helper.sendSuccess(req, res, {}, "SMS sent.");
  }
});
