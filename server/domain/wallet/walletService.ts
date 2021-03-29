import { keyBy } from 'lodash';
import { Wallet } from '../../chia-client';
import { makeLogger } from '../../logger';
import { BaseService } from '../baseService/baseService';

export class WalletService extends BaseService {
  logger = makeLogger('domain.WalletService');

  async fetchNewInfos() {
    this.logger.debug('fetchNewInfos');
    const walletClient = new Wallet({
      hostname: this.connection.host,
      port: this.connection.port,
      certPath: this.connection.crt,
      keyPath: this.connection.key,
    });
    this.logger.debug('getWallets');
    const wallets = await walletClient.getWallets();
    this.logger.debug('got wallets', wallets);
    this.logger.debug('getHeightInfo');
    const height = await walletClient.getHeightInfo();
    this.logger.debug('got getHeightInfo', height);
    const extendedWallets = await Promise.all(
      wallets.map(async (wallet) => {
        const balance = await walletClient.getWalletBalance(wallet.id as any);
        this.logger.debug('got balance', balance);
        return { ...wallet, balance, height };
      })
    );
    this.logger.debug('exntendedWallets', extendedWallets);
    return keyBy(extendedWallets, 'id');
  }

  // async getPublicKeys(): Promise<string[]> {
  //   this.logger.debug('getPublicKeys');
  //   const walletClient = new Wallet({
  //     hostname: this.connection.host,
  //     port: this.connection.port,
  //     certPath: this.connection.crt,
  //     keyPath: this.connection.key,
  //   });
  //   const publicKeys = await walletClient.getPublicKeys();
  //   return publicKeys;
  // }
}
