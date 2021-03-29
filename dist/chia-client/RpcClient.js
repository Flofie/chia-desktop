"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcClient = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const https_1 = require("https");
class RpcClient {
    constructor(options) {
        this.protocol = options.protocol;
        this.hostname = options.hostname;
        this.port = options.port;
        this.agent = new https_1.Agent({
            cert: options.certPath.startsWith('-----BEGIN CERTIFICATE-----')
                ? options.certPath
                : fs_1.readFileSync(options.certPath),
            key: options.keyPath.startsWith('-----BEGIN RSA PRIVATE KEY-----')
                ? options.keyPath
                : fs_1.readFileSync(options.keyPath),
        });
    }
    baseUri() {
        return `${this.protocol}://${this.hostname}:${this.port}`;
    }
    async request(route, body) {
        // Should not be doing this: Temporary hack to get chiaexplorer up and running quickly
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
        const { data } = await axios_1.default.post(`${this.baseUri()}/${route}`, body, {
            httpsAgent: this.agent,
        });
        return data;
    }
}
exports.RpcClient = RpcClient;
