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
exports.ChannelController = void 0;
const db_1 = __importDefault(require("../../../providers/db"));
const eventName_1 = require("../../../../static/event/eventName");
class ChannelController {
    static newChannel(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = socket.handshake.auth.decoded.user;
            try {
                data.users.push(id);
                const channel = yield db_1.default.channel.create({
                    data: {
                        name: data.name,
                        users: data.users,
                        image: data.image,
                    },
                });
                data.users.forEach((userId) => {
                    socket.to(userId).emit(eventName_1.CHANNEL.NEWCHANNELADD, {
                        message: `You have added in ${data.name} channel`,
                        data: channel,
                    });
                    socket.to(userId).socketsJoin(channel.id);
                });
                return socket.emit(channel.id, channel);
            }
            catch (error) {
                console.log("error========", error);
            }
        });
    }
    static getChannel({ sortType }, socket) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = socket.handshake.auth.decoded.user;
            const channel = yield db_1.default.channel.findMany({
                where: { users: { has: id } },
                select: {
                    name: true,
                    id: true,
                },
                orderBy: {
                    name: sortType || "desc",
                },
            });
            return socket.emit(eventName_1.CHANNEL.GETCHANNEL, channel);
        });
    }
    static channelMessage(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return socket.to(data.id).emit(eventName_1.MESSAGE.SENDCHANNELMESSAGE, data);
        });
    }
    static addToFavourite(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = socket.handshake.auth.decoded.user;
            const favouriteData = yield db_1.default.favourites.create({
                data: {
                    userId: id,
                    favouriteId: data.favouriteId,
                    type: data.type
                }
            });
            console.log(favouriteData);
            return socket.to(id).emit(eventName_1.COMMON.ADDTOFAVOURITE, favouriteData);
        });
    }
}
exports.ChannelController = ChannelController;
