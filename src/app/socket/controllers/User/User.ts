import { MessageType } from "@prisma/client";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { CHAT, USERS } from "../../../../static/event/eventName";
import { GetUserByIdType, PaginationType } from "../../../../types/message";
import dbConnection from "../../../providers/db";

export class UsersController {
  public static async getUsers(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: PaginationType
  ) {
    const userData = await dbConnection.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        profileImage: true,
      },
    });

    function convertArrayToObject(
      arr: {
        id: string;
        firstName: string;
        lastName: string;
        profileImage: string | null;
      }[]
    ) {
      const result: any = {};

      arr.forEach((obj) => {
        const firstLetter = obj.firstName.charAt(0).toLowerCase();
        if (!result[firstLetter]) {
          result[firstLetter] = [];
        }
        result[firstLetter].push(obj);
      });

      return result;
    }

    const convertedData = convertArrayToObject(userData);

    return socket.emit(CHAT.GETCHATLIST, convertedData);
  }

  public static async getUserById(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: GetUserByIdType
  ) {
    let { id }: { id: string } = socket.handshake.auth.decoded.user;

    if (MessageType.PRIVATE) {
      const userData = await dbConnection.user.findFirst({
        where: {
          id: data.id,
        },
        include: {
          Favourites: {
            where: {
              userId: id,
              favouriteId: data.id,
              type: MessageType.PRIVATE,
            },
          },
        },
      });
      let payload = {
        fullName: `${userData?.firstName} ${userData?.lastName}`,
        email: userData?.email,
        isConnected: userData?.isConnected,
        profileImage: userData?.profileImage,
        Favourites: userData?.Favourites[0] || null,
      };
      socket.emit(USERS.GETUSERBYID, payload);
    }
    if (MessageType.GROUP) {
      const channel = await dbConnection.channel.findFirst({
        where: { users: { has: id } },
        include: {
          Favourites: {
            where: {
              userId: id,
              favouriteId: data.id,
              type: MessageType.PRIVATE,
            },
          },
        },
        // select: {
        //   name: true,
        //   id: true,
        // },
      });
      let payload = {
        fullName: channel?.name,
        email: null,
        isConnected: null,
        profileImage: channel?.profileImage,
        Favourites: channel?.Favourites[0] || null,
      };
      socket.emit(USERS.GETUSERBYID, payload);
    }
  }
}
