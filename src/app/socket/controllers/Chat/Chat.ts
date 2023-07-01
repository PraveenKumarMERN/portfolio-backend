import { Message, MessageType } from "@prisma/client";
import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import myPagination from "../../../../libs/pagination/pagination";
import { CHAT } from "../../../../static/event/eventName";
import { GetChatByUserId, PaginationType } from "../../../../types/message";
import dbConnection from "../../../providers/db";
import { pagination } from "../../../../utils/utils";
import _ from "lodash";

export class ChatController {
  public static async getChatList(
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    let { id }: { id: string } = socket.handshake.auth.decoded.user;
    // let { page, limit } = data;

    const userData = await dbConnection.user.findMany({
      where: {
        id: {
          not: id,
        },
        Message: {
          some: {
            id: {
              not: undefined,
            },
          },
        },
      },
    });

    let favourite: any[] = [];
    let contact: any[] = [];

    for await (let user of userData) {
      const message = await dbConnection.message.findFirst({
        where: {
          OR: [
            {
              senderId: {
                equals: id,
              },
              receiverId: {
                equals: user.id,
              },
            },
            {
              senderId: {
                equals: user.id,
              },
              receiverId: {
                equals: id,
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let userData = {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
        isOnline: user.isConnected,
        type: MessageType.PRIVATE,
        message,
      };
      const favouriteUser = await dbConnection.favourites.findFirst({
        where: {
          favouriteId: user.id,
        },
      });
      if (favouriteUser) {
        favourite.push(userData);
      } else {
        contact.push(userData);
      }
    }

    const channelData = await dbConnection.channel.findMany({
      where: {
        users: {
          has: id,
        },
      },
    });

    for await (let channel of channelData) {
      const message = await dbConnection.message.findFirst({
        where: {
          receiverId: channel.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let userData = {
        ...channel,
        fullName: channel.name,
        isOnline: false,
        type: MessageType.GROUP,
        message,
      };
      const favouriteUser = await dbConnection.favourites.findFirst({
        where: {
          favouriteId: channel.id,
        },
      });
      if (favouriteUser) {
        favourite.push(userData);
      } else {
        contact.push(userData);
      }
    }

    io.to(id).emit(CHAT.GETCHATLIST, {
      favourite: _.sortBy(favourite, ["message.createdAt"]).reverse(),
      contact: _.sortBy(contact, ["message.createdAt"]).reverse(),
    });
  }

  public static async reloadChatList(
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: PaginationType
  ) {
    const userData = await dbConnection.user.findMany({
      where: {
        id: {
          not: data.userId,
        },
        Message: {
          some: {
            id: {
              not: undefined,
            },
          },
        },
      },
    });

    let favourite: any[] = [];
    let contact: any[] = [];

    for await (let user of userData) {
      const message = await dbConnection.message.findFirst({
        where: {
          OR: [
            {
              senderId: {
                equals: data.userId,
              },
              receiverId: {
                equals: user.id,
              },
            },
            {
              senderId: {
                equals: user.id,
              },
              receiverId: {
                equals: data.userId,
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let userData = {
        ...user,
        fullName: `${user.firstName} ${user.lastName}`,
        isOnline: user.status,
        type: MessageType.PRIVATE,
        message,
      };
      const favouriteUser = await dbConnection.favourites.findFirst({
        where: {
          favouriteId: user.id,
        },
      });
      if (favouriteUser) {
        favourite.push(userData);
      } else {
        contact.push(userData);
      }
    }

    const channelData = await dbConnection.channel.findMany({
      where: {
        users: {
          has: data.userId,
        },
      },
    });

    for await (let channel of channelData) {
      const message = await dbConnection.message.findFirst({
        where: {
          receiverId: channel.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      let userData = {
        ...channel,
        fullName: channel.name,
        isOnline: false,
        type: MessageType.GROUP,
        message,
      };
      const favouriteUser = await dbConnection.favourites.findFirst({
        where: {
          favouriteId: channel.id,
        },
      });
      if (favouriteUser) {
        favourite.push(userData);
      } else {
        contact.push(userData);
      }
    }

    const favSortedData = _.sortBy(favourite, ["message.createdAt"]).reverse();
    const contactSortedData = _.sortBy(contact, [
      (item) => item.message.createdAt,
    ]).reverse();
    io.to(data.userId || "").emit(CHAT.GETCHATLIST, {
      favourite: favSortedData,
      contact: contactSortedData,
    });

    //   {
    //     "id": "648bfbcbcf9e0938f39fc721",
    //     "type": "PRIVATE",
    //     "fullName": "Praveen Kumar",
    //     "profileImage": "https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     "message": {
    //         "id": "649bd04244c9542343f97827",
    //         "message": "qwewqe",
    //         "senderId": "648bfbcbcf9e0938f39fc726",
    //         "type": null,
    //         "receiverId": "648bfbcbcf9e0938f39fc721",
    //         "image": [
    //             {
    //                 "url": "",
    //                 "name": "",
    //                 "compressedUrl": ""
    //             }
    //         ],
    //         "isRead": false,
    //         "updatedAt": "2023-06-28T06:16:34.436Z",
    //         "deletedAt": null,
    //         "createdAt": "2023-06-28T06:16:34.436Z"
    //     },
    //     "isOnline": true,
    //     "createdAt": "2023-06-16T06:06:03.067Z"
    // }
  }

  public static async getChatByUserId(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: GetChatByUserId
  ) {
    let { id }: { id: string } = socket.handshake.auth.decoded.user;
    console.log("data==================", data);

    let { limit, page, userId, type } = data;
    if (limit && page) {
      const totalCount = await dbConnection.message.count({
        where:
          type === "PRIVATE"
            ? {
                OR: [
                  {
                    senderId: {
                      equals: id,
                    },
                    receiverId: {
                      equals: userId,
                    },
                  },
                  {
                    senderId: {
                      equals: userId,
                    },
                    receiverId: {
                      equals: id,
                    },
                  },
                ],
              }
            : {
                receiverId: userId,
              },
      });
      const messageData =
        totalCount > 0
          ? await dbConnection.message.findMany({
              where:
                type === "PRIVATE"
                  ? {
                      OR: [
                        {
                          senderId: {
                            equals: id,
                          },
                          receiverId: {
                            equals: userId,
                          },
                        },
                        {
                          senderId: {
                            equals: userId,
                          },
                          receiverId: {
                            equals: id,
                          },
                        },
                      ],
                    }
                  : {
                      receiverId: userId,
                    },
              include: {
                user: {
                  select: {
                    firstName: true,
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
              skip: limit * (page - 1),
              take: limit,
            })
          : [];

      const msg = await dbConnection.message.findMany({
        where: {
          message: {
            contains: "hello",
          },
        },
      });
      console.log("messageData======================", msg);

      const soltedData = messageData.sort(
        (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
      );
      let paginatedData = {
        data: soltedData,
        pagination: pagination(totalCount, limit, page),
      };

      socket.emit(CHAT.GETCHATBYUSERID, paginatedData);
    } else {
      const totalCount = await dbConnection.message.count({
        where:
          type === "PRIVATE"
            ? {
                OR: [
                  {
                    senderId: {
                      equals: id,
                    },
                    receiverId: {
                      equals: userId,
                    },
                  },
                  {
                    senderId: {
                      equals: userId,
                    },
                    receiverId: {
                      equals: id,
                    },
                  },
                ],
              }
            : {
                receiverId: userId,
              },
      });
      const messageData =
        totalCount > 0
          ? await dbConnection.message.findMany({
              where:
                type === "PRIVATE"
                  ? {
                      OR: [
                        {
                          senderId: {
                            equals: id,
                          },
                          receiverId: {
                            equals: userId,
                          },
                        },
                        {
                          senderId: {
                            equals: userId,
                          },
                          receiverId: {
                            equals: id,
                          },
                        },
                      ],
                    }
                  : {
                      receiverId: userId,
                    },
              include: {
                user: {
                  select: {
                    firstName: true,
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
            })
          : [];

      const msg = await dbConnection.message.findMany({
        where: {
          message: {
            contains: "hello",
          },
        },
      });
      console.log("messageData======================", msg);

      const soltedData = messageData.sort(
        (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
      );
      let paginatedData = {
        data: soltedData,
        pagination: pagination(totalCount, limit, page),
      };

      socket.emit(CHAT.GETCHATBYUSERID, paginatedData);
    }
  }

  public static async searchMessage(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: GetChatByUserId
  ) {
    let { id }: { id: string } = socket.handshake.auth.decoded.user;
    console.log("data==================", data);

    let { userId, type, message } = data;

    const messageData = await dbConnection.message.findMany({
      where:
        type === "PRIVATE"
          ? {
              message: {
                contains: message,
                mode: "insensitive",
              },
              OR: [
                {
                  senderId: {
                    equals: id,
                  },
                  receiverId: {
                    equals: userId,
                  },
                },
                {
                  senderId: {
                    equals: userId,
                  },
                  receiverId: {
                    equals: id,
                  },
                },
              ],
            }
          : {
              message: {
                contains: message,
                mode: "insensitive",
              },
              receiverId: userId,
            },
      include: {
        user: {
          select: {
            firstName: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const msg = await dbConnection.message.findMany({
      where: {
        message: {
          contains: "hello",
        },
      },
    });
    console.log("messageData======================", msg);

    const soltedData = messageData.sort(
      (objA, objB) => Number(objA.createdAt) - Number(objB.createdAt)
    );

    socket.emit(CHAT.GETCHATBYUSERID, soltedData);
  }
}
