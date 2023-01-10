"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = void 0;
const http_status_codes_1 = require("http-status-codes");
const koa_joi_router_1 = require("koa-joi-router");
exports.errorResponse = koa_joi_router_1.Joi.object({
    reason: koa_joi_router_1.Joi.string()
        .required()
        .example(http_status_codes_1.ReasonPhrases.BAD_REQUEST)
        .description('The generic reason why the request failed'),
    statusCode: koa_joi_router_1.Joi.number()
        .min(400)
        .max(599)
        .required()
        .example(http_status_codes_1.StatusCodes.BAD_REQUEST)
        .description('The HTTP status code of the error'),
    message: koa_joi_router_1.Joi.string()
        .required()
        .description('The error message that explains the cause of the fail'),
    details: koa_joi_router_1.Joi.object()
        .optional()
        .description('In case of a validation error, this object will show the error by field'),
})
    .strict()
    .description('Error response');
//# sourceMappingURL=common.js.map