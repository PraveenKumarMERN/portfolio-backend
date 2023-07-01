import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import {
  CHANNEL,
  CHAT,
  COMMON,
  FILE,
  MESSAGE,
  USERS,
} from "../../static/event/eventName";
import { MessageController } from "../socket/controllers/Message/Message";
import { MessagePayloadType } from "../../types/message";
import { ChannelController } from "../socket/controllers/Channel/Channel";
import { FileController } from "../socket/controllers/FileUpload/FileUpload";
import { UsersController } from "../socket/controllers/User/User";
import { ChatController } from "../socket/controllers/Chat/Chat";
import { CommonController } from "../socket/controllers/Common/Common";

export const adminEventHandler = (
  en: string,
  payload: any,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  switch (en) {
    case "":
      break;

    default:
      break;
  }
};

export const userEventHandler = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  en: string,
  payload: any,
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  console.log("event name ==============", en);

  switch (en) {
    case MESSAGE.SENDMESSAGE:
      MessageController.sendMessage(io, socket, payload);
      break;
    case CHANNEL.NEWCHANNELADD:
      ChannelController.newChannel(socket, payload);
      break;
    case USERS.GETUSERS:
      UsersController.getUsers(socket, payload);
      break;
    case COMMON.ADDTOFAVOURITE:
      ChannelController.addToFavourite(socket, payload);
      break;
    case USERS.GETUSERBYID:
      UsersController.getUserById(socket, payload);
      break;
    case CHANNEL.GETCHANNEL:
      ChannelController.getChannel(payload, socket);
      break;
    case FILE.FILEUPLOAD:
      FileController.upload(socket, payload);
      break;
    case CHAT.GETCHATLIST:
      ChatController.getChatList(io, socket);
      break;
    case CHAT.GETCHATBYUSERID:
      ChatController.getChatByUserId(socket, payload);
      break;

    case CHAT.SERACHMESSAGE:
      ChatController.searchMessage(socket, payload);
      break;
    case COMMON.MESSAGEREAD:
      CommonController.messageRead(socket, payload);
      break;
    case COMMON.TYPING:
      CommonController.typing(io, socket, payload);
      break;
    default:
      break;
  }
};
