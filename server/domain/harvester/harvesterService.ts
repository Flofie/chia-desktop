import { Harvester } from '../../chia-client';
import { makeLogger } from '../../logger';
import { BaseService } from '../baseService/baseService';

export class HarvesterService extends BaseService {
  logger = makeLogger('domain.HarvesterService');

  async fetchNewInfos() {
    this.logger.debug('fetchNewInfos');
    const harvesterClient = new Harvester({
      hostname: this.connection.host,
      port: this.connection.port,
      certPath: this.connection.crt,
      keyPath: this.connection.key,
    });
    const plots = (await harvesterClient.getPlots()) as { plots: string[] };
    return { plotCount: plots?.plots?.length };
  }
}
