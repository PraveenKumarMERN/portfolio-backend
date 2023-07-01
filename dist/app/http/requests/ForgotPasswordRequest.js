"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPasswordRequest = void 0;
const yup_1 = require("yup");
exports.ForgotPasswordRequest = (0, yup_1.object)({
    email: (0, yup_1.string)().required().email(),
});
