"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv = __importStar(require("dotenv"));
const env_1 = require("./libs/env");
dotenv.config();
/**
 * Environment variables
 */
exports.env = {
    node: (0, env_1.getOsEnv)("APP_ENV"),
    app: {
        name: (0, env_1.getOsEnv)("APP_NAME"),
        host: (0, env_1.getOsEnv)("APP_URL"),
        debug: (0, env_1.getOsEnv)("APP_ENV") !== "production"
            ? (0, env_1.toBool)((0, env_1.getOsEnv)("APP_DEBUG"))
            : false,
        port: (0, env_1.normalizePort)(process.env.PORT || (0, env_1.getOsEnv)("APP_PORT")),
        api_only: (0, env_1.toBool)((0, env_1.getOsEnv)("API_ONLY")),
        api_prefix: (0, env_1.getOsEnv)("API_PREFIX"),
        pagination_limit: (0, env_1.toNumber)((0, env_1.getOsEnv)("PAGINATION_LIMIT")),
        api_rate_limit: (0, env_1.toNumber)((0, env_1.getOsEnv)("API_RATE_LIMIT")),
        root_dir: (0, env_1.getOsEnv)("APP_ENV") === "production" ? "dist" : "src",
        user_uploaded_content_path: (0, env_1.getOsEnv)("USER_UPLOADED_CONTENT_PATH"),
    },
    auth: {
        secret: (0, env_1.getOsEnv)("JWT_SECRET"),
        expiresIn: (0, env_1.getOsEnv)("JWT_EXPIRES_IN"),
        forgotPasswordExpiredIn: (0, env_1.getOsEnv)("JWT_FORGOT_PASSWORD_EXPIRES_IN"),
    },
    redis: {
        url: (0, env_1.getOsEnv)("REDIS_USERNAME") || (0, env_1.getOsEnv)("REDIS_PASSWORD")
            ? `redis://${(0, env_1.getOsEnv)("REDIS_USERNAME")}:${(0, env_1.getOsEnv)("REDIS_PASSWORD")}@${(0, env_1.getOsEnv)("REDIS_HOST")}:${(0, env_1.getOsEnv)("REDIS_PORT")}`
            : `redis://${(0, env_1.getOsEnv)("REDIS_HOST")}:${(0, env_1.getOsEnv)("REDIS_PORT")}`,
        host: (0, env_1.getOsEnv)("REDIS_HOST"),
        port: (0, env_1.getOsEnv)("REDIS_PORT"),
        password: (0, env_1.getOsEnv)("REDIS_PASSWORD"),
        username: (0, env_1.getOsEnv)("REDIS_USERNAME"),
    },
    aws: {
        accessKey: (0, env_1.getOsEnv)("AWS_ACCESS_KEY_ID"),
        secretAccessKey: (0, env_1.getOsEnv)("AWS_SECRET_ACCESS_KEY"),
        bucket: (0, env_1.getOsEnv)("AWS_BUCKET"),
        region: (0, env_1.getOsEnv)("AWS_DEFAULT_REGION"),
    },
    mail: {
        host: (0, env_1.getOsEnv)("MAIL_HOST"),
        port: (0, env_1.toNumber)((0, env_1.getOsEnv)("MAIL_PORT")),
        username: (0, env_1.getOsEnv)("MAIL_USERNAME"),
        password: (0, env_1.getOsEnv)("MAIL_PASSWORD"),
        enc: (0, env_1.getOsEnv)("MAIL_ENCRYPTION"),
        from_address: (0, env_1.getOsEnv)("MAIL_FROM_ADDRESS"),
        name: (0, env_1.getOsEnv)("MAIL_FROM_NAME"),
    },
    oauth: {
        google: {
            clientId: (0, env_1.getOsEnv)("GOOGLE_CLIENT_ID"),
        },
        apple: {
            clientId: (0, env_1.getOsEnv)("APPLE_CLIENT_ID"),
        },
    },
    cors: {
        urls: (0, env_1.getOsEnv)("CORS_AVAILABLE_LINKS").split(","),
    },
};
