const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
  signUp,
  signIn,
  forgotPassword,
  verifyResetPasswordOTP,
  resetPassword,
  logout,
  emailVerification,
  googleCallback,
} = require("../controllers/auth");
const { IsAuth, authorizedRole } = require("../middlewares/auth");
router.post("/signup_user", signUp);
router.post("/siginin_user", signIn);
router.post("/google/callback", googleCallback);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.post(
  "/signout_user",
  IsAuth,
  authorizedRole(["SUPER_ADMIN", "USER", "ADMIN", "AGENT"]),
  logout
);
router.post("/forgot_password", forgotPassword);
router.post("/verify_otp", verifyResetPasswordOTP);
router.post("/reset_password", resetPassword);
router.post("/verify_email", emailVerification);
// router.post("/login_user_email", loginUserEmail);
// router.post("/signin_freelancer", loginFreelancer);
// router.post("/sendotp", sendotp);
// router.post("/forgot_password", forgotPassword);
// router.post("/verify_reset_password_otp", verifyResetPasswordOTP);
// router.post("/reset_password", resetPassword);

// router.post("/verify-otp", verifyotp);

// router.post("/logout_user", IsAuth, authorizedRole(["SUPER_ADMIN","USER", "ADMIN"]), logout);

module.exports = router;
