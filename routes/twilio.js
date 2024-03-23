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
  getCalls,
  getCallToken,
  routeCall,
  answerCall,
  getCallLogs,
  getCallRecordings,
  getUserSubAccounts,
} = require("../controllers/twilio");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/available-numbers", IsAuth, getAvailableNumbers);
router.post("/search-number", IsAuth, searchPhoneNumbers);
router.post("/create-sub-account", IsAuth, createSubAccount);
router.get("/get-sub-accounts", IsAuth, getUserSubAccounts);
router.post("/claim-phone-number", IsAuth, claimPhoneNumber);
router.post("/update-phone-number", IsAuth, updateWebhookUrl);
router.get("/user-messages", IsAuth, userMessages);
router.post("/recieve-sms", recieveSMS);
router.get("/message-details", getMessageDetails);
router.post("/inbound-messages", inboundMessages);
router.post("/listen-call", listenCallStatus);
router.post("/get-call-token", IsAuth, getCallToken);
// router.post("/get-calls", getCalls);
// router.post("/routeCall", routeCall);
// router.post("/answer-call", answerCall);
// router.post("/make-call", makeCall);
router.post("/call-logs", getCallLogs);
router.post("/call-recordings", getCallRecordings);

module.exports = router;
