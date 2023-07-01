"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const env_1 = require("../../env");
const options = {
    host: env_1.env.mail.host,
    port: env_1.env.mail.port,
    secure: env_1.env.mail.port === 465 ? true : false,
    auth: {
        user: env_1.env.mail.username,
        pass: env_1.env.mail.password,
    },
};
const transporter = nodemailer_1.default.createTransport(options);
transporter.use("compile", (0, nodemailer_express_handlebars_1.default)({
    viewPath: "src/views/email",
    extName: ".hbs",
    viewEngine: {
        extname: ".hbs",
        layoutsDir: "src/views/email/",
        defaultLayout: "layout",
        partialsDir: "src/views/email/", // location of your subtemplates aka. header, footer etc
    },
}));
exports.default = transporter;
