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
exports.sendForgotPasswordEmail = void 0;
const env_1 = require("../../env");
const mail_1 = __importDefault(require("../../libs/mail/mail"));
const sendForgotPasswordEmail = (job) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, email, url } = job.data;
    try {
        const options = {
            from: env_1.env.mail.from_address,
            to: email,
            subject: subject,
            template: "forgotPassword",
            context: {
                link: url,
            },
        };
        yield mail_1.default.sendMail(options);
        return Promise.resolve();
    }
    catch (error) {
        Promise.reject(error.message);
    }
});
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
