"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChiaExplorerService = void 0;
const axios_1 = __importDefault(require("axios"));
const Database_1 = require("../../database/Database");
const logger_1 = require("../../logger");
const baseService_1 = require("../baseService/baseService");
class ChiaExplorerService extends baseService_1.BaseService {
    constructor() {
        super(...arguments);
        this.logger = logger_1.makeLogger('domain.ChiaExplorerService');
    }
    // constructor(connection) {
    //   super({ type: 'chiaExplorer', _id: 'chiaExplorer' } as Connection);
    // }
    async fetchNewInfos() {
        this.logger.debug('fetchNewInfos');
        // this.logger.debug('checking wallet');
        // if ((await this.hasWallet()) === false) {
        //   this.logger.debug('no wallet connection configured');
        //   return;
        // }
        // this.logger.debug('has wallet');
        // const walletConnection = await this.getWalletConnection();
        // this.logger.debug('got wallet connection', walletConnection);
        // const walletService = new WalletService(walletConnection);
        // this.logger.debug('get public keys');
        // const publicKeys = await walletService.getPublicKeys();
        // this.logger.debug('got public keys', publicKeys);
        this.logger.debug('query chiaexplorer');
        const topFarmersResult = await axios_1.default.get('https://api2.chiaexplorer.com/topFarmers');
        // this.logger.debug('query result', topFarmersResult);
        // const rankedTopFarmers = rankTopFarmer(topFarmersResult.data);
        const rankedTopFarmers = topFarmersResult.data;
        // this.logger.debug('rankedTopFarmers', rankedTopFarmers);
        const myRank = rankedTopFarmers === null || rankedTopFarmers === void 0 ? void 0 : rankedTopFarmers.topFarmers.find((farmer) => farmer.address === this.connection.crt);
        this.logger.debug('myRank', myRank);
        if (!myRank) {
            return { rank: -1 };
        }
        return { rank: myRank.rank, blocks_won: myRank.blocks_won };
    }
    async hasWallet() {
        return (await Database_1.db.connection.asyncCount({ type: 'wallet' })) > 0;
    }
    async getWalletConnection() {
        this.logger.debug('getWalletConnection');
        return Database_1.db.connection.asyncFindOne({ type: 'wallet' });
    }
}
exports.ChiaExplorerService = ChiaExplorerService;
