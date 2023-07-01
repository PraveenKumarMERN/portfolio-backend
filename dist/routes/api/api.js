"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PingController_1 = require("../../app/http/controllers/api/PingController");
const Auth_1 = require("../../app/http/middleware/Auth");
const user_1 = __importDefault(require("./user"));
const admin_1 = __importDefault(require("./admin"));
const device_1 = __importDefault(require("./device"));
const auth_1 = __importDefault(require("./auth"));
//ROUTES IMPORT
const router = (0, express_1.Router)();
router.get("/", PingController_1.PingController.pong);
router.use("/", auth_1.default);
router.use("/user", user_1.default);
router.use("/admin", admin_1.default);
router.use("/devices", Auth_1.verifyToken, device_1.default);
// router.use("/notifications", verifyToken, NotificationRouter);
//ROUTERS USE ADD HERE
/**
 * 404 api redirects
 */
// router.use(function (req: Request, res: Response) {
//   res.status(404).send({
//     status: false,
//     message: "Not found",
//   });
// });
exports.default = router;
