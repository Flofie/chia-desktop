import { db } from '../../database/Database';
import { makeLogger } from '../../logger';
import { ChiaExplorerService } from '../chiaExplorer/chiaExplorerService';
import { FullNodeService } from '../fullNode/fullNodeService';
import { HarvesterService } from '../harvester/harvesterService';
import { walletDifferFct } from '../wallet/walletDifferFct';
import { WalletService } from '../wallet/walletService';

export class DataFetcherService {
  logger = makeLogger('domain.DataFetcherService');
  async fetchNewData() {
    this.logger.debug('fetchNewDate');
    const connections = await db.connection.asyncFind({});
    this.logger.debug('got connections', connections);

    for (const connection of connections) {
      switch (connection.type) {
        case 'fullNode':
          try {
            const fullNodeService = new FullNodeService(connection);
            await fullNodeService.updateRecord();
          } catch (error) {
            this.logger.error(error);
            continue;
          }
          break;
        case 'wallet':
          try {
            const walletService = new WalletService(connection);
            await walletService.updateRecordWithHistory(walletDifferFct);
          } catch (error) {
            this.logger.error(error);
            continue;
          }
          break;
        case 'harvester':
          try {
            const harvesterService = new HarvesterService(connection);
            await harvesterService.updateRecordWithHistory(
              (a, b) => a?.plotCount !== b?.plotCount
            );
          } catch (error) {
            this.logger.error(error);
            continue;
          }
          break;
        case 'chiaExplorer':
          try {
            const chiaExplorerService = new ChiaExplorerService(connection);
            await chiaExplorerService.updateRecordWithHistory(
              (a, b) => a?.rank !== -1 && a?.rank !== b?.rank
            );
            break;
          } catch (error) {
            this.logger.error(error);
            continue;
          }
        default:
          this.logger.error(`unknown type ${connection.type}`);
      }
    }
  }
}
