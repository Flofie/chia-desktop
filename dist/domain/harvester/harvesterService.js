"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HarvesterService = void 0;
const chia_client_1 = require("../../chia-client");
const logger_1 = require("../../logger");
const baseService_1 = require("../baseService/baseService");
class HarvesterService extends baseService_1.BaseService {
    constructor() {
        super(...arguments);
        this.logger = logger_1.makeLogger('domain.HarvesterService');
    }
    async fetchNewInfos() {
        this.logger.debug('fetchNewInfos');
        const harvesterClient = new chia_client_1.Harvester({
            hostname: this.connection.host,
            port: this.connection.port,
            certPath: this.connection.crt,
            keyPath: this.connection.key,
        });
        return harvesterClient.getPlots();
    }
}
exports.HarvesterService = HarvesterService;
