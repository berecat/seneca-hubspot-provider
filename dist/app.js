"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const environment_1 = __importDefault(require("./config/environment"));
const error_1 = __importDefault(require("./middleware/error"));
const auth_1 = __importDefault(require("./routes/auth"));
const root_1 = __importDefault(require("./routes/root"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const app = new koa_1.default({ env: environment_1.default.NODE_ENV });
app.use(error_1.default);
app.use((0, koa_bodyparser_1.default)());
if (!environment_1.default.isTest)
    app.use((0, koa_logger_1.default)());
/*
 * Routes
 */
app.use(root_1.default.middleware()).use(root_1.default.router.allowedMethods());
app.use(tasks_1.default.middleware()).use(tasks_1.default.router.allowedMethods());
app.use(auth_1.default.middleware()).use(auth_1.default.router.allowedMethods());
exports.default = app;
//# sourceMappingURL=app.js.map