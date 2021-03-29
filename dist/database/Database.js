"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
// import nedb from 'nedb';
const nedb_async_1 = __importDefault(require("nedb-async"));
const path = require('path');
exports.db = {
    connection: new nedb_async_1.default({
        filename: path.join(__dirname, 'connection.db'),
        autoload: true,
    }),
    harvester: new nedb_async_1.default({
        filename: path.join(__dirname, 'harvester.db'),
        autoload: true,
    }),
    fullNode: new nedb_async_1.default({
        filename: path.join(__dirname, 'fullNode.db'),
        autoload: true,
    }),
    wallet: new nedb_async_1.default({
        filename: path.join(__dirname, 'wallet.db'),
        autoload: true,
    }),
    chiaExplorer: new nedb_async_1.default({
        filename: path.join(__dirname, 'chiaExplorer.db'),
        autoload: true,
    }),
};
