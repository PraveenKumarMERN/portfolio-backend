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
exports.FileController = void 0;
const s3_1 = require("../../../../libs/s3/s3");
const eventName_1 = require("../../../../static/event/eventName");
class FileController {
    static upload(socket, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id } = socket.handshake.auth.decoded.user;
            let path = `${Date.now()}-${data.name}`;
            const uploadDetails = yield s3_1.S3.getSignedUrl(path, data.mineType);
            console.log("uploadDetails", uploadDetails, path);
            return socket.to(id).emit(eventName_1.FILE.FILEUPLOAD, uploadDetails);
        });
    }
}
exports.FileController = FileController;
