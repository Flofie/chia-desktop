import { WalletBalance } from '../chia-client/contracts/Wallet/WalletBalance';
import { WalletInfo } from '../chia-client/contracts/Wallet/WalletInfo';

export type WalletModel = {
  _id: string;
  connection: string;
  timestamp: Date;
} & Record<string, WalletInfo & { balance: WalletBalance; height: number }>;
