"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const lodash_1 = require("lodash");
const chia_client_1 = require("../../chia-client");
const logger_1 = require("../../logger");
const baseService_1 = require("../baseService/baseService");
class WalletService extends baseService_1.BaseService {
    constructor() {
        super(...arguments);
        this.logger = logger_1.makeLogger('domain.WalletService');
        // async getPublicKeys(): Promise<string[]> {
        //   this.logger.debug('getPublicKeys');
        //   const walletClient = new Wallet({
        //     hostname: this.connection.host,
        //     port: this.connection.port,
        //     certPath: this.connection.crt,
        //     keyPath: this.connection.key,
        //   });
        //   const publicKeys = await walletClient.getPublicKeys();
        //   return publicKeys;
        // }
    }
    async fetchNewInfos() {
        this.logger.debug('fetchNewInfos');
        const walletClient = new chia_client_1.Wallet({
            hostname: this.connection.host,
            port: this.connection.port,
            certPath: this.connection.crt,
            keyPath: this.connection.key,
        });
        this.logger.debug('getWallets');
        const wallets = await walletClient.getWallets();
        this.logger.debug('got wallets', wallets);
        this.logger.debug('getHeightInfo');
        const height = await walletClient.getHeightInfo();
        this.logger.debug('got getHeightInfo', height);
        const extendedWallets = await Promise.all(wallets.map(async (wallet) => {
            const balance = await walletClient.getWalletBalance(wallet.id);
            this.logger.debug('got balance', balance);
            return { ...wallet, balance, height };
        }));
        this.logger.debug('exntendedWallets', extendedWallets);
        return lodash_1.keyBy(extendedWallets, 'id');
    }
}
exports.WalletService = WalletService;
