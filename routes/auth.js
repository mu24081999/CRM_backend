const express = require("express");
const router = express.Router();
const {
  signUp,
  signIn,
  forgotPassword,
  verifyResetPasswordOTP,
  resetPassword,
  logout,
} = require("../controllers/auth");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/signup_user", signUp);
router.post("/siginin_user", signIn);
router.post("/signout_user", IsAuth, logout);
router.post("/forgot_password", forgotPassword);
router.post("/verify_otp", verifyResetPasswordOTP);
router.post("/reset_password", resetPassword);
// router.post("/login_user_email", loginUserEmail);
// router.post("/signin_freelancer", loginFreelancer);
// router.post("/sendotp", sendotp);
// router.post("/forgot_password", forgotPassword);
// router.post("/verify_reset_password_otp", verifyResetPasswordOTP);
// router.post("/reset_password", resetPassword);

// router.post("/verify-otp", verifyotp);

// router.post("/logout_user", IsAuth, logout);

module.exports = router;
