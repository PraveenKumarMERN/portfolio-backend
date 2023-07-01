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
exports.Express = void 0;
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const api_1 = __importDefault(require("../../routes/api/api"));
const web_1 = __importDefault(require("../../routes/web/web"));
const env_1 = require("../../env");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const body_parser_1 = __importDefault(require("body-parser"));
const ExceptionHandler_1 = require("../http/middleware/ExceptionHandler");
const cors_1 = __importDefault(require("cors"));
class Express {
    constructor() {
        this.initializeApp = () => {
            const port = process.env.APP_PORT;
            this.app.use((0, cors_1.default)({
                origin: '*',
                methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT", "DELETE"],
            }));
            this.app.use(express_1.default.json());
            this.app.use(body_parser_1.default.urlencoded({ extended: true }));
            this.app.use(express_1.default.static(env_1.env.app.root_dir + "/public"));
            this.app.use(env_1.env.app.user_uploaded_content_path, express_1.default.static(env_1.env.app.root_dir + "/storage/uploads/"));
            this.app.use((0, helmet_1.default)());
            this.app.use((0, compression_1.default)());
            this.app.disable("x-powered-by");
            // error handler
            this.app.set("port", port);
        };
        this.configureViews = (serverAdapter) => {
            this.app.set("view engine", "hbs");
            this.app.set("views", env_1.env.app.root_dir + "/views/");
            if (!env_1.env.app.api_only) {
                this.app.use("/", web_1.default);
            }
            this.app.use(`/${env_1.env.app.api_prefix}`, api_1.default);
            // this.app.use("/queues", serverAdapter.getRouter());
        };
        this.configureLocale = (middleware, i18next) => {
            this.app.use(middleware.handle(i18next));
        };
        this.configureRateLimiter = () => __awaiter(this, void 0, void 0, function* () {
            if (env_1.env.app.api_rate_limit > 0) {
                this.app.use((0, express_rate_limit_1.default)({
                    // Rate limiter configuration
                    skip: (request) => {
                        const urlArray = request.originalUrl.split("/");
                        if (urlArray.length > 2 &&
                            urlArray[1] === "queues" &&
                            urlArray[2] === "api") {
                            return true;
                        }
                        return false;
                    },
                    windowMs: 15 * 60 * 1000,
                    max: env_1.env.app.api_rate_limit,
                    standardHeaders: true,
                    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
                }));
            }
        });
        this.configureExceptionHandler = () => {
            this.app.use(ExceptionHandler_1.NotFoundHandler);
            this.app.use(ExceptionHandler_1.ExceptionHandler);
        };
        this.app = (0, express_1.default)();
    }
}
exports.Express = Express;
