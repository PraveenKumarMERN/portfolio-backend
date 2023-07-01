"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino_1 = require("pino");
const env_1 = require("../../env");
const levels = {
    debug: 10,
    notice: 30,
    info: 20,
    error: 50,
};
const streams = () => {
    const storageStreams = Object.keys(levels).map((level) => {
        return {
            level: level,
            stream: pino_1.pino.destination(`${env_1.env.app.root_dir}/storage/logs/app-${level}.log`),
        };
    });
    const consoleStreams = Object.keys(levels).map((level) => {
        return {
            level: level,
            stream: process.stdout,
        };
    });
    return [...storageStreams, ...consoleStreams];
};
exports.logger = (0, pino_1.pino)({
    level: process.env.PINO_LOG_LEVEL || "info",
    customLevels: levels,
    useOnlyCustomLevels: true,
    formatters: {
        level: (label) => {
            return { level: label };
        },
    },
}, pino_1.pino.multistream(streams(), {
    levels,
    dedupe: true,
}));
