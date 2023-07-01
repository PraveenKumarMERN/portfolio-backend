"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locale = void 0;
const i18next_1 = __importDefault(require("i18next"));
const i18next_http_middleware_1 = __importDefault(require("i18next-http-middleware"));
const i18next_fs_backend_1 = __importDefault(require("i18next-fs-backend"));
const env_1 = require("../../env");
class Locale {
    initializeLocales() {
        i18next_1.default
            .use(i18next_http_middleware_1.default.LanguageDetector)
            .use(i18next_fs_backend_1.default)
            .init({
            preload: ["en"],
            supportedLngs: ["en"],
            lng: "en",
            saveMissing: true,
            nonExplicitSupportedLngs: false,
            // debug: env.node !== "production" ? true : false,
            backend: {
                loadPath: env_1.env.app.root_dir + "/locales/{{lng}}/{{ns}}.json",
                addPath: env_1.env.app.root_dir + "/locales/{{lng}}/{{ns}}.missing.json",
            },
            fallbackLng: "en",
        });
        return {
            i18next: i18next_1.default,
            middleware: i18next_http_middleware_1.default,
        };
    }
}
exports.Locale = Locale;
