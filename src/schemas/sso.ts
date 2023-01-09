import { Joi } from 'koa-joi-router';

export const sso = Joi.string();

export type LoginUser = {
  email: string;
};
