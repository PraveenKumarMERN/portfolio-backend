"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionHandler = void 0;
const logger_1 = require("../../providers/logger");
/**
 * 404 api redirects
 */
// export const NotFoundHandler = (req: Request, res: Response) => {
//   logger.info(`Error 404:${req.method} ${req.originalUrl} - Not Found`);
//   if (req.headers.accept === "application/json") {
//     return res.status(404).json({
//       status: false,
//       message: "Not found",
//     });
//   }
//   res.render("errors/404");
// };
/**
 * 500 request error handler
 */
const ExceptionHandler = (err, req, res, next) => {
    logger_1.logger.error(`Error 500: ${err.stack}`);
    if (req.headers.accept === "application/json") {
        return res.status(500).send({
            status: false,
            message: "Something broke!",
        });
    }
    res.render("errors/500");
};
exports.ExceptionHandler = ExceptionHandler;