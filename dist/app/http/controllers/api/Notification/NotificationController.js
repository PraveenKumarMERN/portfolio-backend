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
exports.NotificationController = void 0;
const utils_1 = require("../../../../../utils/utils");
const db_1 = __importDefault(require("../../../../providers/db"));
const NotificationResponse_1 = require("../../../responses/NotificationResponse");
class NotificationController {
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body.auth;
            const { page, perPage } = req.body.pagination;
            const totalCount = yield db_1.default.notification.count({
                where: {
                    userId: user.id,
                },
            });
            const notifications = totalCount > 0
                ? yield db_1.default.notification.findMany({
                    where: {
                        userId: user.id,
                    },
                    skip: perPage * (page - 1),
                    take: perPage,
                })
                : [];
            if (notifications.length > 0) {
                yield db_1.default.notification.updateMany({
                    where: {
                        userId: user.id,
                        readAt: null,
                    },
                    data: {
                        readAt: new Date(),
                    },
                });
            }
            return res.json({
                status: true,
                data: (0, NotificationResponse_1.NotificationResponse)(notifications),
                pagination: (0, utils_1.pagination)(totalCount, perPage, page),
            });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body.auth;
            const id = req.params.id;
            yield db_1.default.notification.deleteMany({
                where: {
                    id: id,
                    userId: user.id,
                },
            });
            return res.json({
                status: true,
                message: req.t("user.single_notification_deleted"),
            });
        });
    }
    static deleteAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body.auth;
            yield db_1.default.notification.deleteMany({
                where: {
                    userId: user.id,
                },
            });
            return res.json({
                status: true,
                message: req.t("user.notification_deleted"),
            });
        });
    }
}
exports.NotificationController = NotificationController;
