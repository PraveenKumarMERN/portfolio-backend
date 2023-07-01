import { Request, Response } from "express";
import dbConnection from "../../../../providers/db";
import { HomeResponse } from "../../../responses/HomeResponse";
import { SkillsResponse } from "../../../responses/SkillsResponse";

export class SkillsController {
  public static async updateSkills(req: Request, res: Response) {
    const { user } = req.body.auth;
    const {
      technologyId,
      about,
      satisfacationAbout,
      satisfacationPercentage,
      years,
      yearsTitle,
      title,
    } = req.body.validatedData;
    const skillsData = await dbConnection.skills.upsert({
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
  }

  public static async index(req: Request, res: Response) {
    const skillsData = await dbConnection.skills.findFirst({
      include: {
        technology: true,
      },
    });
    return res.send({
      status: true,
      data: skillsData,
    });
  }
}
