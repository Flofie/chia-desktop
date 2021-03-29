"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullNode = void 0;
const RpcClient_1 = require("./RpcClient");
const defaultProtocol = 'https';
const defaultHostname = 'localhost';
const defaultPort = 8555;
class FullNode extends RpcClient_1.RpcClient {
    constructor(options) {
        super({
            protocol: (options === null || options === void 0 ? void 0 : options.protocol) || defaultProtocol,
            hostname: (options === null || options === void 0 ? void 0 : options.hostname) || defaultHostname,
            port: (options === null || options === void 0 ? void 0 : options.port) || defaultPort,
            certPath: options.certPath,
            keyPath: options.keyPath,
        });
    }
    async getBlockchainState() {
        return this.request('get_blockchain_state', {});
    }
    async getNetworkSpace(newerBlockHeaderHash, olderBlockHeaderHash) {
        return this.request('get_network_space', {
            newer_block_header_hash: newerBlockHeaderHash,
            older_block_header_hash: olderBlockHeaderHash,
        });
    }
    async getBlocks(start, end, excludeHeaderHash) {
        return this.request('get_blocks', {
            start,
            end,
            exclude_header_hash: excludeHeaderHash || false,
        });
    }
    async getBlock(headerHash) {
        return this.request('get_block', {
            header_hash: headerHash,
        });
    }
    async getBlockRecordByHeight(height) {
        return this.request('get_block_record_by_height', {
            height,
        });
    }
    async getBlockRecord(hash) {
        return this.request('get_block_record', {
            header_hash: hash,
        });
    }
    async getUnfinishedBlockHeaders(height) {
        return this.request('get_unfinished_block_headers', {
            height,
        });
    }
    async getUnspentCoins(puzzleHash, headerHash) {
        return this.request('get_unspent_coins', {
            puzzle_hash: puzzleHash,
            header_hash: headerHash,
        });
    }
    async getAdditionsAndRemovals(hash) {
        return this.request('get_additions_and_removals', {
            header_hash: hash,
        });
    }
}
exports.FullNode = FullNode;
