import 'reflect-metadata';

import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

import env from '@/config/environment';
import errorHandler from '@/middleware/error';
// import authRoutes from '@/routes/auth';
import rootRoutes from '@/routes/root';
// import taskRoutes from '@/routes/tasks';
import ssoRoutes from '@/routes/sso';

const app = new Koa({ env: env.NODE_ENV });

app.use(errorHandler);
app.use(bodyParser());
app.use(cors());

if (!env.isTest) app.use(logger());

/*
 * Routes
 */
app.use(rootRoutes.middleware()).use(rootRoutes.router.allowedMethods());
// app.use(taskRoutes.middleware()).use(taskRoutes.router.allowedMethods());
// app.use(authRoutes.middleware()).use(authRoutes.router.allowedMethods());
app.use(ssoRoutes.middleware()).use(ssoRoutes.router.allowedMethods());

export default app;
