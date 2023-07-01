"use strict";
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
exports.SocialService = void 0;
const db_1 = __importDefault(require("../providers/db"));
class SocialService {
    static getAppleDetails(socialId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.appleDetail.findFirst({
                where: {
                    socialId: socialId,
                },
            });
        });
    }
    static createAppleDetails(firstName, lastName, email, socialId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.appleDetail.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    socialId: socialId,
                },
            });
        });
    }
    static socialLogin(socialId, socialType, email, firstName, lastName) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield db_1.default.user.findFirst({
                where: {
                    OR: [
                        {
                            socialId: socialId,
                            socialType: socialType,
                        },
                        {
                            email: email,
                        },
                    ],
                },
            });
            if (user) {
                yield db_1.default.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        password: null,
                        forgotPasswordToken: null,
                    },
                });
            }
            else {
                user = yield db_1.default.user.create({
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        socialId: socialId,
                        socialType: socialType,
                        email: email,
                    },
                });
            }
            return user;
        });
    }
}
exports.SocialService = SocialService;
