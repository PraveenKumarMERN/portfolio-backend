import { Request, Response } from "express";
import dbConnection from "../../../../providers/db";
import { HomeResponse } from "../../../responses/HomeResponse";

export class HomeController {
  public static async index(req: Request, res: Response) {
    const homePageData = await dbConnection.home.findFirst({});
    return res.send({
      status: true,
      data: homePageData,
    });
  }

  public static async updateHome(req: Request, res: Response) {
    const { user } = req.body.auth;
    const { title, about, designation, button } = req.body.validatedData;
    const homePageData = await dbConnection.home.upsert({
      where: {
        userId: user.id,
      },
      create: {
        userId: user.id,
        title,
        about,
        button,
        designation,
      },
      update: {
        title,
        about,
        button,
        designation,
      },
    });
    return res.send({
      status: true,
      data: HomeResponse(homePageData),
    });
  }
}
