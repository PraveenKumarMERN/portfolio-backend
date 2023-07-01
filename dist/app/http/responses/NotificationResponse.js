"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationResponse = void 0;
const NotificationResponse = (notification) => {
    if (Array.isArray(notification)) {
        return notification.map((d) => objectResponse(d));
    }
    return objectResponse(notification);
};
exports.NotificationResponse = NotificationResponse;
const objectResponse = (notification) => {
    return {
        title: notification.title,
        body: notification.body,
        type: notification.type,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
    };
};
