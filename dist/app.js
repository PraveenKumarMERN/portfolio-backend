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
const logger_1 = require("./app/providers/logger");
const queues_1 = __importDefault(require("./app/providers/queues"));
const locale_1 = require("./app/providers/locale");
const cron_1 = require("./app/providers/cron");
const server_1 = require("./app/providers/server");
const express_1 = require("./app/providers/express");
const express = new express_1.Express();
const locale = new locale_1.Locale();
const { middleware, i18next } = locale.initializeLocales();
Promise.all([
    express.initializeApp(),
    // express.configureRateLimiter(),
    express.configureLocale(middleware, i18next),
    express.configureViews(queues_1.default),
    express.configureExceptionHandler(),
]).then(() => {
    const app = express.app;
    const httpServer = new server_1.Server(app);
    httpServer.start();
    cron_1.cron.setup();
});
process.on("uncaughtException", (err) => {
    logger_1.logger.error(err);
    process.exit(1);
});
process.on("SIGTERM", () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.debug("SIGTERM signal received: closing HTTP server");
    process.exit(1);
}));
process.on("unhandledRejection", (err) => {
    logger_1.logger.error(err);
    process.exit(1);
});
