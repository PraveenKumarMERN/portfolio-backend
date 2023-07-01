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
exports.Server = void 0;
const http_1 = __importDefault(require("http"));
const env_1 = require("../../env");
// import { logger } from "./logger";
class Server {
    // logger: Logger;
    constructor(app) {
        this.server = http_1.default.createServer(app);
        // this.logger = logger;
    }
    /**
     *  runs the server
     */
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            this.server.listen(env_1.env.app.port);
            console.log("Server Listening on port:" + env_1.env.app.port);
            this.server.on("error", this.onError);
        });
    }
    /**
     * Event listener for HTTP server "error" event.
     */
    onError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            if (error.syscall !== "listen") {
                throw error;
            }
            var bind = typeof env_1.env.app.port === "string"
                ? "Pipe " + env_1.env.app.port
                : "Port " + env_1.env.app.port;
            // handle specific listen errors with friendly messages
            switch (error.code) {
                case "EACCES":
                    // this.logger.fatal(bind + " requires elevated privileges");
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    // this.logger.fatal(bind + " is already in use");
                    process.exit(1);
                    break;
                default:
                    throw error;
            }
        });
    }
}
exports.Server = Server;
