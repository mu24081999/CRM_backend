const express = require("express");
const router = express.Router();
const {
  getAvailableNumbers,
  searchPhoneNumbers,
  createSubAccount,
  claimPhoneNumber,
  updateWebhookUrl,
  recieveSMS,
  inboundMessages,
  getMessageDetails,
  userMessages,
  listenCallStatus,
  makeCall,
  generateCallToken,
  getCalls,
  getCallToken,
  routeCall,
  answerCall,
  getCallSteam,
} = require("../controllers/twilio");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.get("/available-numbers", IsAuth, getAvailableNumbers);
router.post("/search-number", IsAuth, searchPhoneNumbers);
router.post("/create-sub-account", IsAuth, createSubAccount);
router.post("/claim-phone-number", IsAuth, claimPhoneNumber);
router.post("/update-phone-number", IsAuth, updateWebhookUrl);
router.get("/user-messages", IsAuth, userMessages);
router.post("/recieve-sms", recieveSMS);
router.get("/message-details", getMessageDetails);
router.post("/inbound-messages", inboundMessages);
router.post("/listen-call", listenCallStatus);
router.get("/get-call-token", getCallToken);
router.post("/get-calls", getCalls);
router.post("/routeCall", routeCall);
router.post("/answer-call", answerCall);
router.post("/make-call", makeCall);
router.post("/call_steam", getCallSteam);

module.exports = router;
