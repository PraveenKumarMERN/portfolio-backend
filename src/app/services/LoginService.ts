import dbConnection from "../providers/db";
import bcrypt from "bcryptjs";
import { USER_TYPE, User } from "@prisma/client";

export class LoginService {
  /**
   *
   * @param email
   * @param password
   * @returns user
   */
  public static async login(
    email: string,
    password: string,
    userType: USER_TYPE
  ): Promise<User | null> {
    let user
    if (userType === USER_TYPE.ADMIN) {
      user = await dbConnection.admin.findFirst({
        where: {
          email: email,
        },
      });
    } else {
      user = await dbConnection.user.findFirst({
        where: {
          email: email,
        },
      });
    }


    if (user && user.password) {
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        // return user;
      }
    }
    return null;
  }

  /**
   *
   * @param id User id
   * @returns profile of a user
   */
  public static async profile(id: string): Promise<User | null> {
    return await dbConnection.user.findFirst({
      where: {
        id: id,
      },
    });
  }
}
