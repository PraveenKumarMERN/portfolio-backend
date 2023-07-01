"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeController_1 = require("../../app/http/controllers/api/home/homeController");
const Auth_1 = require("../../app/http/middleware/Auth");
const RequestValidator_1 = require("../../app/http/middleware/RequestValidator");
const HomeRequest_1 = require("../../app/http/requests/HomeRequest");
const router = (0, express_1.Router)();
router.put("/", (0, RequestValidator_1.RequestValidator)(HomeRequest_1.HomeRequest), Auth_1.verifyToken, homeController_1.HomeController.updateHome);
router.get("/", homeController_1.HomeController.index);
exports.default = router;