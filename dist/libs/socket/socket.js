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
exports.SocketEmitter = void 0;
const redis_emitter_1 = require("@socket.io/redis-emitter");
const redis_1 = require("redis");
const env_1 = require("../../env");
const IO = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = env_1.env.redis.url;
    const redisClient = (0, redis_1.createClient)({
        url: url,
    });
    yield redisClient.connect();
    return new redis_emitter_1.Emitter(redisClient);
});
/**
 *  connects to socket server adapter and emits data
 * @param namespace
 * @param event
 * @param data
 */
const broadcastTo = (namespace, event, data) => __awaiter(void 0, void 0, void 0, function* () {
    const io = yield IO();
    const response = io.to(namespace).emit(event, data);
    console.log("response for socket >>>", response);
});
class SocketEmitter {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    static sendMessage(namespace, event, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield broadcastTo(namespace, event, data);
        });
    }
}
exports.SocketEmitter = SocketEmitter;
