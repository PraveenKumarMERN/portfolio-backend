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
exports.CommonController = void 0;
const db_1 = __importDefault(require("../../../providers/db"));
const eventName_1 = require("../../../../static/event/eventName");
class CommonController {
    static messageRead(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.default.message.updateMany({
                where: {
                    id: {
                        in: data.ids,
                    },
                },
                data: {
                    isRead: true,
                },
            });
            socket.emit(eventName_1.COMMON.MESSAGEREAD, data.ids);
        });
    }
    static typing(io, socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, firstName } = socket.handshake.auth.decoded.user;
            io.to(data.id).emit(eventName_1.COMMON.TYPING, `${firstName} is Typing...`);
        });
    }
}
exports.CommonController = CommonController;
