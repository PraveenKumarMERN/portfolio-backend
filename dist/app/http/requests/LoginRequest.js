"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequest = void 0;
const yup_1 = require("yup");
exports.LoginRequest = (0, yup_1.object)({
    email: (0, yup_1.string)().required().email(),
    password: (0, yup_1.string)().required(),
    metaData: (0, yup_1.object)(),
    fcmToken: (0, yup_1.string)(),
});
