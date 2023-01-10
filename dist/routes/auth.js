"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const koa_joi_router_1 = __importStar(require("koa-joi-router"));
const ormconfig_1 = require("../config/ormconfig");
const user_1 = require("../entities/user");
const auth_1 = __importStar(require("../middleware/auth"));
const schemas = __importStar(require("../schemas/auth"));
const common_1 = require("../schemas/common");
const authRouter = (0, koa_joi_router_1.default)();
authRouter.prefix('/auth');
authRouter.post('/register', {
    validate: {
        body: schemas.registerUser,
        type: 'json',
        output: {
            201: {
                body: schemas.authResponse,
            },
            '400-599': {
                body: common_1.errorResponse,
            },
        },
        validateOptions: {
            abortEarly: false,
            stripUnknown: true,
        },
    },
}, async (context) => {
    const userRepository = ormconfig_1.dataSource.getRepository(user_1.User);
    const user = userRepository.create(context.request.body);
    const countUsers = await userRepository.count({
        where: { email: user.email },
    });
    if (countUsers > 0) {
        context.throw(http_status_codes_1.StatusCodes.CONFLICT, `The email ${user.email} is already register`);
    }
    await userRepository.save(user);
    const token = (0, auth_1.generateToken)(user);
    context.status = http_status_codes_1.StatusCodes.CREATED;
    context.body = { user, token };
});
authRouter.post('/login', {
    validate: {
        body: schemas.loginUser,
        type: 'json',
        output: {
            200: {
                body: schemas.authResponse,
            },
            '400-599': {
                body: common_1.errorResponse,
            },
        },
        validateOptions: {
            abortEarly: false,
            stripUnknown: true,
        },
    },
}, async (context) => {
    const { email, password } = context.request.body;
    const userRepository = ormconfig_1.dataSource.getRepository(user_1.User);
    const user = await userRepository.findOneBy({ email });
    if (!user) {
        context.throw(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Wrong email address for the user');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!user.checkPassword(password)) {
        context.throw(http_status_codes_1.StatusCodes.UNAUTHORIZED, 'Wrong password for the user');
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const token = (0, auth_1.generateToken)(user);
    context.body = { user, token };
});
authRouter.get('/me', {
    validate: {
        failure: http_status_codes_1.StatusCodes.UNAUTHORIZED,
        header: schemas.withAuthenticationHeader,
        output: {
            200: {
                body: schemas.user,
            },
            '400-599': {
                body: common_1.errorResponse,
            },
        },
    },
}, auth_1.default, async (context) => {
    const userRepository = ormconfig_1.dataSource.getRepository(user_1.User);
    const user = await userRepository.findOneBy({ id: context.state.user.sub });
    context.body = user;
});
authRouter.put('/me', {
    validate: {
        header: schemas.withAuthenticationHeader,
        body: schemas.updateUser,
        type: 'json',
        output: {
            200: {
                body: schemas.user,
            },
            '400-599': {
                body: common_1.errorResponse,
            },
        },
        validateOptions: {
            abortEarly: false,
            stripUnknown: true,
        },
    },
}, auth_1.default, async (context) => {
    const { newPassword, password } = context.request
        .body;
    const userRepository = ormconfig_1.dataSource.getRepository(user_1.User);
    const user = await userRepository.findOneBy({ id: context.state.user.sub });
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    if (newPassword && !user.checkPassword(password)) {
        context.throw(http_status_codes_1.StatusCodes.BAD_REQUEST, 
        // hack the validation: koi-joi-router do not support `validateAsync`, so the error has to be thrown manually
        new koa_joi_router_1.Joi.ValidationError('"password" is wrong', [
            {
                path: ['password'],
                message: '"password" is wrong',
                type: 'wrong_password',
            },
        ], null));
    }
    userRepository.merge(user, context.request.body);
    await userRepository.save(user);
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
    context.body = user;
});
authRouter.delete('/me', {
    validate: {
        header: schemas.withAuthenticationHeader,
        failure: http_status_codes_1.StatusCodes.UNAUTHORIZED,
        output: {
            '400-599': {
                body: common_1.errorResponse,
            },
        },
    },
}, auth_1.default, async (context) => {
    const userRepository = ormconfig_1.dataSource.getRepository(user_1.User);
    const user = await userRepository.findOneBy({ id: context.state.user.sub });
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await userRepository.remove(user);
    context.status = http_status_codes_1.StatusCodes.NO_CONTENT;
    context.body = null;
});
exports.default = authRouter;
//# sourceMappingURL=auth.js.map