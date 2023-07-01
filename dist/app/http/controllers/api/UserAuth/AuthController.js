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
exports.AuthController = void 0;
const DeviceService_1 = require("../../../../services/DeviceService");
const LoginService_1 = require("../../../../services/LoginService");
const UserResponse_1 = require("../../../responses/UserResponse");
const client_1 = require("@prisma/client");
class AuthController {
    // public static async signUp(req: Request, res: Response) {
    //   const validatedData = req.body;
    //   const userExists = await SignUpService.checkIfUserExists(
    //     validatedData.email
    //   );
    //   if (userExists) {
    //     return res.status(400).send({
    //       status: false,
    //       message: req.t("user.user_already_exists"),
    //     });
    //   }
    //   const user = await SignUpService.signUp(validatedData);
    //   const { deviceType, fcmToken, metaData } = validatedData;
    //   const device = await DeviceService.create(
    //     user.id,
    //     deviceType,
    //     fcmToken ?? null,
    //     metaData ?? {},
    //     user.
    //   );
    //   return res.send({
    //     status: true,
    //     data: UserResponse(user),
    //     accessToken: device.authToken,
    //     message: req.t("user.user_created"),
    //   });
    // }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, deviceType, fcmToken, metaData } = req.body.validatedData;
            const user = yield LoginService_1.LoginService.login(email, password, client_1.USER_TYPE.USER);
            if (user === null) {
                return res.status(400).json({
                    status: false,
                    message: req.t("user.wrong_email_or_password"),
                });
            }
            const device = yield DeviceService_1.DeviceService.create(user.id, deviceType, client_1.USER_TYPE.USER, fcmToken !== null && fcmToken !== void 0 ? fcmToken : null, metaData !== null && metaData !== void 0 ? metaData : {});
            return res.json({
                status: true,
                data: (0, UserResponse_1.UserResponse)(user),
                accessToken: device.authToken,
                message: req.t("user.logged_in"),
            });
        });
    }
    static profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user } = req.body.auth;
            if (user === null) {
                return res.status(401).json({
                    status: false,
                    message: req.t("user.user_not_found"),
                });
            }
            return res.json({
                status: true,
                data: (0, UserResponse_1.UserResponse)(user),
            });
        });
    }
    static logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { device, user } = req.body.auth;
            DeviceService_1.DeviceService.delete(device.id, user.id);
            return res.json({
                status: true,
                message: req.t("user.logged_out"),
            });
        });
    }
}
exports.AuthController = AuthController;
