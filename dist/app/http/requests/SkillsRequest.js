"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsRequest = void 0;
const yup_1 = require("yup");
exports.SkillsRequest = (0, yup_1.object)({
    title: (0, yup_1.string)().required(),
    technologyId: (0, yup_1.string)().required(),
    about: (0, yup_1.string)().required(),
    satisfacationAbout: (0, yup_1.string)().required(),
    satisfacationPercentage: (0, yup_1.string)().required(),
    years: (0, yup_1.string)().required(),
    yearsTitle: (0, yup_1.string)().required(),
});
