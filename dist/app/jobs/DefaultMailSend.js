"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultMailSendQueue = void 0;
const bullmq_1 = require("bullmq");
const utils_1 = require("../../utils/utils");
const DefaultMail_1 = require("../mails/DefaultMail");
exports.defaultMailSendQueue = new bullmq_1.Queue("defaultMailSend", utils_1.queueConnection);
new bullmq_1.Worker("defaultMailSend", DefaultMail_1.sendWithDefaultTemplateEmail, utils_1.queueConnection);
