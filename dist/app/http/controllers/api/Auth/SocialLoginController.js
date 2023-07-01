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
exports.SocialLoginController = void 0;
const client_1 = require("@prisma/client");
const DeviceService_1 = require("../../../../services/DeviceService");
const SocialService_1 = require("../../../../services/SocialService");
const UserResponse_1 = require("../../../responses/UserResponse");
class SocialLoginController {
    static socialLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { auth } = req.body;
            const { socialType, deviceType, fcmToken, firstName, lastName, metaData } = req.body.validatedData;
            let email = null;
            if (socialType === client_1.SocialTypes.APPLE) {
                const appleAccountDetails = yield SocialService_1.SocialService.getAppleDetails(auth.sub);
                if (!appleAccountDetails && !auth.email) {
                    return res.status(401).send({
                        status: false,
                        message: req.t("user.apple_error"),
                    });
                }
                if (!appleAccountDetails) {
                    email = auth.email;
                    yield SocialService_1.SocialService.createAppleDetails(firstName, lastName, email, auth.sub);
                }
                else {
                    email = appleAccountDetails.email;
                }
            }
            else {
                email = auth.email;
            }
            const user = yield SocialService_1.SocialService.socialLogin(auth.sub, socialType, email, firstName, lastName);
            const device = yield DeviceService_1.DeviceService.create(user.id, deviceType, fcmToken !== null && fcmToken !== void 0 ? fcmToken : null, metaData !== null && metaData !== void 0 ? metaData : {});
            return res.send({
                status: true,
                data: (0, UserResponse_1.UserResponse)(user),
                accessToken: device.authToken,
                message: req.t("user.logged_in"),
            });
        });
    }
}
exports.SocialLoginController = SocialLoginController;
