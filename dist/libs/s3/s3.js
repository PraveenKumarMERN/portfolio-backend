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
exports.S3 = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const env_1 = require("../../env");
class S3 {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    static getSignedUrl(key, ContentType) {
        return __awaiter(this, void 0, void 0, function* () {
            aws_sdk_1.default.config.update({
                accessKeyId: env_1.env.aws.accessKey,
                secretAccessKey: env_1.env.aws.secretAccessKey,
            });
            const s3 = new aws_sdk_1.default.S3({
                signatureVersion: "v4",
                region: env_1.env.aws.region,
            });
            const url = yield s3.getSignedUrl("putObject", {
                Bucket: env_1.env.aws.bucket,
                Key: key,
                Expires: Number(1000),
                ContentType: ContentType,
                ACL: "public-read",
            });
            return {
                key: ` https://${env_1.env.aws.bucket}.s3.${env_1.env.aws.region}.amazonaws.com/${key}`,
                url: url,
            };
        });
    }
}
exports.S3 = S3;
