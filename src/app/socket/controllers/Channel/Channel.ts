import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import {
  AddToFavouriteType,
  ChannelMessagePayloadType,
  ChannelPayloadType,
  NewChannelType,
} from "../../../../types/message";
import dbConnection from "../../../providers/db";
import { CHANNEL, COMMON, MESSAGE } from "../../../../static/event/eventName";

export class ChannelController {
  public static async newChannel(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: NewChannelType
  ) {
    let { id } = socket.handshake.auth.decoded.user;
    try {
      data.users.push(id);
      const channel = await dbConnection.channel.create({
        data: {
          name: data.name,
          users: data.users,
          image: data.image,
        },
      });

      data.users.forEach((userId: string) => {
        socket.to(userId).emit(CHANNEL.NEWCHANNELADD, {
          message: `You have added in ${data.name} channel`,
          data: channel,
        });
        socket.to(userId).socketsJoin(channel.id);
      });

      return socket.emit(channel.id, channel);
    } catch (error: any) {
      console.log("error========", error);
    }
  }

  public static async getChannel(
    { sortType }: ChannelPayloadType,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  ) {
    let { id } = socket.handshake.auth.decoded.user;

    const channel = await dbConnection.channel.findMany({
      where: { users: { has: id } },
      select: {
        name: true,
        id: true,
      },
      orderBy: {
        name: sortType || "desc",
      },
    });
    return socket.emit(CHANNEL.GETCHANNEL, channel);
  }

  public static async channelMessage(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: ChannelMessagePayloadType
  ) {
    return socket.to(data.id).emit(MESSAGE.SENDCHANNELMESSAGE, data);
  }

  public static async addToFavourite(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: AddToFavouriteType
  ) {
    let { id } = socket.handshake.auth.decoded.user;
    const favouriteData = await dbConnection.favourites.create({
      data:{
        userId:id,
        favouriteId:data.favouriteId,
        type:data.type
      }
    })
    console.log(favouriteData);
    
    return socket.to(id).emit(COMMON.ADDTOFAVOURITE, favouriteData);
  }
}
