"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONNECTION = exports.CHAT = exports.COMMON = exports.USERS = exports.FILE = exports.CHANNEL = exports.MESSAGE = void 0;
var MESSAGE;
(function (MESSAGE) {
    MESSAGE["SENDMESSAGE"] = "SENDMESSAGE";
    MESSAGE["SENDCHANNELMESSAGE"] = "SENDCHANNELMESSAGE";
})(MESSAGE = exports.MESSAGE || (exports.MESSAGE = {}));
var CHANNEL;
(function (CHANNEL) {
    CHANNEL["GETCHANNEL"] = "GETCHANNEL";
    CHANNEL["NEWCHANNELADD"] = "NEWCHANNELADD";
})(CHANNEL = exports.CHANNEL || (exports.CHANNEL = {}));
var FILE;
(function (FILE) {
    FILE["FILEUPLOAD"] = "FILEUPLOAD";
})(FILE = exports.FILE || (exports.FILE = {}));
var USERS;
(function (USERS) {
    USERS["GETUSERS"] = "GETUSERS";
    USERS["GETUSERBYID"] = "GETUSERBYID";
})(USERS = exports.USERS || (exports.USERS = {}));
var COMMON;
(function (COMMON) {
    COMMON["ADDTOFAVOURITE"] = "ADDTOFAVOURITE";
    COMMON["MESSAGEREAD"] = "MESSAGEREAD";
    COMMON["TYPING"] = "TYPING";
})(COMMON = exports.COMMON || (exports.COMMON = {}));
var CHAT;
(function (CHAT) {
    CHAT["GETCHATBYUSERID"] = "GETCHATBYUSERID";
    CHAT["SERACHMESSAGE"] = "SERACHMESSAGE";
    CHAT["GETCHATLIST"] = "GETCHATLIST";
})(CHAT = exports.CHAT || (exports.CHAT = {}));
var CONNECTION;
(function (CONNECTION) {
    CONNECTION["CONNECTIONSTATUS"] = "CONNECTIONSTATUS";
})(CONNECTION = exports.CONNECTION || (exports.CONNECTION = {}));
