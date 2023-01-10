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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const koa_joi_router_1 = __importDefault(require("koa-joi-router"));
const ormconfig_1 = require("../config/ormconfig");
const task_1 = require("../entities/task");
const common_1 = require("../schemas/common");
const schemas = __importStar(require("../schemas/task"));
const tasksRouter = (0, koa_joi_router_1.default)();
tasksRouter.prefix('/tasks');
tasksRouter.post('/', {
    validate: {
        type: 'json',
        body: schemas.createTask,
        output: {
            201: {
                body: schemas.task,
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
    const taskRepository = ormconfig_1.dataSource.getRepository(task_1.Task);
    const task = taskRepository.create(context.request.body);
    context.status = http_status_codes_1.StatusCodes.CREATED;
    context.body = await taskRepository.save(task);
});
tasksRouter.get('/', {
    validate: {
        output: {
            200: {
                body: schemas.listTask,
            },
            '400-599': {
                body: common_1.errorResponse,
            },
        },
    },
}, async (context) => {
    const taskRepository = ormconfig_1.dataSource.getRepository(task_1.Task);
    const tasks = await taskRepository.find();
    context.body = tasks;
});
tasksRouter.get('/:id', {
    validate: {
        params: {
            id: schemas.taskId,
        },
        output: {
            200: {
                body: schemas.task,
            },
        },
    },
}, async (context) => {
    const { id } = context.params;
    const taskRepository = ormconfig_1.dataSource.getRepository(task_1.Task);
    const task = await taskRepository.findOneBy({ id });
    if (!task) {
        context.throw(http_status_codes_1.StatusCodes.NOT_FOUND, `Not found any task with id: ${id}`);
    }
    context.body = task;
});
tasksRouter.put('/:id', {
    validate: {
        params: {
            id: schemas.taskId,
        },
        type: 'json',
        body: schemas.editTask,
        output: {
            200: {
                body: schemas.task,
            },
        },
        validateOptions: {
            abortEarly: false,
            stripUnknown: true,
        },
    },
}, async (context) => {
    const { id } = context.params;
    const taskRepository = ormconfig_1.dataSource.getRepository(task_1.Task);
    const task = await taskRepository.findOneBy({ id });
    if (!task) {
        context.throw(http_status_codes_1.StatusCodes.NOT_FOUND, `Not found any task with id: ${id}`);
    }
    taskRepository.merge(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    task, context.request.body);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    context.body = await taskRepository.save(task);
});
tasksRouter.delete('/:id', {
    validate: {
        params: {
            id: schemas.taskId,
        },
    },
}, async (context) => {
    const { id } = context.params;
    const taskRepository = ormconfig_1.dataSource.getRepository(task_1.Task);
    const task = await taskRepository.findOneBy({ id });
    if (!task) {
        context.throw(http_status_codes_1.StatusCodes.NOT_FOUND, `Not found any task with id: ${id}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    await taskRepository.remove(task);
    context.body = null;
});
exports.default = tasksRouter;
//# sourceMappingURL=tasks.js.map