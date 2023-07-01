"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORAGE_PATH = exports.validFileTypes = exports.randomPasswordGenerator = exports.pagination = exports.queueConnection = void 0;
const env_1 = require("../env");
const types_1 = require("./types");
exports.queueConnection = {
    connection: {
        host: env_1.env.redis.host,
        port: env_1.env.redis.port,
    },
};
const pagination = (totalCount, perPage, page) => {
    return {
        total: totalCount,
        per_page: perPage,
        current_page: page,
        last_page: Math.ceil(totalCount / perPage),
    };
};
exports.pagination = pagination;
const randomPasswordGenerator = () => {
    return Math.random().toString(36).slice(-8);
};
exports.randomPasswordGenerator = randomPasswordGenerator;
const validFileTypes = (type) => {
    if (type === types_1.UPLOAD_TYPES.IMAGE) {
        return types_1.ALLOWED_IMAGE_TYPE;
    }
    else if (type === types_1.UPLOAD_TYPES.VIDEO) {
        return types_1.ALLOWED_VIDEO_TYPE;
    }
    else if (type === types_1.UPLOAD_TYPES.FILE) {
        return types_1.ALLOWED_FILE_TYPES;
    }
    return [];
};
exports.validFileTypes = validFileTypes;
exports.STORAGE_PATH = env_1.env.app.root_dir + "/storage/uploads";
