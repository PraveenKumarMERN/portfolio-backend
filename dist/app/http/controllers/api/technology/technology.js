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
exports.TechnologyController = void 0;
const db_1 = __importDefault(require("../../../../providers/db"));
const TechnologyResponse_1 = require("../../../responses/TechnologyResponse");
class TechnologyController {
    static addTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body.auth;
            const { image, name, percentage, color } = req.body.validatedData;
            const skills = yield db_1.default.skills.findFirst({
                where: {
                    userId: user.id,
                },
            });
            const technologyData = yield db_1.default.technology.create({
                data: {
                    skillsId: skills === null || skills === void 0 ? void 0 : skills.id,
                    userId: user.id,
                    image,
                    name,
                    percentage,
                    color,
                },
            });
            return res.send({
                status: true,
                data: (0, TechnologyResponse_1.TechnologyResponse)(technologyData),
            });
        });
    }
    // public static async updateSkills(req: Request, res: Response) {
    //   const { user } = req.body.auth;
    //   const {
    //     technologyId,
    //     about,
    //     satisfacationAbout,
    //     satisfacationPercentage,
    //     years,
    //     yearsTitle,
    //     title,
    //   } = req.body.validatedData;
    //   const skillsData = await dbConnection.skills.update({
    //     where: {
    //       userId: user.id,
    //     },
    //     data: {
    //       technology: technologyId,
    //       title,
    //       about,
    //       satisfacationAbout,
    //       satisfacationPercentage,
    //       years,
    //       yearsTitle,
    //     },
    //   });
    //   return res.send({
    //     status: true,
    //     data: SkillsResponse(skillsData),
    //   });
    // }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const skillsData = yield db_1.default.technology.findMany({});
            return res.send({
                status: true,
                data: skillsData,
            });
        });
    }
}
exports.TechnologyController = TechnologyController;
