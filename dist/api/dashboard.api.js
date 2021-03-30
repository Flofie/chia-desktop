"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Database_1 = require("../database/Database");
const logger_1 = require("../logger");
function init() {
    const router = express_1.default.Router();
    const logger = logger_1.makeLogger('api.dashboard');
    router.get('/', async (req, res) => {
        var _a, _b, _c, _d, _e;
        logger.debug('get dashboard');
        logger.debug('try to get connections');
        const connections = await Database_1.db.connection.asyncFind({});
        logger.debug('got connections', connections);
        const result = [];
        let totalChiasEarned = 0;
        for (const connection of connections) {
            switch (connection.type) {
                case 'fullNode':
                    const fullNode = await Database_1.db[connection.type].asyncFindOne({
                        connection: connection._id,
                        archived: { $ne: true },
                    });
                    let fullNodeEntity = {
                        name: connection.name,
                        type: connection.type,
                        timestamp: connection.timestamp,
                        noData: true,
                    };
                    if (fullNode) {
                        fullNodeEntity = {
                            ...fullNodeEntity,
                            ...{
                                isSync: ((_b = (_a = fullNode === null || fullNode === void 0 ? void 0 : fullNode.blockchain_state) === null || _a === void 0 ? void 0 : _a.sync) === null || _b === void 0 ? void 0 : _b.synced) || false,
                                height: ((_d = (_c = fullNode === null || fullNode === void 0 ? void 0 : fullNode.blockchain_state) === null || _c === void 0 ? void 0 : _c.peak) === null || _d === void 0 ? void 0 : _d.height) || 0,
                                networkSpace: ((_e = fullNode === null || fullNode === void 0 ? void 0 : fullNode.blockchain_state) === null || _e === void 0 ? void 0 : _e.space) || 0,
                            },
                            noData: false,
                        };
                    }
                    result.push(fullNodeEntity);
                    break;
                case 'harvester':
                    const harvester = await Database_1.db[connection.type].asyncFindOne({
                        connection: connection._id,
                        archived: { $ne: true },
                    });
                    let harvesterEntity = {
                        name: connection.name,
                        type: connection.type,
                        timestamp: connection.timestamp,
                        noData: true,
                    };
                    if (harvester) {
                        harvesterEntity = {
                            ...harvesterEntity,
                            ...{
                                plotCount: harvester === null || harvester === void 0 ? void 0 : harvester.plotCount,
                            },
                            noData: false,
                        };
                    }
                    result.push(harvesterEntity);
                    break;
                case 'wallet':
                    const wallets = await Database_1.db[connection.type].asyncFindOne({
                        connection: connection._id,
                        archived: { $ne: true },
                    });
                    let walletsEntity = {
                        name: connection.name,
                        type: connection.type,
                        timestamp: connection.timestamp,
                        noData: true,
                    };
                    if (wallets) {
                        for (const wallet of wallets.wallets) {
                            const balance = wallet.balance;
                            result.push({
                                ...walletsEntity,
                                ...{
                                    balance,
                                    height: wallet.height,
                                },
                                noData: false,
                            });
                            totalChiasEarned += balance;
                        }
                    }
                    else {
                        result.push(walletsEntity);
                    }
                    break;
                case 'chiaExplorer':
                    const chiaExplorer = await Database_1.db[connection.type].asyncFindOne({
                        connection: connection._id,
                        archived: { $ne: true },
                    });
                    let chiaExplorerEntity = {
                        name: 'Top Farmer Rank',
                        type: connection.type,
                        timestamp: connection.timestamp,
                        noData: true,
                    };
                    if (chiaExplorer) {
                        chiaExplorerEntity = {
                            ...chiaExplorerEntity,
                            ...{
                                data: (chiaExplorer === null || chiaExplorer === void 0 ? void 0 : chiaExplorer.rank) === -1 ? '> 50' : ` #${chiaExplorer.rank}`,
                            },
                            noData: false,
                        };
                    }
                    result.push(chiaExplorerEntity);
                    break;
                default:
                    logger.error(`unknown type ${connection.type}`);
            }
        }
        if (result.filter((res) => res.type === 'wallet').length) {
            result.push({
                name: 'Chias earned',
                type: 'summary',
                data: `${totalChiasEarned} XCH`,
            });
        }
        return res.send(result);
    });
    return router;
}
exports.default = init;
