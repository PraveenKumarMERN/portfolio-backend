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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPushNotificationQueue = void 0;
const bullmq_1 = require("bullmq");
const push_1 = require("../../libs/push/push");
const utils_1 = require("../../utils/utils");
const logger_1 = require("../providers/logger");
exports.sendPushNotificationQueue = new bullmq_1.Queue("sendPushNotification", utils_1.queueConnection);
const sendFCM = (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("send fcm");
    const push = new push_1.PushNotification({ tokens: job.fcmTokens });
    const response = yield push.send(job.messagePayload);
    logger_1.logger.info(`Push notification sent: ${response} with job params ${JSON.stringify(job)}`);
});
new bullmq_1.Worker("sendPushNotification", sendFCM, utils_1.queueConnection);
