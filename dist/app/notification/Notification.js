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
exports.Notification = void 0;
const types_1 = require("../../utils/types");
const db_1 = __importDefault(require("../providers/db"));
const DefaultMailSend_1 = require("../jobs/DefaultMailSend");
const PushNotificationSend_1 = require("../jobs/PushNotificationSend");
class Notification {
    constructor(channels, messagePayload, type, fcmTokens, userId) {
        this.channels = channels;
        this.userId = userId;
        this.fcmTokens = fcmTokens;
        this.messagePayload = messagePayload;
        this.type = type;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channels.includes(types_1.PushNotificationChannels.PUSH)) {
                yield this.sendPushNotification();
            }
            if (this.channels.includes(types_1.PushNotificationChannels.MAIL)) {
                yield this.sendMailNotification();
            }
            if (this.channels.includes(types_1.PushNotificationChannels.DATABASE)) {
                yield this.saveToDb();
            }
        });
    }
    saveToDb() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.messagePayload.data && this.userId) {
                return yield db_1.default.notification.create({
                    data: {
                        body: this.messagePayload.data.body,
                        title: this.messagePayload.data.title,
                        type: this.type,
                        userId: this.userId,
                        data: this.messagePayload.data.data,
                    },
                });
            }
        });
    }
    sendPushNotification() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.fcmTokens !== "undefined" && ((_a = this.fcmTokens) === null || _a === void 0 ? void 0 : _a.length) > 0) {
                const data = {
                    fcmTokens: this.fcmTokens,
                    messagePayload: this.messagePayload,
                };
                PushNotificationSend_1.sendPushNotificationQueue.add("sendPushNotification", data);
            }
        });
    }
    sendMailNotification() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                email: (_a = this.messagePayload.data) === null || _a === void 0 ? void 0 : _a.email,
                title: (_b = this.messagePayload.data) === null || _b === void 0 ? void 0 : _b.title,
                body: (_c = this.messagePayload.data) === null || _c === void 0 ? void 0 : _c.body,
            };
            DefaultMailSend_1.defaultMailSendQueue.add("defaultMailSend", data);
        });
    }
}
exports.Notification = Notification;
