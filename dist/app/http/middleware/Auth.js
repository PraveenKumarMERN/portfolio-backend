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
exports.verifyResetToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../../env");
const db_1 = __importDefault(require("../../providers/db"));
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerToken = req.headers["authorization"];
    let token = null;
    if (bearerToken) {
        token = bearerToken.split(" ")[1];
    }
    if (!token) {
        return res.status(401).send({
            status: false,
            message: "Unauthorized",
        });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.auth.secret);
        if (typeof decoded !== "string") {
            const device = yield db_1.default.device.findFirst({
                where: {
                    userId: decoded.userId,
                    deletedAt: null || undefined,
                },
                include: {
                    user: true,
                },
            });
            if (!device) {
                throw "Invalid Token";
            }
            req.body.auth = {
                bearerToken: token,
                device: device,
                user: device.user,
            };
        }
        else {
            throw "user not found";
        }
    }
    catch (err) {
        return res.status(401).send({
            status: false,
            message: "Invalid Token",
        });
    }
    return next();
});
exports.verifyToken = verifyToken;
const verifyResetToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.query.token;
        if (!token || typeof token !== "string") {
            return res.status(401).send({
                status: false,
                message: req.t("user.token_not_found"),
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.auth.secret);
        if (typeof decoded === "string") {
            return res.send({
                status: false,
                message: req.t("user.link_expired"),
            });
        }
        const user = yield db_1.default.user.findFirst({
            where: {
                forgotPasswordToken: token,
            },
        });
        if (!user) {
            return res.send({
                status: false,
                message: req.t("user.link_expired"),
            });
        }
        req.body.auth = {
            token: token,
            user: user,
        };
        next();
    }
    catch (err) {
        return res.send({
            status: false,
            message: req.t("user.invalid_reset_link"),
        });
    }
});
exports.verifyResetToken = verifyResetToken;
