"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionHandler = exports.NotFoundHandler = void 0;
// import { logger } from "../../providers/logger";
/**
 * 404 api redirects
 */
const NotFoundHandler = (req, res) => {
    console.info(`Error 404:${req.method} ${req.originalUrl} - Not Found`);
    if (req.headers.accept === "application/json") {
        return res.status(404).json({
            status: false,
            message: "Not found",
        });
    }
    res.render("errors/404");
};
exports.NotFoundHandler = NotFoundHandler;
/**
 * 500 request error handler
 */
const ExceptionHandler = (err, req, res, next) => {
    console.error(`Error 500: ${err.stack}`);
    if (req.headers.accept === "application/json") {
        return res.status(500).send({
            status: false,
            message: "Something broke!",
        });
    }
    res.render("errors/500");
};
exports.ExceptionHandler = ExceptionHandler;
