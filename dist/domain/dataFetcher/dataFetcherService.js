"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFetcherService = void 0;
const Database_1 = require("../../database/Database");
const logger_1 = require("../../logger");
const chiaExplorerService_1 = require("../chiaExplorer/chiaExplorerService");
const fullNodeService_1 = require("../fullNode/fullNodeService");
const harvesterService_1 = require("../harvester/harvesterService");
const walletDifferFct_1 = require("../wallet/walletDifferFct");
const walletService_1 = require("../wallet/walletService");
class DataFetcherService {
    constructor() {
        this.logger = logger_1.makeLogger('domain.DataFetcherService');
    }
    async fetchNewData() {
        this.logger.debug('fetchNewDate');
        const connections = await Database_1.db.connection.asyncFind({});
        this.logger.debug('got connections', connections);
        for (const connection of connections) {
            switch (connection.type) {
                case 'fullNode':
                    try {
                        const fullNodeService = new fullNodeService_1.FullNodeService(connection);
                        await fullNodeService.updateRecord();
                    }
                    catch (error) {
                        this.logger.error(error);
                        continue;
                    }
                    break;
                case 'wallet':
                    try {
                        const walletService = new walletService_1.WalletService(connection);
                        await walletService.updateRecordWithHistory(walletDifferFct_1.walletDifferFct);
                    }
                    catch (error) {
                        this.logger.error(error);
                        continue;
                    }
                    break;
                case 'harvester':
                    try {
                        const harvesterService = new harvesterService_1.HarvesterService(connection);
                        await harvesterService.updateRecordWithHistory((a, b) => (a === null || a === void 0 ? void 0 : a.plotCount) !== (b === null || b === void 0 ? void 0 : b.plotCount));
                    }
                    catch (error) {
                        this.logger.error(error);
                        continue;
                    }
                    break;
                case 'chiaExplorer':
                    try {
                        const chiaExplorerService = new chiaExplorerService_1.ChiaExplorerService(connection);
                        await chiaExplorerService.updateRecordWithHistory((a, b) => (a === null || a === void 0 ? void 0 : a.rank) !== -1 && (a === null || a === void 0 ? void 0 : a.rank) !== (b === null || b === void 0 ? void 0 : b.rank));
                        break;
                    }
                    catch (error) {
                        this.logger.error(error);
                        continue;
                    }
                default:
                    this.logger.error(`unknown type ${connection.type}`);
            }
        }
    }
}
exports.DataFetcherService = DataFetcherService;
