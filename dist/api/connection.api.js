"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const chia_client_1 = require("../chia-client");
const Database_1 = require("../database/Database");
const logger_1 = require("../logger");
function init() {
    const router = express_1.default.Router();
    const logger = logger_1.makeLogger('api.connection');
    const handleError = (error, res) => {
        logger.error(error);
        res.status(400);
        switch (error === null || error === void 0 ? void 0 : error.code) {
            case 'MISSINGPROPERTIES':
                return res.send('Missing required properties');
            case 'ENOENT':
            case 'ECONNRESET':
                return res.send('Invalid credentials');
            case 'ECONNREFUSED':
                return res.send('Connection refused');
            default:
                return res.send('Connection refused');
        }
    };
    router.post('/fullNode', async (req, res) => {
        const connectionToAdd = req.body;
        if (Object.values(connectionToAdd).some((property) => !property)) {
            return handleError({ code: 'MISSINGPROPERTIES' }, res);
        }
        try {
            const fullNode = new chia_client_1.FullNode({
                hostname: connectionToAdd.host,
                port: connectionToAdd.port,
                certPath: connectionToAdd.crt,
                keyPath: connectionToAdd.key,
            });
            await fullNode.getBlockchainState();
            await Database_1.db.connection.asyncInsert({
                ...connectionToAdd,
                _id: uuid_1.v4(),
                timestamp: new Date(),
            });
            res.status(201);
            res.send();
        }
        catch (error) {
            return handleError(error, res);
        }
    });
    router.post('/wallet', async (req, res) => {
        const connectionToAdd = req.body;
        if (Object.values(connectionToAdd).some((property) => !property)) {
            return handleError({ code: 'MISSINGPROPERTIES' }, res);
        }
        try {
            const wallet = new chia_client_1.Wallet({
                hostname: connectionToAdd.host,
                port: connectionToAdd.port,
                certPath: connectionToAdd.crt,
                keyPath: connectionToAdd.key,
            });
            const x = await wallet.getHeightInfo();
            console.log('wallet height', x);
            await Database_1.db.connection.asyncInsert({
                ...connectionToAdd,
                _id: uuid_1.v4(),
                timestamp: new Date(),
            });
            res.status(201);
            res.send();
        }
        catch (error) {
            return handleError(error, res);
        }
    });
    router.post('/harvester', async (req, res) => {
        const connectionToAdd = req.body;
        if (Object.values(connectionToAdd).some((property) => !property)) {
            return handleError({ code: 'MISSINGPROPERTIES' }, res);
        }
        try {
            const harvester = new chia_client_1.Harvester({
                hostname: connectionToAdd.host,
                port: connectionToAdd.port,
                certPath: connectionToAdd.crt,
                keyPath: connectionToAdd.key,
            });
            await harvester.getPlotDirectories();
            await Database_1.db.connection.asyncInsert({
                ...connectionToAdd,
                _id: uuid_1.v4(),
                timestamp: new Date(),
            });
            res.status(201);
            res.send();
        }
        catch (error) {
            return handleError(error, res);
        }
    });
    router.post('/chiaExplorer', async (req, res) => {
        const connectionToAdd = req.body;
        if (!connectionToAdd.name ||
            !connectionToAdd.crt ||
            !connectionToAdd.key) {
            return handleError({ code: 'MISSINGPROPERTIES' }, res);
        }
        try {
            await Database_1.db.connection.asyncInsert({
                ...connectionToAdd,
                _id: uuid_1.v4(),
                timestamp: new Date(),
            });
            res.status(201);
            res.send();
        }
        catch (error) {
            return handleError(error, res);
        }
    });
    return router;
}
exports.default = init;
