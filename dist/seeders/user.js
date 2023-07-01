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
exports.users = exports.createUser = void 0;
const faker_1 = require("@faker-js/faker");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const USERS = [];
function createUser() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            firstName: faker_1.faker.name.firstName(),
            lastName: faker_1.faker.name.lastName(),
            email: faker_1.faker.internet.email(),
            password: yield bcryptjs_1.default.hashSync("12345678"),
        };
    });
}
exports.createUser = createUser;
const users = (count) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < count; i++) {
        USERS.push(yield createUser());
    }
    return USERS;
});
exports.users = users;
