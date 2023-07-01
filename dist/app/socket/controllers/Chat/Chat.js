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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const client_1 = require("@prisma/client");
const eventName_1 = require("../../../../static/event/eventName");
const db_1 = __importDefault(require("../../../providers/db"));
const utils_1 = require("../../../../utils/utils");
const lodash_1 = __importDefault(require("lodash"));
class ChatController {
    static getChatList(io, socket) {
        var e_1, _a, e_2, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = socket.handshake.auth.decoded.user;
            // let { page, limit } = data;
            const userData = yield db_1.default.user.findMany({
                where: {
                    id: {
                        not: id,
                    },
                    Message: {
                        some: {
                            id: {
                                not: undefined,
                            },
                        },
                    },
                },
            });
            let favourite = [];
            let contact = [];
            try {
                for (var userData_1 = __asyncValues(userData), userData_1_1; userData_1_1 = yield userData_1.next(), !userData_1_1.done;) {
                    let user = userData_1_1.value;
                    const message = yield db_1.default.message.findFirst({
                        where: {
                            OR: [
                                {
                                    senderId: {
                                        equals: id,
                                    },
                                    receiverId: {
                                        equals: user.id,
                                    },
                                },
                                {
                                    senderId: {
                                        equals: user.id,
                                    },
                                    receiverId: {
                                        equals: id,
                                    },
                                },
                            ],
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    });
                    let userData = Object.assign(Object.assign({}, user), { fullName: `${user.firstName} ${user.lastName}`, isOnline: user.isConnected, type: client_1.MessageType.PRIVATE, message });
                    const favouriteUser = yield db_1.default.favourites.findFirst({
                        where: {
                            favouriteId: user.id,
                        },
                    });
                    if (favouriteUser) {
                        favourite.push(userData);
                    }
                    else {
                        contact.push(userData);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (userData_1_1 && !userData_1_1.done && (_a = userData_1.return)) yield _a.call(userData_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            const channelData = yield db_1.default.channel.findMany({
                where: {
                    users: {
                        has: id,
                    },
                },
            });
            try {
                for (var channelData_1 = __asyncValues(channelData), channelData_1_1; channelData_1_1 = yield channelData_1.next(), !channelData_1_1.done;) {
                    let channel = channelData_1_1.value;
                    const message = yield db_1.default.message.findFirst({
                        where: {
                            receiverId: channel.id,
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    });
                    let userData = Object.assign(Object.assign({}, channel), { fullName: channel.name, isOnline: false, type: client_1.MessageType.GROUP, message });
                    const favouriteUser = yield db_1.default.favourites.findFirst({
                        where: {
                            favouriteId: channel.id,
                        },
                    });
                    if (favouriteUser) {
                        favourite.push(userData);
                    }
                    else {
                        contact.push(userData);
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (channelData_1_1 && !channelData_1_1.done && (_b = channelData_1.return)) yield _b.call(channelData_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            io.to(id).emit(eventName_1.CHAT.GETCHATLIST, {
                favourite: lodash_1.default.sortBy(favourite, ["message.createdAt"]).reverse(),
                contact: lodash_1.default.sortBy(contact, ["message.createdAt"]).reverse(),
            });
        });
    }
    static reloadChatList(io, socket, data) {
        var e_3, _a, e_4, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const userData = yield db_1.default.user.findMany({
                where: {
                    id: {
                        not: data.userId,
                    },
                    Message: {
                        some: {
                            id: {
                                not: undefined,
                            },
                        },
                    },
                },
            });
            let favourite = [];
            let contact = [];
            try {
                for (var userData_2 = __asyncValues(userData), userData_2_1; userData_2_1 = yield userData_2.next(), !userData_2_1.done;) {
                    let user = userData_2_1.value;
                    const message = yield db_1.default.message.findFirst({
                        where: {
                            OR: [
                                {
                                    senderId: {
                                        equals: data.userId,
                                    },
                                    receiverId: {
                                        equals: user.id,
                                    },
                                },
                                {
                                    senderId: {
                                        equals: user.id,
                                    },
                                    receiverId: {
                                        equals: data.userId,
                                    },
                                },
                            ],
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    });
                    let userData = Object.assign(Object.assign({}, user), { fullName: `${user.firstName} ${user.lastName}`, isOnline: user.status, type: client_1.MessageType.PRIVATE, message });
                    const favouriteUser = yield db_1.default.favourites.findFirst({
                        where: {
                            favouriteId: user.id,
                        },
                    });
                    if (favouriteUser) {
                        favourite.push(userData);
                    }
                    else {
                        contact.push(userData);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (userData_2_1 && !userData_2_1.done && (_a = userData_2.return)) yield _a.call(userData_2);
                }
                finally { if (e_3) throw e_3.error; }
            }
            const channelData = yield db_1.default.channel.findMany({
                where: {
                    users: {
                        has: data.userId,
                    },
                },
            });
            try {
                for (var channelData_2 = __asyncValues(channelData), channelData_2_1; channelData_2_1 = yield channelData_2.next(), !channelData_2_1.done;) {
                    let channel = channelData_2_1.value;
                    const message = yield db_1.default.message.findFirst({
                        where: {
                            receiverId: channel.id,
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    });
                    let userData = Object.assign(Object.assign({}, channel), { fullName: channel.name, isOnline: false, type: client_1.MessageType.GROUP, message });
                    const favouriteUser = yield db_1.default.favourites.findFirst({
                        where: {
                            favouriteId: channel.id,
                        },
                    });
                    if (favouriteUser) {
                        favourite.push(userData);
                    }
                    else {
                        contact.push(userData);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (channelData_2_1 && !channelData_2_1.done && (_b = channelData_2.return)) yield _b.call(channelData_2);
                }
                finally { if (e_4) throw e_4.error; }
            }
            const favSortedData = lodash_1.default.sortBy(favourite, ["message.createdAt"]).reverse();
            const contactSortedData = lodash_1.default.sortBy(contact, [
                (item) => item.message.createdAt,
            ]).reverse();
            io.to(data.userId || "").emit(eventName_1.CHAT.GETCHATLIST, {
                favourite: favSortedData,
                contact: contactSortedData,
            });
        });
    }
    static getChatByUserId(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = socket.handshake.auth.decoded.user;
            console.log("data==================", data);
            let { limit, page, userId, type } = data;
            if (limit && page) {
                const totalCount = yield db_1.default.message.count({
                    where: type === "PRIVATE"
                        ? {
                            OR: [
                                {
                                    senderId: {
                                        equals: id,
                                    },
                                    receiverId: {
                                        equals: userId,
                                    },
                                },
                                {
                                    senderId: {
                                        equals: userId,
                                    },
                                    receiverId: {
                                        equals: id,
                                    },
                                },
                            ],
                        }
                        : {
                            receiverId: userId,
                        },
                });
                const messageData = totalCount > 0
                    ? yield db_1.default.message.findMany({
                        where: type === "PRIVATE"
                            ? {
                                OR: [
                                    {
                                        senderId: {
                                            equals: id,
                                        },
                                        receiverId: {
                                            equals: userId,
                                        },
                                    },
                                    {
                                        senderId: {
                                            equals: userId,
                                        },
                                        receiverId: {
                                            equals: id,
                                        },
                                    },
                                ],
                            }
                            : {
                                receiverId: userId,
                            },
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                        skip: limit * (page - 1),
                        take: limit,
                    })
                    : [];
                const msg = yield db_1.default.message.findMany({
                    where: {
                        message: {
                            contains: "hello",
                        },
                    },
                });
                console.log("messageData======================", msg);
                const soltedData = messageData.sort((objA, objB) => Number(objA.createdAt) - Number(objB.createdAt));
                let paginatedData = {
                    data: soltedData,
                    pagination: (0, utils_1.pagination)(totalCount, limit, page),
                };
                socket.emit(eventName_1.CHAT.GETCHATBYUSERID, paginatedData);
            }
            else {
                const totalCount = yield db_1.default.message.count({
                    where: type === "PRIVATE"
                        ? {
                            OR: [
                                {
                                    senderId: {
                                        equals: id,
                                    },
                                    receiverId: {
                                        equals: userId,
                                    },
                                },
                                {
                                    senderId: {
                                        equals: userId,
                                    },
                                    receiverId: {
                                        equals: id,
                                    },
                                },
                            ],
                        }
                        : {
                            receiverId: userId,
                        },
                });
                const messageData = totalCount > 0
                    ? yield db_1.default.message.findMany({
                        where: type === "PRIVATE"
                            ? {
                                OR: [
                                    {
                                        senderId: {
                                            equals: id,
                                        },
                                        receiverId: {
                                            equals: userId,
                                        },
                                    },
                                    {
                                        senderId: {
                                            equals: userId,
                                        },
                                        receiverId: {
                                            equals: id,
                                        },
                                    },
                                ],
                            }
                            : {
                                receiverId: userId,
                            },
                        include: {
                            user: {
                                select: {
                                    firstName: true,
                                },
                            },
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    })
                    : [];
                const msg = yield db_1.default.message.findMany({
                    where: {
                        message: {
                            contains: "hello",
                        },
                    },
                });
                console.log("messageData======================", msg);
                const soltedData = messageData.sort((objA, objB) => Number(objA.createdAt) - Number(objB.createdAt));
                let paginatedData = {
                    data: soltedData,
                    pagination: (0, utils_1.pagination)(totalCount, limit, page),
                };
                socket.emit(eventName_1.CHAT.GETCHATBYUSERID, paginatedData);
            }
        });
    }
    static searchMessage(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = socket.handshake.auth.decoded.user;
            console.log("data==================", data);
            let { userId, type, message } = data;
            const messageData = yield db_1.default.message.findMany({
                where: type === "PRIVATE"
                    ? {
                        message: {
                            contains: message,
                            mode: "insensitive",
                        },
                        OR: [
                            {
                                senderId: {
                                    equals: id,
                                },
                                receiverId: {
                                    equals: userId,
                                },
                            },
                            {
                                senderId: {
                                    equals: userId,
                                },
                                receiverId: {
                                    equals: id,
                                },
                            },
                        ],
                    }
                    : {
                        message: {
                            contains: message,
                            mode: "insensitive",
                        },
                        receiverId: userId,
                    },
                include: {
                    user: {
                        select: {
                            firstName: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
            const msg = yield db_1.default.message.findMany({
                where: {
                    message: {
                        contains: "hello",
                    },
                },
            });
            console.log("messageData======================", msg);
            const soltedData = messageData.sort((objA, objB) => Number(objA.createdAt) - Number(objB.createdAt));
            socket.emit(eventName_1.CHAT.GETCHATBYUSERID, soltedData);
        });
    }
}
exports.ChatController = ChatController;
