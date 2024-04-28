const { Auth } = require("../common");
const controller = require("../controller");

const router = require("express").Router();

router.post("/send_otp", controller.Authentication.SendMobileOTP);
router.post("/verify_otp", controller.Authentication.Verify_OTP);
router.post("/login", controller.Authentication.LoginUser);
router.post("/register", controller.Authentication.RegisterUser);
router.get("/getUser", Auth.verifyUser, controller.Authentication.getProfile);
router.post(
  "/forgot-password",
  Auth.verifyUser,
  controller.Authentication.ForgotPassword
);

module.exports = router;
