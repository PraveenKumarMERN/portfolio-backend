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
exports.SkillsController = void 0;
const db_1 = __importDefault(require("../../../../providers/db"));
class SkillsController {
    static updateSkills(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body.auth;
            const { technologyId, about, satisfacationAbout, satisfacationPercentage, years, yearsTitle, title, } = req.body.validatedData;
            const skillsData = yield db_1.default.skills.upsert({
                where: {
                    userId: user.id,
                },
                create: {
                    userId: user.id,
                    // technology: technologyId,
                    title,
                    about,
                    satisfacationAbout,
                    satisfacationPercentage,
                    years,
                    yearsTitle,
                },
                update: {
                    // technology: technologyId,
                    title,
                    about,
                    satisfacationAbout,
                    satisfacationPercentage,
                    years,
                    yearsTitle,
                },
                include: {
                    technology: true,
                },
            });
            return res.send({
                status: true,
                data: skillsData,
            });
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const skillsData = yield db_1.default.skills.findFirst({
                include: {
                    technology: true,
                },
            });
            return res.send({
                status: true,
                data: skillsData,
            });
        });
    }
}
exports.SkillsController = SkillsController;
