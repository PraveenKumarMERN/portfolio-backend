"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const RequestValidator_1 = require("../../app/http/middleware/RequestValidator");
const LoginRequest_1 = require("../../app/http/requests/LoginRequest");
const AuthController_1 = require("../../app/http/controllers/api/AdminAuth/AuthController");
const router = (0, express_1.Router)();
router.post("/login", (0, RequestValidator_1.RequestValidator)(LoginRequest_1.LoginRequest), AuthController_1.AuthController.login);
exports.default = router;
