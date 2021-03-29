import { FullNode } from '../../chia-client';
import { makeLogger } from '../../logger';
import { BaseService } from '../baseService/baseService';

export class FullNodeService extends BaseService {
  logger = makeLogger('domain.FullNodeService');

  async fetchNewInfos() {
    this.logger.debug('fetchNewInfos');
    const fullNodeClient = new FullNode({
      hostname: this.connection.host,
      port: this.connection.port,
      certPath: this.connection.crt,
      keyPath: this.connection.key,
    });
    return fullNodeClient.getBlockchainState();
  }
}
