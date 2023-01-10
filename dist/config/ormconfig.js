"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const environment_1 = __importDefault(require("./environment"));
const task_1 = require("../entities/task");
const user_1 = require("../entities/user");
const options = {
    type: 'sqlite',
    database: environment_1.default.isTest ? ':memory:' : 'database.sqlite',
    synchronize: true,
    entities: [task_1.Task, user_1.User],
};
exports.dataSource = new typeorm_1.DataSource(options);
//# sourceMappingURL=ormconfig.js.map