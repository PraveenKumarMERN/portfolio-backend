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
exports.paginationCleaner = void 0;
const env_1 = require("../../../env");
const env_2 = require("../../../libs/env");
const paginationCleaner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let page = ((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
    let perPage = ((_b = req.query) === null || _b === void 0 ? void 0 : _b.per_page) || env_1.env.app.pagination_limit;
    if (typeof page !== "string" && typeof page !== "number") {
        page = 1;
    }
    if (typeof perPage !== "string" && typeof perPage !== "number") {
        perPage = env_1.env.app.pagination_limit;
    }
    if (typeof page === "string") {
        page = (0, env_2.toNumber)(page);
    }
    if (typeof perPage === "string") {
        perPage = (0, env_2.toNumber)(perPage);
    }
    if (page <= 0) {
        page = 1;
    }
    if (perPage <= 0) {
        perPage = env_1.env.app.pagination_limit;
    }
    req.body.pagination = {
        page: page,
        perPage: perPage,
    };
    next();
});
exports.paginationCleaner = paginationCleaner;
