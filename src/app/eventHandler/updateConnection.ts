import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import dbConnection from "../providers/db";
import { CONNECTION } from "../../static/event/eventName";

const updateConnection = async (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  user: any,
  isOnline: boolean
) => {
  let { id } = user;
  io.emit(CONNECTION.CONNECTIONSTATUS, { id, isOnline: isOnline });
  // await dbConnection.user.update({
  //   where: {
  //     id: id,
  //   },
  //   data: {
  //     isConnected: isOnline,
  //   },
  // });
};
export default updateConnection;
