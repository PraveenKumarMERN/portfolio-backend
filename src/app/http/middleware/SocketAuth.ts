import * as jwt from "jsonwebtoken";
import { env } from "../../../env";
import dbConnection from "../../providers/db";
const verifyToken = async (token: string) => {
  try {
    var decodedData = await jwt.verify(token, env.auth.secret);

    if (typeof decodedData !== "string") {
      let type =
        decodedData.userType === "ADMIN" ? { admin: true } : { user: true };
      const device = await dbConnection.device.findFirst({
        where: {
          authToken: token,
          deletedAt: { isSet: false },
        },
        include: type,
      });

      if (!device) {
        throw "Invalid Token";
      }
      let decoded = {
        bearerToken: token,
        device: device,
        user: decodedData.userType === "ADMIN" ? device.admin : device.user,
      };
      return { decoded };
    } else {
      throw "user not found";
    }
  } catch (err) {
    console.log(err);

    return {
      error: {
        status: false,
        message: "Invalid Token",
      },
    };
  }
};

export default verifyToken;
