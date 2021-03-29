"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const node_cron_1 = __importDefault(require("node-cron"));
const connection_api_1 = __importDefault(require("./api/connection.api"));
const dashboard_api_1 = __importDefault(require("./api/dashboard.api"));
const dataFetcherService_1 = require("./domain/dataFetcher/dataFetcherService");
const logger_1 = require("./logger");
async function server() {
    const logger = logger_1.makeLogger('server');
    const app = express_1.default();
    var cors = require('cors');
    app.use(express_1.default.static('build'));
    app.use(cors());
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    app.use(helmet_1.default());
    app.use('/connection', connection_api_1.default());
    app.use('/dashboard', dashboard_api_1.default());
    app
        .listen(process.env.PORT || 8080, () => {
        logger.info(`chia-desktop.api listening at http://localhost:${process.env.PORT || 8080}`);
    })
        .on('error', (error) => {
        logger.error(error);
    });
    node_cron_1.default.schedule('* * * * *', async () => {
        logger.debug('running cron job');
        const dataFetcherService = new dataFetcherService_1.DataFetcherService();
        logger.debug('fetching new data');
        await dataFetcherService.fetchNewData();
    });
}
exports.default = server;
