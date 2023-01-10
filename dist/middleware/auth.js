"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const koa_jwt_1 = __importDefault(require("koa-jwt"));
const environment_1 = __importDefault(require("../config/environment"));
const ormconfig_1 = require("../config/ormconfig");
const user_1 = require("../entities/user");
function generateToken(user) {
    return (0, jsonwebtoken_1.sign)({
        sub: user.id,
    }, environment_1.default.SECRET, { expiresIn: '1d', algorithm: 'HS384' });
}
exports.generateToken = generateToken;
exports.default = (0, koa_jwt_1.default)({
    secret: environment_1.default.SECRET,
    algorithms: ['HS384'],
    isRevoked: async (_, payload) => {
        const userRepository = ormconfig_1.dataSource.getRepository(user_1.User);
        const user = await userRepository.findOneBy({ id: Number(payload.sub) });
        return !Boolean(user);
    },
});
//# sourceMappingURL=auth.js.map