"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillsResponse = void 0;
const SkillsResponse = (data) => {
    if (Array.isArray(data)) {
        return data.map((d) => objectResponse(d));
    }
    return objectResponse(data);
};
exports.SkillsResponse = SkillsResponse;
const objectResponse = (skillsData) => {
    return {
        id: skillsData.id,
        title: skillsData.title,
        about: skillsData.about,
        satisfacationAbout: skillsData.satisfacationAbout,
        satisfacationPercentage: skillsData.satisfacationPercentage,
        technology: skillsData.technology,
        years: skillsData.years,
        yearsTitle: skillsData.yearsTitle,
    };
};
