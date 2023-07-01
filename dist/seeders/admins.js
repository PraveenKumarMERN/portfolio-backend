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
exports.createAdmins = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admins = [];
const prisma = new client_1.PrismaClient();
function createAdmin(role, email, firstName, lastName) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: yield bcryptjs_1.default.hashSync("Admin@12345678"),
            role: role
        };
    });
}
function createAdmins() {
    return __awaiter(this, void 0, void 0, function* () {
        admins.push(yield createAdmin(client_1.AdminRole.SUPERADMIN, "developer.eww@gmail.com", "developer", "eww"));
        admins.push(yield createAdmin(client_1.AdminRole.ADMIN, "fizaeww@gmail.com", "Fiza", "Belim"));
        admins.push(yield createAdmin(client_1.AdminRole.ADMIN, "praveenkumar@gmail.com", "Praveen", "Kumar"));
        //   admins.push(
        //     await createAdmin(AdminRole.ADMIN, "heikiu.luk@aigniter.com", "heikiu", "luk")
        //   )
        yield prisma.admin.createMany({
            data: admins
        });
    });
}
exports.createAdmins = createAdmins;
createAdmins()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("seeding completed");
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("seeding failed");
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
