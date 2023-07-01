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
exports.UploadSingleFile = void 0;
const multer_1 = __importDefault(require("multer"));
const utils_1 = require("../../../utils/utils");
const UploadSingleFile = (type, name) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    configuredMulter(type).single(name)(req, res, (error) => {
        if (error) {
            return res.send({
                status: false,
                message: (error === null || error === void 0 ? void 0 : error.message) || "Something went wrong while uploading asset",
            });
        }
        next();
    });
});
exports.UploadSingleFile = UploadSingleFile;
/**
 * a configured multer instance
 * @param type
 * @returns
 */
const configuredMulter = (type) => {
    return (0, multer_1.default)({
        dest: utils_1.STORAGE_PATH,
        limits: {
            fileSize: 1024 * 1024 * 5,
        },
        fileFilter: function (req, file, cb) {
            const availableTypes = (0, utils_1.validFileTypes)(type);
            if (!availableTypes.includes(file.mimetype)) {
                //if the file type does not match the allowed types, then return false
                cb(new Error(`Invalid file type.Please upload any of these types : ${availableTypes.concat()}`));
            }
            cb(null, true);
        },
    });
};
