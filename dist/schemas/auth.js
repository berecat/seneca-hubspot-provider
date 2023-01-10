"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.withAuthenticationHeader = exports.authResponse = exports.user = exports.loginUser = exports.registerUser = void 0;
const koa_joi_router_1 = require("koa-joi-router");
const email = koa_joi_router_1.Joi.string()
    .email()
    .lowercase()
    .required()
    .description('The email of the user')
    .example('john@doe.me');
const name = koa_joi_router_1.Joi.string()
    .required()
    .description('The name of the user')
    .example('John Doe');
const password = koa_joi_router_1.Joi.string()
    .min(12)
    .max(32)
    .required()
    .description('The password of the user');
exports.registerUser = koa_joi_router_1.Joi.object({
    name,
    email,
    password,
}).description('Register a new user');
exports.loginUser = koa_joi_router_1.Joi.object({
    email,
    password,
}).description('Login with existing user');
exports.user = koa_joi_router_1.Joi.object({
    id: koa_joi_router_1.Joi.number()
        .integer()
        .positive()
        .required()
        .description('The identifier of the user')
        .example(1),
    name,
    email,
})
    .options({ stripUnknown: true })
    .description('The user object');
exports.authResponse = koa_joi_router_1.Joi.object({
    token: koa_joi_router_1.Joi.string()
        .required()
        .description('The JSON Web Token necessary to authenticate the user'),
    user: exports.user,
}).description("The JWT and the user's information");
exports.withAuthenticationHeader = koa_joi_router_1.Joi.object({
    authorization: koa_joi_router_1.Joi.string()
        .regex(/Bearer .+/)
        .required()
        .label('Bearer Token')
        .description('Bearer token that needs to be a JSON Web Token'),
}).options({ allowUnknown: true });
exports.updateUser = koa_joi_router_1.Joi.object({
    name,
    password,
    newPassword: password
        .optional()
        .not(koa_joi_router_1.Joi.ref('password'))
        .label('new password')
        .description('The new password of the user'),
})
    .with('newPassword', 'password')
    .when('.newPassword', {
    is: koa_joi_router_1.Joi.exist(),
    then: koa_joi_router_1.Joi.object({ name: koa_joi_router_1.Joi.optional(), password: koa_joi_router_1.Joi.required() }),
    otherwise: koa_joi_router_1.Joi.object({ name: koa_joi_router_1.Joi.required(), password: koa_joi_router_1.Joi.forbidden() }),
})
    .when('.password', {
    is: koa_joi_router_1.Joi.exist(),
    then: koa_joi_router_1.Joi.object({ name: koa_joi_router_1.Joi.optional() }),
})
    .description("Update user's information");
//# sourceMappingURL=auth.js.map