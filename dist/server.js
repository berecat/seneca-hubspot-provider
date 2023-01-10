"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const http_graceful_shutdown_1 = __importDefault(require("http-graceful-shutdown"));
const app_1 = __importDefault(require("./app"));
const environment_1 = __importDefault(require("./config/environment"));
const ormconfig_1 = require("./config/ormconfig");
const server = (0, node_http_1.createServer)(app_1.default.callback());
void (async (server) => {
    try {
        await ormconfig_1.dataSource.initialize();
        server.listen(environment_1.default.PORT, () => {
            console.info(`Listening at http://localhost:${environment_1.default.PORT}`);
            console.log('Press Ctrl-C to shutdown');
        });
        (0, http_graceful_shutdown_1.default)(server, {
            development: environment_1.default.isDevelopment,
            onShutdown: async () => {
                await ormconfig_1.dataSource.destroy();
            },
            finally: () => {
                console.info('Server graceful shut down completed.');
            },
        });
    }
    catch (error) {
        console.error('Unable to run the server because of the following error:');
        console.error(error);
        process.exitCode = 1;
    }
})(server);
exports.default = server;
//# sourceMappingURL=server.js.map