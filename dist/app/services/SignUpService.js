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
exports.SignUpService = void 0;
const db_1 = __importDefault(require("../providers/db"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class SignUpService {
    static signUp(validatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = validatedData;
            const user = yield db_1.default.user.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: yield bcryptjs_1.default.hashSync(password),
                },
            });
            return user;
        });
    }
    static checkIfUserExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.default.user.findFirst({
                where: {
                    email: email,
                },
            });
            return user ? true : false;
        });
    }
}
exports.SignUpService = SignUpService;
