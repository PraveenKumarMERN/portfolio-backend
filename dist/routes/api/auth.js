"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../../app/http/controllers/api/AdminAuth/AuthController");
const RequestValidator_1 = require("../../app/http/middleware/RequestValidator");
const LoginRequest_1 = require("../../app/http/requests/LoginRequest");
const Auth_1 = require("../../app/http/middleware/Auth");
const ForgotPasswordController_1 = require("../../app/http/controllers/api/AdminAuth/ForgotPasswordController");
const ForgotPasswordRequest_1 = require("../../app/http/requests/ForgotPasswordRequest");
const ResetPasswordRequest_1 = require("../../app/http/requests/ResetPasswordRequest");
const router = (0, express_1.Router)();
router.post("/login", (0, RequestValidator_1.RequestValidator)(LoginRequest_1.LoginRequest), AuthController_1.AuthController.login);
// router.post("/signup", RequestValidator(SignUpRequest), AuthController.signUp);
router.get("/profile", Auth_1.verifyToken, AuthController_1.AuthController.profile);
// router.post(
//   "/social-login",
//   RequestValidator(SocialLoginRequest),
//   verifySocialLogin,
//   SocialLoginController.socialLogin
// );
router.post("/forgot-password", (0, RequestValidator_1.RequestValidator)(ForgotPasswordRequest_1.ForgotPasswordRequest), ForgotPasswordController_1.ForgotPasswordController.forgot);
router.get("/reset-password", Auth_1.verifyResetToken, ForgotPasswordController_1.ForgotPasswordController.checkResetToken);
router.post("/reset-password", (0, RequestValidator_1.RequestValidator)(ResetPasswordRequest_1.ResetPasswordRequest), Auth_1.verifyResetToken, ForgotPasswordController_1.ForgotPasswordController.resetPassword);
router.get("/logout", Auth_1.verifyToken, AuthController_1.AuthController.logOut);
exports.default = router;
