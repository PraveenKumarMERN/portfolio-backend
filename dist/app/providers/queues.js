"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("@bull-board/api");
const express_1 = require("@bull-board/express");
// import { defaultMailSendQueue } from "../jobs/DefaultMailSend";
// import { forgotPasswordEmailQueue } from "../jobs/ForgotMailSend";
// import { sendPushNotificationQueue } from "../jobs/PushNotificationSend";
//IMPORT QUEUES HERE
const serverAdapter = new express_1.ExpressAdapter();
(0, api_1.createBullBoard)({
    queues: [
    // new BullMQAdapter(forgotPasswordEmailQueue),
    // new BullMQAdapter(defaultMailSendQueue),
    // new BullMQAdapter(sendPushNotificationQueue),
    //ADD ADAPTERS HERE
    ],
    serverAdapter: serverAdapter,
});
// serverAdapter.setBasePath("/queues");
exports.default = serverAdapter;
