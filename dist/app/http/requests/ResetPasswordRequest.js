"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPasswordRequest = void 0;
const yup_1 = require("yup");
exports.ResetPasswordRequest = (0, yup_1.object)({
    password: (0, yup_1.string)().required(),
    confirm_password: (0, yup_1.string)()
        .required()
        .oneOf([(0, yup_1.ref)("password")], "confirm password and password must be same"),
});
