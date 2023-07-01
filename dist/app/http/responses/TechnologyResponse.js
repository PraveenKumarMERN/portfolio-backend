"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologyResponse = void 0;
const TechnologyResponse = (data) => {
    if (Array.isArray(data)) {
        return data.map((d) => objectResponse(d));
    }
    return objectResponse(data);
};
exports.TechnologyResponse = TechnologyResponse;
const objectResponse = (technologyData) => {
    return {
        id: technologyData.id,
        color: technologyData.color,
        image: technologyData.image,
        percentage: technologyData.percentage,
        name: technologyData.name,
    };
};
