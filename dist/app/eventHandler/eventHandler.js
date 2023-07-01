"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEventHandler = exports.adminEventHandler = void 0;
const eventName_1 = require("../../static/event/eventName");
const Message_1 = require("../socket/controllers/Message/Message");
const Channel_1 = require("../socket/controllers/Channel/Channel");
const FileUpload_1 = require("../socket/controllers/FileUpload/FileUpload");
const User_1 = require("../socket/controllers/User/User");
const Chat_1 = require("../socket/controllers/Chat/Chat");
const Common_1 = require("../socket/controllers/Common/Common");
const adminEventHandler = (en, payload, socket) => {
    switch (en) {
        case "":
            break;
        default:
            break;
    }
};
exports.adminEventHandler = adminEventHandler;
const userEventHandler = (io, en, payload, socket) => {
    console.log("event name ==============", en);
    switch (en) {
        case eventName_1.MESSAGE.SENDMESSAGE:
            Message_1.MessageController.sendMessage(io, socket, payload);
            break;
        case eventName_1.CHANNEL.NEWCHANNELADD:
            Channel_1.ChannelController.newChannel(socket, payload);
            break;
        case eventName_1.USERS.GETUSERS:
            User_1.UsersController.getUsers(socket, payload);
            break;
        case eventName_1.COMMON.ADDTOFAVOURITE:
            Channel_1.ChannelController.addToFavourite(socket, payload);
            break;
        case eventName_1.USERS.GETUSERBYID:
            User_1.UsersController.getUserById(socket, payload);
            break;
        case eventName_1.CHANNEL.GETCHANNEL:
            Channel_1.ChannelController.getChannel(payload, socket);
            break;
        case eventName_1.FILE.FILEUPLOAD:
            FileUpload_1.FileController.upload(socket, payload);
            break;
        case eventName_1.CHAT.GETCHATLIST:
            Chat_1.ChatController.getChatList(io, socket);
            break;
        case eventName_1.CHAT.GETCHATBYUSERID:
            Chat_1.ChatController.getChatByUserId(socket, payload);
            break;
        case eventName_1.CHAT.SERACHMESSAGE:
            Chat_1.ChatController.searchMessage(socket, payload);
            break;
        case eventName_1.COMMON.MESSAGEREAD:
            Common_1.CommonController.messageRead(socket, payload);
            break;
        case eventName_1.COMMON.TYPING:
            Common_1.CommonController.typing(io, socket, payload);
            break;
        default:
            break;
    }
};
exports.userEventHandler = userEventHandler;
