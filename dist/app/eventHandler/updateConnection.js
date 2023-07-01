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
Object.defineProperty(exports, "__esModule", { value: true });
const eventName_1 = require("../../static/event/eventName");
const updateConnection = (io, user, isOnline) => __awaiter(void 0, void 0, void 0, function* () {
    let { id } = user;
    io.emit(eventName_1.CONNECTION.CONNECTIONSTATUS, { id, isOnline: isOnline });
    // await dbConnection.user.update({
    //   where: {
    //     id: id,
    //   },
    //   data: {
    //     isConnected: isOnline,
    //   },
    // });
});
exports.default = updateConnection;
