"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const RpcClient_1 = require("./RpcClient");
const defaultProtocol = 'https';
const defaultHostname = 'localhost';
const defaultPort = 8555;
const host = 'https://backup.chia.net';
class Wallet extends RpcClient_1.RpcClient {
    constructor(options) {
        super({
            protocol: (options === null || options === void 0 ? void 0 : options.protocol) || defaultProtocol,
            hostname: (options === null || options === void 0 ? void 0 : options.hostname) || defaultHostname,
            port: (options === null || options === void 0 ? void 0 : options.port) || defaultPort,
            certPath: options.certPath,
            keyPath: options.keyPath,
        });
    }
    async logIn(fingerprint) {
        return this.request('log_in', {
            host,
            fingerprint,
            type: 'start',
        });
    }
    async logInAndRestore(fingerprint, filePath) {
        return this.request('log_in', {
            host,
            fingerprint,
            type: 'restore_backup',
            file_path: filePath,
        });
    }
    async logInAndSkip(fingerprint) {
        return this.request('log_in', {
            host,
            fingerprint,
            type: 'skip',
        });
    }
    async getPublicKeys() {
        const response = await this.request('get_public_keys', {});
        const { public_key_fingerprints } = response;
        return public_key_fingerprints;
    }
    async getPrivateKey(fingerprint) {
        const { private_key } = await this.request('get_private_key', { fingerprint });
        return private_key;
    }
    async generateMnemonic() {
        const { mnemonic } = await this.request('generate_mnemonic', {});
        return mnemonic;
    }
    async addKey(mnemonic, type = 'new_wallet') {
        return this.request('add_key', {
            mnemonic,
            type,
        });
    }
    async deleteKey(fingerprint) {
        return this.request('delete_key', { fingerprint });
    }
    async deleteAllKeys() {
        return this.request('delete_all_keys', {});
    }
    async getSyncStatus() {
        const { syncing } = await this.request('get_sync_status', {});
        return syncing;
    }
    async getHeightInfo() {
        const { height } = await this.request('get_height_info', {});
        return height;
    }
    async farmBlock(address) {
        return this.request('farm_block', { address });
    }
    async getWallets() {
        const { wallets } = await this.request('get_wallets', {});
        return wallets;
    }
    async getWalletBalance(walletId) {
        const { wallet_balance } = await this.request('get_wallet_balance', { wallet_id: walletId });
        return wallet_balance;
    }
    async getTransaction(walletId, transactionId) {
        const { transaction } = await this.request('get_transaction', {
            wallet_id: walletId,
            transaction_id: transactionId,
        });
        return transaction;
    }
    async getTransactions(walletId) {
        const { transactions } = await this.request('get_transactions', { wallet_id: walletId });
        return transactions;
    }
    async getNextAddress(walletId) {
        const { address } = await this.request('get_next_address', { wallet_id: walletId });
        return address;
    }
    async sendTransaction(walletId, amount, address, fee) {
        const { transaction } = await this.request('send_transaction', {
            wallet_id: walletId,
            amount,
            address,
            fee,
        });
        return transaction;
    }
    async createBackup(filePath) {
        return this.request('create_backup', { file_path: filePath });
    }
}
exports.Wallet = Wallet;
