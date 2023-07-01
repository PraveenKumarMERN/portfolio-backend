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
exports.RequestSortValidator = exports.RequestQueryValidator = exports.RequestValidator = void 0;
const fs_1 = require("fs");
const yup_1 = require("yup");
/**
 * Validate that a resource being POSTed or PUT
 * has a valid shape, else return 400 Bad Request
 * @param {*} resourceSchema is a yup schema
 */
const RequestValidator = (resourceSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const value = yield resourceSchema.validateSync(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });
        req.body.validatedData = value;
        next();
    }
    catch (error) {
        if (req.file) {
            (0, fs_1.unlinkSync)(req.file.path);
        }
        const response = {
            status: false,
            message: `Errors: ${error.errors}`,
        };
        res.status(400).json(response);
    }
});
exports.RequestValidator = RequestValidator;
/**
 *
 * Validate that a query string and throw error if it is not valid
 * @param resourceSchema
 * @returns
 */
const RequestQueryValidator = (resourceSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // throws an error if not valid
    try {
        const value = yield resourceSchema.validateSync(req.query, {
            abortEarly: false,
            stripUnknown: true,
        });
        req.body.validatedQueryData = value;
        next();
    }
    catch (error) {
        const response = {
            status: false,
            message: `Errors: ${error.errors}`,
        };
        res.status(400).json(response);
    }
});
exports.RequestQueryValidator = RequestQueryValidator;
/**
 * Validates query params for sort
 * @param names
 * @returns
 */
const RequestSortValidator = (names) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resourceSchema = (0, yup_1.object)({
            sortBy: (0, yup_1.string)().oneOf(names).optional(),
            sortType: (0, yup_1.string)().oneOf(["asc", "desc"]).optional(),
        });
        const value = resourceSchema.validateSync(req.query, {
            abortEarly: false,
            stripUnknown: true,
        });
        if (value.sortType === undefined) {
            value.sortType = "asc";
        }
        req.body.validatedSortData = value;
        next();
    }
    catch (error) {
        const response = {
            status: false,
            message: `Errors: ${error.errors}`,
        };
        res.status(400).json(response);
    }
});
exports.RequestSortValidator = RequestSortValidator;
