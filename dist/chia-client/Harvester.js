"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Harvester = void 0;
const RpcClient_1 = require("./RpcClient");
const defaultProtocol = 'https';
const defaultHostname = 'localhost';
const defaultPort = 8560;
class Harvester extends RpcClient_1.RpcClient {
    constructor(options) {
        super({
            protocol: (options === null || options === void 0 ? void 0 : options.protocol) || defaultProtocol,
            hostname: (options === null || options === void 0 ? void 0 : options.hostname) || defaultHostname,
            port: (options === null || options === void 0 ? void 0 : options.port) || defaultPort,
            certPath: options.certPath,
            keyPath: options.keyPath,
        });
    }
    async getPlots() {
        return this.request('get_plots', {});
    }
    async refreshPlots() {
        return this.request('refresh_plots', {});
    }
    async deletePlot(filename) {
        return this.request('delete_plot', { filename });
    }
    async addPlotDirectory(dirname) {
        return this.request('add_plot_directory', { dirname });
    }
    async getPlotDirectories() {
        return this.request('get_plot_directories', {});
    }
    async removePlotDirectory(dirname) {
        return this.request('remove_plot_directory', { dirname });
    }
}
exports.Harvester = Harvester;
