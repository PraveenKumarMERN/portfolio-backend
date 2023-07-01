"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponse = void 0;
const UserResponse = (data) => {
    if (Array.isArray(data)) {
        return data.map((d) => objectResponse(d));
    }
    return objectResponse(data);
};
exports.UserResponse = UserResponse;
const objectResponse = (user) => {
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.firstName + " " + user.lastName,
        email: user.email,
        createdAt: user.createdAt,
    };
};
