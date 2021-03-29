import axios from 'axios';
import { Connection } from '../../contracts/connection';
import { TopFarmerResponse } from '../../contracts/topFarmerReponse';
import { db } from '../../database/Database';
import { makeLogger } from '../../logger';
import { BaseService } from '../baseService/baseService';
export class ChiaExplorerService extends BaseService {
  logger = makeLogger('domain.ChiaExplorerService');
  // constructor(connection) {
  //   super({ type: 'chiaExplorer', _id: 'chiaExplorer' } as Connection);
  // }

  async fetchNewInfos() {
    this.logger.debug('fetchNewInfos');
    // this.logger.debug('checking wallet');
    // if ((await this.hasWallet()) === false) {
    //   this.logger.debug('no wallet connection configured');
    //   return;
    // }
    // this.logger.debug('has wallet');

    // const walletConnection = await this.getWalletConnection();
    // this.logger.debug('got wallet connection', walletConnection);

    // const walletService = new WalletService(walletConnection);
    // this.logger.debug('get public keys');

    // const publicKeys = await walletService.getPublicKeys();
    // this.logger.debug('got public keys', publicKeys);
    this.logger.debug('query chiaexplorer');

    const topFarmersResult = await axios.get<TopFarmerResponse>(
      'https://api2.chiaexplorer.com/topFarmers'
    );
    // this.logger.debug('query result', topFarmersResult);

    // const rankedTopFarmers = rankTopFarmer(topFarmersResult.data);
    const rankedTopFarmers = topFarmersResult.data;
    // this.logger.debug('rankedTopFarmers', rankedTopFarmers);

    const myRank = rankedTopFarmers?.topFarmers.find(
      (farmer) => farmer.address === this.connection.crt
    );
    this.logger.debug('myRank', myRank);

    if (!myRank) {
      return { rank: -1 };
    }
    return { rank: myRank.rank, blocks_won: myRank.blocks_won };
  }

  async hasWallet(): Promise<boolean> {
    return ((await db.connection.asyncCount({ type: 'wallet' })) as number) > 0;
  }

  async getWalletConnection(): Promise<Connection> {
    this.logger.debug('getWalletConnection');
    return db.connection.asyncFindOne({ type: 'wallet' });
  }
}
