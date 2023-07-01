"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRequest = void 0;
const yup_1 = require("yup");
exports.HomeRequest = (0, yup_1.object)({
    title: (0, yup_1.string)().required(),
    designation: (0, yup_1.string)().required(),
    about: (0, yup_1.string)().required(),
    button: (0, yup_1.string)().required(),
});
