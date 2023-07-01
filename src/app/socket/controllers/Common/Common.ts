import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { MessageReadType, TypingType } from "../../../../types/message";
import dbConnection from "../../../providers/db";
import { COMMON } from "../../../../static/event/eventName";

export class CommonController {
  public static async messageRead(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: MessageReadType
  ) {
    await dbConnection.message.updateMany({
      where: {
        id: {
          in: data.ids,
        },
      },
      data: {
        isRead: true,
      },
    });

    socket.emit(COMMON.MESSAGEREAD, data.ids);
  }



  public static async typing(
    io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    socket:Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
    data: TypingType
  ) {
    let { id , firstName}: { id: string, firstName:string } = socket.handshake.auth.decoded.user;
    io.to(data.id).emit(COMMON.TYPING, `${firstName} is Typing...`);
  }
}
