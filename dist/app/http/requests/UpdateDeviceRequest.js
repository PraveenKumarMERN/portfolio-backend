"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDeviceRequest = void 0;
const yup_1 = require("yup");
exports.UpdateDeviceRequest = (0, yup_1.object)({
    fcmToken: (0, yup_1.string)(),
    metaData: (0, yup_1.object)(),
});
