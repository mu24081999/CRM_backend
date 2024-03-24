const catchAssyncFunc = require("../middlewares/catchAsyncFunc");
const helper = require("../helper/helper");
const Joi = require("joi");
const moment = require("moment");
const twilio = require("twilio");
const bcrypt = require("bcryptjs");

const { AccessToken } = twilio.jwt;
const VoiceResponse = twilio.twiml.VoiceResponse;
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
  // const twiml = new twilio.twiml.MessagingResponse();
  const message = await twilioClient.messages(req.body.MessageSid).fetch();
  const is_added_to_database = await db("messages").insert({
    from_phone: message.from,
    to_phone: message.to,
    message: message.body,
    sid: message.sid,
    price: message.price,
    account_sid: message.accountSid,
    uri: message.uri,
    num_media: message.numMedia,
    media_urls: { urls: [] },
  });
  const user = await db("users").where("phone", message.to).first();
  console.log("🚀 ~ user:", user);
  const messages = await db("messages")
    .where("from_phone", user?.phone)
    .orWhere("to_phone", user?.phone)
    .select();
  console.log("🚀 ~ messages:", messages);
  io.to(user.socket_id).emit("message_received", messages);

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
  const { phoneNumber, subAccountSid, subAuthToken } = req.body;
  const client = twilio(subAccountSid, subAuthToken);
  const messages = await client.messages.list({
    to: phoneNumber, // Filter by recipient's phone number
    direction: "inbound", // Filter for inbound messages
    limit: 20, // Limit the number of messages to retrieve (adjust as needed)
  });

  // Process the received messages or return them as needed
  return helper.sendSuccess(req, res, messages, "success");
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
  const { phoneNumber, subAccountSid, subAuthToken } = req.body;
  const client = twilio(subAccountSid, subAuthToken); // Use subaccount credentials

  //claim phone number
  const incomingPhoneNumber = await client.incomingPhoneNumbers.create({
    phoneNumber: phoneNumber,
  });
  return helper.sendSuccess(req, res, incomingPhoneNumber, "success");
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
  if (area_code) {
    filters.areaCode = area_code;
  }
  if (locality) {
    filters.contains = locality; // Filter by region name
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
  const numbers = await twilio(accountSid, authToken)
    .availablePhoneNumbers(country)
    [numberType].list(filters); //list by country code
  console.log("🚀 ~ numbers:", numbers);
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
  console.log("status", req.body);
  const To = req.body.To;
  const From = req.body.from || req.body.Caller;
  const client = new twilio.twiml.VoiceResponse();
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
    client.dial({ record: true }).client("mu24081999");
  } else {
    const dial = client.dial({
      callerId: From,
      record: true,
    });
    dial.number(To);
  }

  res.set("Content-Type", "text/xml");
  res.send(client.toString());
});
exports.getCallLogs = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken } = req.body;
  const client = twilio(accountSid, authToken);
  const calls = await client.calls.list();
  return helper.sendSuccess(req, res, { callsData: calls }, "success");
});
exports.getCallRecordings = catchAssyncFunc(async function (req, res, next) {
  const { accountSid, authToken } = req.body;
  console.log("recordings", accountSid, authToken);
  const client = twilio(accountSid, authToken);
  const recordings = await client.recordings.list();
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
  // const capability = new ClientCapability({
  //   accountSid: config.TWILLIO_ACCOUNT_SID,
  //   authToken: config.TWILLIO_AUTH_TOKEN,
  // });
  // capability.addScope(new ClientCapability.IncomingClientScope("joey"));
  // const token = capability.toJwt();
  // res.set("Content-Type", "application/jwt");
  // res.json({ token: token });
  const { from_phone, accountSid, identity, authToken } = req.body;
  console.log("🚀 ~ identity:", req.body);

  const accessToken = new AccessToken(
    // config.TWILLIO_ACCOUNT_SID,
    accountSid,
    config.TWILIO_API_KEY,
    config.TWILIO_VOICE_API_KEY_AUTH_TOKEN
    {
      // identity: "umar",
      identity: identity,
    }
  );
  accessToken.identity = identity;

  const grant = new AccessToken.VoiceGrant({
    outgoingApplicationSid: config.TWILIO_TWIML_SID,
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
