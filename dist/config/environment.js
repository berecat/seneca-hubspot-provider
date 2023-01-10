"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_process_1 = __importDefault(require("node:process"));
const envalid_1 = require("envalid");
const environment = (0, envalid_1.cleanEnv)(node_process_1.default.env, {
    NODE_ENV: (0, envalid_1.str)({
        choices: ['development', 'production', 'test'],
        default: 'development',
    }),
    PORT: (0, envalid_1.port)({ default: 3000 }),
    SECRET: (0, envalid_1.str)({
        example: 'must-be-a-very-long-string-at-least-32-chars',
        desc: 'The secret to sign the JSON Web Tokens',
        default: 'frisbee-triumph-entail-janitor-impale',
    }),
});
exports.default = environment;
//# sourceMappingURL=environment.js.map