"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PingController_1 = require("../../app/http/controllers/api/PingController");
const Auth_1 = require("../../app/http/middleware/Auth");
const device_1 = __importDefault(require("./device"));
const notification_1 = __importDefault(require("./notification"));
const auth_1 = __importDefault(require("./auth"));
const home_1 = __importDefault(require("./home"));
const skills_1 = __importDefault(require("./skills"));
const technology_1 = __importDefault(require("./technology"));
//ROUTES IMPORT
const router = (0, express_1.Router)();
router.get("/", PingController_1.PingController.pong);
router.use("/", auth_1.default);
router.use("/home", home_1.default);
router.use("/technology", technology_1.default);
router.use("/skills", skills_1.default);
router.use("/devices", Auth_1.verifyToken, device_1.default);
router.use("/notifications", Auth_1.verifyToken, notification_1.default);
//ROUTERS USE ADD HERE
exports.default = router;
