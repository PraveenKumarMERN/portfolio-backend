"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const SocketAuth_1 = __importDefault(require("../http/middleware/SocketAuth"));
const eventHandler_1 = require("../eventHandler/eventHandler");
const initializeConnection_1 = __importDefault(require("../eventHandler/initializeConnection"));
const updateConnection_1 = __importDefault(require("../eventHandler/updateConnection"));
const Socket = (app) => {
    const io = new socket_io_1.Server(app, {
        serveClient: true,
        cors: {
            origin: true,
            credentials: true,
        },
        allowEIO3: true,
    });
    io.use((socket, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (socket.handshake.query.token &&
            typeof socket.handshake.query.token === "string") {
            console.log("==", socket.handshake.query.token);
            const { decoded, error } = yield (0, SocketAuth_1.default)(socket.handshake.query.token);
            if (decoded) {
                socket.handshake.auth.decoded = decoded;
                next();
            }
            else {
                return next(new Error("Authentication Error"));
            }
        }
        else {
            return next(new Error("Authentication Error"));
        }
    })).on("connection", (socket) => {
        console.log("socket.handshake.auth.decoded.user", socket.handshake.auth.decoded.user);
        (0, initializeConnection_1.default)(io, socket);
        socket.onAny((arg, data) => {
            switch (socket.handshake.auth.decoded.device.userType) {
                case "ADMIN":
                    (0, eventHandler_1.adminEventHandler)(arg, data, socket);
                    break;
                case "USER":
                    (0, eventHandler_1.userEventHandler)(io, arg, data, socket);
                    break;
                default:
                    break;
            }
        });
        console.log(`socket connected ${socket.id}`);
        socket.on("disconnect", () => {
            return (0, updateConnection_1.default)(io, socket.handshake.auth.decoded.device.user, false);
        });
    });
};
exports.default = Socket;
