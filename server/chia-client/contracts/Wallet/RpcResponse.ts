import { RpcResponse } from '../RpcResponse';
import { BackupInfo } from './BackupInfo';
import { Transaction } from './Transaction';
import { WalletBalance } from './WalletBalance';
import { WalletInfo } from './WalletInfo';

export interface LoginResponse extends RpcResponse {
  backup_info?: BackupInfo;
  backup_path?: string;
}

// Looks like a bug in Chia RPC server where it doesn't provide the standard response with success flag
export interface PublicKeysResponse {
  public_key_fingerprints: string[];
}

export interface PrivateKeyResponse extends RpcResponse {
  private_key: string[];
}

export interface GenerateMnemonicResponse extends RpcResponse {
  mnemonic: string[];
}

export interface AddKeyResponse extends RpcResponse {
  word?: string;
}

export interface SyncStatusResponse extends RpcResponse {
  syncing: boolean;
}

export interface HeightResponse extends RpcResponse {
  height: number;
}

export interface WalletsResponse extends RpcResponse {
  wallets: WalletInfo[];
}

export interface WalletBalanceResponse extends RpcResponse {
  wallet_balance: WalletBalance;
}

export interface TransactionResponse extends RpcResponse {
  transaction: Transaction;
  transaction_id: string;
}

export interface TransactionsResponse extends RpcResponse {
  transactions: Transaction[];
  wallet_id: number;
}

export interface NextAddressResponse extends RpcResponse {
  wallet_id: number;
  address: string;
}
