import { Request, Response } from "express";
import dbConnection from "../../../../providers/db";
import { TechnologyResponse } from "../../../responses/TechnologyResponse";

export class TechnologyController {
  public static async addTechnology(req: Request, res: Response) {
    const { user } = req.body.auth;
    const { image, name, percentage, color } = req.body.validatedData;
    const skills = await dbConnection.skills.findFirst({
      where: {
        userId: user.id,
      },
    });
    const technologyData = await dbConnection.technology.create({
      data: {
        skillsId: skills?.id,
        userId: user.id,
        image,
        name,
        percentage,
        color,
      },
    });
    return res.send({
      status: true,
      data: TechnologyResponse(technologyData),
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

  public static async index(req: Request, res: Response) {
    const skillsData = await dbConnection.technology.findMany({});
    return res.send({
      status: true,
      data: skillsData,
    });
  }
}
