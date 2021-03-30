"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
const Database_1 = require("../../database/Database");
class BaseService {
    constructor(connection) {
        this.connection = connection;
    }
    async updateRecord() {
        this.logger.debug('updateRecord');
        const info = await this.fetchNewInfos();
        if (info === undefined) {
            this.logger.debug('no record returned');
            return;
        }
        this.logger.debug('got infos', info);
        const currentRecord = await this.getCurrentRecord();
        this.logger.debug('got current record', currentRecord);
        const document = {
            connection: this.connection._id,
            timestamp: new Date(),
            ...info,
        };
        await this.upsert(document);
        return this.updateTimestamp();
    }
    async updateRecordWithHistory(differFct = (a, b) => false) {
        this.logger.debug('updateRecordWithHistory');
        const info = await this.fetchNewInfos();
        if (info === undefined) {
            this.logger.debug('no record returned');
            return;
        }
        this.logger.debug('got infos', info);
        const currentRecord = await this.getCurrentRecord();
        this.logger.debug('got current record', currentRecord);
        const document = {
            connection: this.connection._id,
            timestamp: new Date(),
            ...info,
        };
        if (differFct(info, currentRecord) === true) {
            this.logger.debug('properties differ', info, currentRecord);
            await this.archiveCurrentRecord();
            return this.write(document);
        }
        return this.updateTimestamp();
    }
    async archiveCurrentRecord() {
        this.logger.debug('archiveCurrentRecord');
        return Database_1.db[this.connection.type].asyncUpdate({ connection: this.connection._id }, { $set: { archived: true } });
    }
    async getCurrentRecord() {
        this.logger.debug('getCurrentRecord');
        return Database_1.db[this.connection.type].asyncFindOne({
            connection: this.connection._id,
            archived: { $ne: true },
        });
    }
    async write(document) {
        this.logger.debug('write', document);
        return Database_1.db[this.connection.type].asyncInsert(document);
    }
    async upsert(document) {
        this.logger.debug('upsert', document);
        return Database_1.db[this.connection.type].asyncUpdate({ connection: this.connection._id }, { $set: { ...document } }, { upsert: true });
    }
    async updateTimestamp() {
        this.logger.debug('updateTimestamp');
        return Database_1.db.connection.asyncUpdate({ _id: this.connection._id }, { $set: { timestamp: new Date() } });
    }
}
exports.BaseService = BaseService;
