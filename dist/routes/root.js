"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_joi_router_1 = __importDefault(require("koa-joi-router"));
const root = (0, koa_joi_router_1.default)();
root.get('/', (context) => {
    context.body = 'Hello world';
});
exports.default = root;
//# sourceMappingURL=root.js.map