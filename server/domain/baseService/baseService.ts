import { isEqual, omit } from 'lodash';
import winston from 'winston';
import { Connection } from '../../contracts/connection';
import { db } from '../../database/Database';

export abstract class BaseService {
  abstract logger: winston.Logger;
  constructor(protected connection: Connection) {}

  public async updateRecord() {
    this.logger.debug('updateRecord');
    const info = await this.fetchNewInfos();
    if (info === undefined) {
      this.logger.debug('no record returned');
      return;
    }
    this.logger.debug('got infos', info);
    const currentRecord = await this.getCurrentRecord();
    this.logger.debug('got current record', currentRecord);
    if (
      isEqual(
        info,
        omit(currentRecord, ['_id', 'connection', 'timestamp', 'archived'])
      ) === false
    ) {
      this.logger.debug(
        'properties differ',
        info,
        omit(currentRecord, ['_id', 'connection', 'timestamp', 'archived'])
      );
      await this.archiveCurrentRecord();
      return this.write({
        connection: this.connection._id,
        timestamp: new Date(),
        ...info,
      });
    }
    return this.updateTimestamp();
  }

  abstract fetchNewInfos();

  private async archiveCurrentRecord() {
    this.logger.debug('archiveCurrentRecord');
    return db[this.connection.type].asyncUpdate(
      { connection: this.connection._id },
      { $set: { archived: true } }
    );
  }

  private async getCurrentRecord(): Promise<any> {
    this.logger.debug('getCurrentRecord');
    return db[this.connection.type].asyncFindOne({
      connection: this.connection._id,
      archived: { $ne: true },
    });
  }

  private async write(document: any) {
    this.logger.debug('write', document);
    return db[this.connection.type].asyncInsert(document);
  }

  private async updateTimestamp() {
    this.logger.debug('updateTimestamp');
    return db.connection.asyncUpdate(
      { _id: this.connection._id },
      { $set: { timestamp: new Date() } }
    );
  }
}
