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
const client_1 = require("@prisma/client");
const logger_1 = require("./logger");
const dbConnection = new client_1.PrismaClient();
dbConnection.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check incoming query type
    if (params.model == "Device") {
        if (params.action == "delete") {
            // Delete queries
            // Change action to an update
            params.action = "update";
            params.args["data"] = { fcmToken: null };
            params.args["data"] = { deletedAt: new Date() };
        }
        if (params.action == "deleteMany") {
            // Delete many queries
            params.action = "updateMany";
            params.args["data"] = { fcmToken: null };
            params.args["data"] = { deletedAt: new Date() };
        }
    }
    return next(params);
}));
dbConnection.$use((params, next) => __awaiter(void 0, void 0, void 0, function* () {
    const before = Date.now();
    const result = yield next(params);
    const after = Date.now();
    logger_1.logger.info(`Query ${params.model}.${params.action} took ${after - before}ms
    Query params : ${JSON.stringify(params.args)}
    `);
    return result;
}));
exports.default = dbConnection;
