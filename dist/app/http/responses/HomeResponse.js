"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeResponse = void 0;
const HomeResponse = (data) => {
    if (Array.isArray(data)) {
        return data.map((d) => objectResponse(d));
    }
    return objectResponse(data);
};
exports.HomeResponse = HomeResponse;
const objectResponse = (homeData) => {
    return {
        id: homeData.id,
        title: homeData.title,
        about: homeData.about,
        designation: homeData.designation,
        button: homeData.button,
    };
};
