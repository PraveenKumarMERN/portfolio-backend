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
exports.UsersController = void 0;
const client_1 = require("@prisma/client");
const eventName_1 = require("../../../../static/event/eventName");
const db_1 = __importDefault(require("../../../providers/db"));
class UsersController {
    static getUsers(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield db_1.default.user.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                },
            });
            function convertArrayToObject(arr) {
                const result = {};
                arr.forEach((obj) => {
                    const firstLetter = obj.firstName.charAt(0).toLowerCase();
                    if (!result[firstLetter]) {
                        result[firstLetter] = [];
                    }
                    result[firstLetter].push(obj);
                });
                return result;
            }
            const convertedData = convertArrayToObject(userData);
            return socket.emit(eventName_1.CHAT.GETCHATLIST, convertedData);
        });
    }
    static getUserById(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = socket.handshake.auth.decoded.user;
            if (client_1.MessageType.PRIVATE) {
                const userData = yield db_1.default.user.findFirst({
                    where: {
                        id: data.id,
                    },
                    include: {
                        Favourites: {
                            where: {
                                userId: id,
                                favouriteId: data.id,
                                type: client_1.MessageType.PRIVATE,
                            },
                        },
                    },
                });
                let payload = {
                    fullName: `${userData === null || userData === void 0 ? void 0 : userData.firstName} ${userData === null || userData === void 0 ? void 0 : userData.lastName}`,
                    email: userData === null || userData === void 0 ? void 0 : userData.email,
                    isConnected: userData === null || userData === void 0 ? void 0 : userData.isConnected,
                    profileImage: userData === null || userData === void 0 ? void 0 : userData.profileImage,
                    Favourites: (userData === null || userData === void 0 ? void 0 : userData.Favourites[0]) || null,
                };
                socket.emit(eventName_1.USERS.GETUSERBYID, payload);
            }
            if (client_1.MessageType.GROUP) {
                const channel = yield db_1.default.channel.findFirst({
                    where: { users: { has: id } },
                    include: {
                        Favourites: {
                            where: {
                                userId: id,
                                favouriteId: data.id,
                                type: client_1.MessageType.PRIVATE,
                            },
                        },
                    },
                    // select: {
                    //   name: true,
                    //   id: true,
                    // },
                });
                let payload = {
                    fullName: channel === null || channel === void 0 ? void 0 : channel.name,
                    email: null,
                    isConnected: null,
                    profileImage: channel === null || channel === void 0 ? void 0 : channel.profileImage,
                    Favourites: (channel === null || channel === void 0 ? void 0 : channel.Favourites[0]) || null,
                };
                socket.emit(eventName_1.USERS.GETUSERBYID, payload);
            }
        });
    }
}
exports.UsersController = UsersController;
