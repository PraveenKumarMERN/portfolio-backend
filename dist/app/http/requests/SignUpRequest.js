"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpRequest = void 0;
const client_1 = require("@prisma/client");
const yup_1 = require("yup");
exports.SignUpRequest = (0, yup_1.object)({
    firstName: (0, yup_1.string)().required(),
    lastName: (0, yup_1.string)().required(),
    email: (0, yup_1.string)().required().email(),
    password: (0, yup_1.string)().required(),
    confirm_password: (0, yup_1.string)()
        .required()
        .oneOf([(0, yup_1.ref)("password")], "confirm password and password must be same"),
    deviceType: (0, yup_1.string)().oneOf(Object.values(client_1.DEVICES)).required(),
    metaData: (0, yup_1.object)(),
    fcmToken: (0, yup_1.string)(),
});
