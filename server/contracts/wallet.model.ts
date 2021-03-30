import { WalletInfo } from '../chia-client/contracts/Wallet/WalletInfo';

export type WalletModel = {
  _id: string;
  connection: string;
  timestamp: Date;
  wallets: WalletInfo & { balance: number; height: number }[];
};
