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
exports.DeviceController = void 0;
const DeviceService_1 = require("../../../../services/DeviceService");
class DeviceController {
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body.auth;
            const device = yield DeviceService_1.DeviceService.devices(user.id);
            return res.send({
                status: true,
                data: device,
            });
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const validatedData = req.body.validatedData;
            const { user } = req.body.auth;
            const response = yield DeviceService_1.DeviceService.update(id, user.id, validatedData);
            if (response.count === 0) {
                return res.json({
                    status: false,
                    message: req.t("device.device_not_found"),
                });
            }
            const device = yield DeviceService_1.DeviceService.find(id, user.id);
            return res.send({
                status: true,
                data: device,
                message: req.t("device.device_updated"),
            });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body.auth;
            const id = req.params.id;
            const response = yield DeviceService_1.DeviceService.delete(id, user.id);
            if (response.count === 0) {
                return res.json({
                    status: false,
                    message: req.t("device.device_not_found"),
                });
            }
            return res.send({
                status: true,
                message: req.t("device.device_deleted"),
            });
        });
    }
}
exports.DeviceController = DeviceController;
