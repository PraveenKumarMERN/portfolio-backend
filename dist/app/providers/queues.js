"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@bull-board/api");
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const express_1 = require("@bull-board/express");
const DefaultMailSend_1 = require("../jobs/DefaultMailSend");
const ForgotMailSend_1 = require("../jobs/ForgotMailSend");
const PushNotificationSend_1 = require("../jobs/PushNotificationSend");
//IMPORT QUEUES HERE
const serverAdapter = new express_1.ExpressAdapter();
(0, api_1.createBullBoard)({
    queues: [
        new bullMQAdapter_1.BullMQAdapter(ForgotMailSend_1.forgotPasswordEmailQueue),
        new bullMQAdapter_1.BullMQAdapter(DefaultMailSend_1.defaultMailSendQueue),
        new bullMQAdapter_1.BullMQAdapter(PushNotificationSend_1.sendPushNotificationQueue),
        //ADD ADAPTERS HERE
    ],
    serverAdapter: serverAdapter,
});
serverAdapter.setBasePath("/queues");
exports.default = serverAdapter;
