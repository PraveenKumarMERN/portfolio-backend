"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLoginRequest = void 0;
const client_1 = require("@prisma/client");
const yup_1 = require("yup");
exports.SocialLoginRequest = (0, yup_1.object)({
    firstName: (0, yup_1.string)().required(),
    lastName: (0, yup_1.string)().required(),
    socialId: (0, yup_1.string)().required(),
    socialType: (0, yup_1.string)().required().oneOf(Object.values(client_1.SocialTypes)),
    socialToken: (0, yup_1.string)().required(),
    deviceType: (0, yup_1.string)().oneOf(Object.values(client_1.Devices)).required(),
    metaData: (0, yup_1.object)(),
    fcmToken: (0, yup_1.string)(),
});
