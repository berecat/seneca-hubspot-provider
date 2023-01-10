/// <reference types="node" />
import { Server } from 'node:http';
declare const server: Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
export default server;
