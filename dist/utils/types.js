"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOWED_FILE_TYPES = exports.ALLOWED_VIDEO_TYPE = exports.ALLOWED_IMAGE_TYPE = exports.UPLOAD_TYPES = exports.CronEnums = exports.PushNotificationChannels = void 0;
var PushNotificationChannels;
(function (PushNotificationChannels) {
    PushNotificationChannels["DATABASE"] = "db";
    PushNotificationChannels["PUSH"] = "fcm";
    PushNotificationChannels["MAIL"] = "mail";
})(PushNotificationChannels = exports.PushNotificationChannels || (exports.PushNotificationChannels = {}));
var CronEnums;
(function (CronEnums) {
    CronEnums["EVERY_MINUTE"] = "* * * * * ";
    CronEnums["EVERY_FIVE_MINUTES"] = "*/5 * * * * ";
    CronEnums["EVERY_10_MINUTES"] = "*/10 * * * * ";
    CronEnums["EVERY_15_MINUTES"] = "*/15 * * * * ";
    CronEnums["EVERY_30_MINUTES"] = "*/30 * * * *";
    CronEnums["EVERY_HOUR"] = "0 * * * *";
    CronEnums["EVERYDAY_MIDNIGHT"] = "0 0 * * *";
})(CronEnums = exports.CronEnums || (exports.CronEnums = {}));
var UPLOAD_TYPES;
(function (UPLOAD_TYPES) {
    UPLOAD_TYPES[UPLOAD_TYPES["IMAGE"] = 0] = "IMAGE";
    UPLOAD_TYPES[UPLOAD_TYPES["VIDEO"] = 1] = "VIDEO";
    UPLOAD_TYPES[UPLOAD_TYPES["FILE"] = 2] = "FILE";
})(UPLOAD_TYPES = exports.UPLOAD_TYPES || (exports.UPLOAD_TYPES = {}));
exports.ALLOWED_IMAGE_TYPE = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
];
exports.ALLOWED_VIDEO_TYPE = ["video/mp4"];
exports.ALLOWED_FILE_TYPES = ["application/pdf"];
