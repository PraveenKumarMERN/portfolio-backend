import { Server } from "socket.io";
import http from "http";
import verifyToken from "../http/middleware/SocketAuth";
import {
  adminEventHandler,
  userEventHandler,
} from "../eventHandler/eventHandler";
import initializeConnection from "../eventHandler/initializeConnection";
import updateConnection from "../eventHandler/updateConnection";

const Socket = (app: http.Server) => {
  const io = new Server(app, {
    serveClient: true,
    cors: {
      origin: true,
      credentials: true,
    },
    allowEIO3: true,
  });
  
  io.use(async (socket, next) => {
    if (
      socket.handshake.query.token &&
      typeof socket.handshake.query.token === "string"
    ) {
      console.log("==", socket.handshake.query.token);

      const { decoded, error } = await verifyToken(
        socket.handshake.query.token
      );
      if (decoded) {
        socket.handshake.auth.decoded = decoded;
        next();
      } else {
        return next(new Error("Authentication Error"));
      }
    } else {
      return next(new Error("Authentication Error"));
    }
  }).on("connection", (socket) => {
    console.log(
      "socket.handshake.auth.decoded.user",
      socket.handshake.auth.decoded.user
    );

    initializeConnection(io, socket);
    socket.onAny((arg, data) => {
      switch (socket.handshake.auth.decoded.device.userType) {
        case "ADMIN":
          adminEventHandler(arg, data, socket);
          break;
        case "USER":
          userEventHandler(io, arg, data, socket);
          break;
        default:
          break;
      }
    });
    console.log(`socket connected ${socket.id}`);
    socket.on("disconnect", () => {
      return updateConnection(
        io,
        socket.handshake.auth.decoded.device.user,
        false
      );
    });
  });
};

export default Socket;
