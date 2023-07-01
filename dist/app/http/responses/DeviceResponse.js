"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceResponse = void 0;
const DeviceResponse = (device) => {
    if (Array.isArray(device)) {
        return device.map((d) => objectResponse(d));
    }
    return objectResponse(device);
};
exports.DeviceResponse = DeviceResponse;
const objectResponse = (device) => {
    return {
        fcmToken: device.fcmToken,
        device: device.device,
        metaData: device.metaData,
        createdAt: device.createdAt,
    };
};
