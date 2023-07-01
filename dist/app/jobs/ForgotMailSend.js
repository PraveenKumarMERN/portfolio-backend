"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordEmailQueue = void 0;
const bullmq_1 = require("bullmq");
const utils_1 = require("../../utils/utils");
const ForgotPasswordMail_1 = require("../mails/ForgotPasswordMail");
exports.forgotPasswordEmailQueue = new bullmq_1.Queue("sendForgotPasswordEmail", utils_1.queueConnection);
new bullmq_1.Worker("sendForgotPasswordEmail", ForgotPasswordMail_1.sendForgotPasswordEmail, utils_1.queueConnection);
