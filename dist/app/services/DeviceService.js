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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceService = void 0;
const env_1 = require("../../env");
const jwt = __importStar(require("jsonwebtoken"));
const db_1 = __importDefault(require("../providers/db"));
class DeviceService {
    static create(userId, deviceType, userType, fcmToken, metaData) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("env.auth.secret", env_1.env.auth.secret);
            const token = yield jwt.sign({ userId: userId, userType }, env_1.env.auth.secret, {
                expiresIn: env_1.env.auth.expiresIn,
            });
            if (typeof token === "undefined") {
                throw "Could not create token";
            }
            return yield db_1.default.device.create({
                data: {
                    authToken: token,
                    fcmToken: fcmToken,
                    metaData: metaData !== null ? metaData : {},
                    userId: userId,
                    userType: userType
                },
            });
        });
    }
    static find(deviceId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.device.findFirst({
                where: {
                    id: deviceId,
                    userId: userId,
                },
            });
        });
    }
    static delete(deviceId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield db_1.default.device.findFirst({
                where: {
                    id: deviceId,
                },
            });
            // if (device?.fcmToken) {
            //   const payload = {};
            //   await new Notification(
            //     [PushNotificationChannels.PUSH],
            //     payload,
            //     // NotificationTypes.LoggedOut,
            //     [device.fcmToken]
            //   ).send();
            // }
            return yield db_1.default.device.deleteMany({
                where: {
                    id: deviceId,
                    userId: userId,
                    deletedAt: null,
                },
            });
        });
    }
    static update(id, userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.device.updateMany({
                where: {
                    id: id,
                    userId: userId,
                    deletedAt: null,
                },
                data: data,
            });
        });
    }
    static devices(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.device.findMany({
                where: {
                    user: {
                        id: userId,
                    },
                    deletedAt: null,
                },
            });
        });
    }
}
exports.DeviceService = DeviceService;
