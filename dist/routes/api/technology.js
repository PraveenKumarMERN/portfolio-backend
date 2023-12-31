"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const technology_1 = require("../../app/http/controllers/api/technology/technology");
const Auth_1 = require("../../app/http/middleware/Auth");
const RequestValidator_1 = require("../../app/http/middleware/RequestValidator");
const TechnologyRequest_1 = require("../../app/http/requests/TechnologyRequest");
const router = (0, express_1.Router)();
router.post("/", (0, RequestValidator_1.RequestValidator)(TechnologyRequest_1.TechnologyRequest), Auth_1.verifyToken, technology_1.TechnologyController.addTechnology);
router.get("/", technology_1.TechnologyController.index);
exports.default = router;
