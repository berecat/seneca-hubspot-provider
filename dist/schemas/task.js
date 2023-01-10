"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTask = exports.listTask = exports.task = exports.taskId = exports.createTask = void 0;
const koa_joi_router_1 = require("koa-joi-router");
exports.createTask = koa_joi_router_1.Joi.object({
    text: koa_joi_router_1.Joi.string()
        .min(3)
        .required()
        .example('Make a sandwich')
        .description('The thing to do'),
}).description('Add a new task');
exports.taskId = koa_joi_router_1.Joi.number()
    .integer()
    .positive()
    .required()
    .example(1)
    .description('The identifier of the task');
exports.task = koa_joi_router_1.Joi.object({
    id: exports.taskId,
    text: koa_joi_router_1.Joi.string()
        .required()
        .example('Make a sandwich')
        .description('The thing to do'),
    done: koa_joi_router_1.Joi.boolean().required().description('Is the task pending?'),
    createdAt: koa_joi_router_1.Joi.date()
        .required()
        .description('The time when the task was created'),
    updatedAt: koa_joi_router_1.Joi.date()
        .required()
        .description('The time when the task was updated'),
}).description('The task object');
exports.listTask = koa_joi_router_1.Joi.array()
    .items(exports.task)
    .required()
    .description('The list of tasks');
exports.editTask = koa_joi_router_1.Joi.object({
    text: koa_joi_router_1.Joi.string()
        .min(3)
        .example('Make a salad')
        .description('Change the action'),
    done: koa_joi_router_1.Joi.boolean().description('Is the task done?'),
}).description('Update a task');
//# sourceMappingURL=task.js.map