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
  getClaimedNumbers,
  getMainClaimedNumbers,
  listenSMS,
  getAdminClaimedNumbers,
  transferCall,
  updateBalanceAfterCall,
  pauseRecording,
  resumeRecording,
  addConfressCall,
  sendSMSBulk,
  getConversationsList,
  createRegulatoryBundle,
} = require("../controllers/twilio");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post(
  "/available-numbers",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getAvailableNumbers
);
router.get(
  "/main-claimed-numbers",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getMainClaimedNumbers
);
router.get(
  "/admin-claimed-numbers",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getAdminClaimedNumbers
);
router.post(
  "/claimed-numbers",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getClaimedNumbers
);
router.post(
  "/search-number",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  searchPhoneNumbers
);
router.post(
  "/create-sub-account",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  createSubAccount
);
router.get(
  "/get-sub-accounts",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getUserSubAccounts
);
router.post(
  "/claim-phone-number",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  claimPhoneNumber
);
router.post(
  "/update-phone-number",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  updateWebhookUrl
);
router.get(
  "/user-messages",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  userMessages
);
router.post(
  "/send-sms-bulk",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  sendSMSBulk
);
router.post("/recieve-sms", recieveSMS);
router.post("/listen-sms-status", listenSMS);
router.get("/message-details", getMessageDetails);
router.post("/user-messages-logs", inboundMessages);
router.post("/listen-call", listenCallStatus);
router.post("/update-balance", updateBalanceAfterCall);
router.post("/transfer-call", transferCall);
router.post("/add-confress-call", addConfressCall);

router.post("/pause-recording", pauseRecording);
router.post("/resume-recording", resumeRecording);
router.post(
  "/get-call-token",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  getCallToken
);
// router.post("/get-calls", getCalls);
// router.post("/routeCall", routeCall);
// router.post("/answer-call", answerCall);
// router.post("/make-call", makeCall);
router.post("/call-logs", getCallLogs);
router.post("/call-recordings", getCallRecordings);
router.post("/get-conversations", getConversationsList);
router.post("/create-regulatory-bundle", createRegulatoryBundle);

module.exports = router;
