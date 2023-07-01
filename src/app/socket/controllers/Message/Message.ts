import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { MessagePayloadType } from "../../../../types/message";
import { MESSAGE } from "../../../../static/event/eventName";
import dbConnection from "../../../providers/db";

export class MessageController {
  public static async sendMessage(
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: MessagePayloadType
  ) {
    let { id } = socket.handshake.auth.decoded.user;

    const userData = await dbConnection.user.findFirst({
      where: {
        id: id,
      },
      select: {
        firstName: true,
      },
    });

    data.user = userData;
    io.to(data.receiverId).emit(MESSAGE.SENDMESSAGE, data);
    await dbConnection.message.create({
      data: {
        message: data.message,
        senderId: id,
        type: data.type,
        receiverId: data.receiverId,
        image: data.image,
      },
    });
  }
}
