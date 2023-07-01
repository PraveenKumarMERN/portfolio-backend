"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologyRequest = void 0;
const yup_1 = require("yup");
exports.TechnologyRequest = (0, yup_1.object)({
    name: (0, yup_1.string)().required(),
    image: (0, yup_1.string)().required(),
    color: (0, yup_1.string)().required(),
    percentage: (0, yup_1.string)().required(),
});
