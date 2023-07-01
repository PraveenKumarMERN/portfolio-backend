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
exports.LoginService = void 0;
const db_1 = __importDefault(require("../providers/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
class LoginService {
    /**
     *
     * @param email
     * @param password
     * @returns user
     */
    static login(email, password, userType) {
        return __awaiter(this, void 0, void 0, function* () {
            let user;
            if (userType === client_1.USER_TYPE.ADMIN) {
                user = yield db_1.default.admin.findFirst({
                    where: {
                        email: email,
                    },
                });
            }
            else {
                user = yield db_1.default.user.findFirst({
                    where: {
                        email: email,
                    },
                });
            }
            if (user && user.password) {
                const isValid = bcryptjs_1.default.compareSync(password, user.password);
                if (isValid) {
                    // return user;
                }
            }
            return null;
        });
    }
    /**
     *
     * @param id User id
     * @returns profile of a user
     */
    static profile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.default.user.findFirst({
                where: {
                    id: id,
                },
            });
        });
    }
}
exports.LoginService = LoginService;
