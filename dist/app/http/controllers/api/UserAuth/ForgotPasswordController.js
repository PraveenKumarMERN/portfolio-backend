"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordController = void 0;
const env_1 = require("../../../../../env");
const db_1 = __importDefault(require("../../../../providers/db"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// import { forgotPasswordEmailQueue } from "../../../../jobs/ForgotMailSend";
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class ForgotPasswordController {
    static forgot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body.validatedData;
            const user = yield db_1.default.user.findFirst({
                where: {
                    email: email,
                    deletedAt: null,
                },
            });
            if (!user) {
                return res.json({
                    status: false,
                    message: "User not found",
                });
            }
            const token = yield jsonwebtoken_1.default.sign({ userId: user.id }, env_1.env.auth.secret, {
                expiresIn: env_1.env.auth.forgotPasswordExpiredIn,
            });
            yield db_1.default.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    forgotPasswordToken: token,
                },
            });
            const url = `${env_1.env.app.host}:${env_1.env.app.port}/reset-password?token=${token}`;
            const subject = "Reset your password";
            const data = {
                email,
                url,
                subject,
            };
            // forgotPasswordEmailQueue.add("sendForgotPasswordEmail", data);
            return res.json({
                status: true,
                message: req.t("user.forgot_password_reset_link"),
            });
        });
    }
    static checkResetToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.send({
                status: true,
            });
        });
    }
    static resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { password } = req.body.validatedData;
            const { user } = req.body.auth;
            yield db_1.default.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    forgotPasswordToken: null,
                    password: yield bcryptjs_1.default.hashSync(password),
                },
            });
            //TODO delete all the previous devices and lot out all devices
            return res.send({
                status: true,
                message: req.t("user.password_reset_success"),
            });
        });
    }
}
exports.ForgotPasswordController = ForgotPasswordController;
