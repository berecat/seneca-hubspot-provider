"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("http-errors");
const http_status_codes_1 = require("http-status-codes");
const koa_joi_router_1 = require("koa-joi-router");
function isJWTError(error) {
    return error instanceof Error && 'originalError' in error;
}
const errorHandler = async (context, next) => {
    try {
        await next();
    }
    catch (error) {
        context.status = (0, http_errors_1.isHttpError)(error)
            ? error.status
            : http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        const response = {
            reason: (0, http_status_codes_1.getReasonPhrase)(context.status),
            message: error instanceof Error ? error.message : String(error),
            statusCode: context.status,
        };
        if (koa_joi_router_1.Joi.isError(error)) {
            const details = {};
            for (const { path, message } of error.details) {
                details[path.join('.')] = message;
            }
            response.details = details;
        }
        if (isJWTError(error)) {
            response.reason = error.message;
            response.message = error.originalError.message;
        }
        context.body = response;
    }
};
exports.default = errorHandler;
//# sourceMappingURL=error.js.map