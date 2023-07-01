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
exports.verifySocialLogin = void 0;
const client_1 = require("@prisma/client");
const google_auth_library_1 = require("google-auth-library");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwks_rsa_1 = require("jwks-rsa");
const env_1 = require("../../../env");
const verifySocialLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { socialType, socialToken } = req.body.validatedData;
    try {
        let auth = null;
        if (socialType === client_1.SocialTypes.GOOGLE) {
            auth = yield verifyGoogleLogin(socialToken);
        }
        else if (socialType === client_1.SocialTypes.APPLE) {
            auth = yield verifyAppleLogin(socialToken);
        }
        else {
            throw "Invalid Social Type";
        }
        req.body.auth = auth;
        next();
    }
    catch (err) {
        return res.status(401).send({
            status: false,
            message: (_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : "Invalid Token",
        });
    }
});
exports.verifySocialLogin = verifySocialLogin;
const verifyGoogleLogin = (socialToken) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new google_auth_library_1.OAuth2Client(env_1.env.oauth.google.clientId);
    const ticket = yield client.verifyIdToken({
        idToken: socialToken,
        audience: env_1.env.oauth.google.clientId,
    });
    const payload = ticket.getPayload();
    if (typeof payload === "undefined") {
        throw "Invalid Token";
    }
    return payload;
});
const verifyAppleLogin = (socialToken) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const json = jsonwebtoken_1.default.decode(socialToken, { complete: true });
    const kid = (_b = json === null || json === void 0 ? void 0 : json.header) === null || _b === void 0 ? void 0 : _b.kid;
    if (!kid) {
        throw "Invalid Token";
    }
    const client = new jwks_rsa_1.JwksClient({
        jwksUri: `https://appleid.apple.com/auth/keys`,
    });
    const appleKey = yield (yield client.getSigningKey(kid)).getPublicKey();
    if (!appleKey) {
        throw "Invalid Token";
    }
    const payload = jsonwebtoken_1.default.verify(socialToken, appleKey);
    if (!payload) {
        throw "Invalid Token";
    }
    return payload;
});
