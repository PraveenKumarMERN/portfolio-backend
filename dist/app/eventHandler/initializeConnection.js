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
const updateConnection_1 = __importDefault(require("./updateConnection"));
const db_1 = __importDefault(require("../providers/db"));
const initializeConnection = (io, socket) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = socket.handshake.auth.decoded.user;
    const channelData = yield db_1.default.channel.findMany({
        where: {
            users: {
                has: id
            }
        }
    });
    socket.join(id);
    for (let channel of channelData) {
        console.log("============channel", channel);
        socket.join(channel.id);
    }
    return (0, updateConnection_1.default)(io, socket.handshake.auth.decoded.device.user, true);
});
exports.default = initializeConnection;
