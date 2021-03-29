import { CertPathRequired } from './contracts/CertPathRequired';
import {
  AddKeyResponse,
  GenerateMnemonicResponse,
  HeightResponse,
  LoginResponse,
  NextAddressResponse,
  PrivateKeyResponse,
  PublicKeysResponse,
  SyncStatusResponse,
  TransactionResponse,
  TransactionsResponse,
  WalletBalanceResponse,
  WalletsResponse,
} from './contracts/Wallet/RpcResponse';
import { Transaction } from './contracts/Wallet/Transaction';
import { WalletBalance } from './contracts/Wallet/WalletBalance';
import { WalletInfo } from './contracts/Wallet/WalletInfo';
import { ChiaOptions, RpcClient } from './RpcClient';

const defaultProtocol = 'https';
const defaultHostname = 'localhost';
const defaultPort = 8555;
const host = 'https://backup.chia.net';

class Wallet extends RpcClient {
  public constructor(options: Partial<ChiaOptions> & CertPathRequired) {
    super({
      protocol: options?.protocol || defaultProtocol,
      hostname: options?.hostname || defaultHostname,
      port: options?.port || defaultPort,
      certPath: options.certPath,
      keyPath: options.keyPath,
    });
  }

  public async logIn(fingerprint: number): Promise<LoginResponse> {
    return this.request<LoginResponse>('log_in', {
      host,
      fingerprint,
      type: 'start',
    });
  }

  public async logInAndRestore(
    fingerprint: number,
    filePath: string
  ): Promise<LoginResponse> {
    return this.request<LoginResponse>('log_in', {
      host,
      fingerprint,
      type: 'restore_backup',
      file_path: filePath,
    });
  }

  public async logInAndSkip(fingerprint: number): Promise<LoginResponse> {
    return this.request<LoginResponse>('log_in', {
      host,
      fingerprint,
      type: 'skip',
    });
  }

  public async getPublicKeys(): Promise<string[]> {
    const response = await this.request<PublicKeysResponse>(
      'get_public_keys',
      {}
    );
    const { public_key_fingerprints } = response;
    return public_key_fingerprints;
  }

  public async getPrivateKey(fingerprint: number): Promise<string[]> {
    const { private_key } = await this.request<PrivateKeyResponse>(
      'get_private_key',
      { fingerprint }
    );

    return private_key;
  }

  public async generateMnemonic(): Promise<string[]> {
    const { mnemonic } = await this.request<GenerateMnemonicResponse>(
      'generate_mnemonic',
      {}
    );

    return mnemonic;
  }

  public async addKey(
    mnemonic: string[],
    type: string = 'new_wallet'
  ): Promise<AddKeyResponse> {
    return this.request<AddKeyResponse>('add_key', {
      mnemonic,
      type,
    });
  }

  public async deleteKey(fingerprint: number): Promise<{}> {
    return this.request<{}>('delete_key', { fingerprint });
  }

  public async deleteAllKeys(): Promise<{}> {
    return this.request<{}>('delete_all_keys', {});
  }

  public async getSyncStatus(): Promise<boolean> {
    const { syncing } = await this.request<SyncStatusResponse>(
      'get_sync_status',
      {}
    );

    return syncing;
  }

  public async getHeightInfo(): Promise<number> {
    const { height } = await this.request<HeightResponse>(
      'get_height_info',
      {}
    );

    return height;
  }

  public async farmBlock(address: string): Promise<{}> {
    return this.request<{}>('farm_block', { address });
  }

  public async getWallets(): Promise<WalletInfo[]> {
    const { wallets } = await this.request<WalletsResponse>('get_wallets', {});

    return wallets;
  }

  public async getWalletBalance(walletId: string): Promise<WalletBalance> {
    const { wallet_balance } = await this.request<WalletBalanceResponse>(
      'get_wallet_balance',
      { wallet_id: walletId }
    );

    return wallet_balance;
  }

  public async getTransaction(
    walletId: string,
    transactionId: string
  ): Promise<Transaction> {
    const { transaction } = await this.request<TransactionResponse>(
      'get_transaction',
      {
        wallet_id: walletId,
        transaction_id: transactionId,
      }
    );

    return transaction;
  }

  public async getTransactions(walletId: string): Promise<Transaction[]> {
    const { transactions } = await this.request<TransactionsResponse>(
      'get_transactions',
      { wallet_id: walletId }
    );

    return transactions;
  }

  public async getNextAddress(walletId: string): Promise<string> {
    const { address } = await this.request<NextAddressResponse>(
      'get_next_address',
      { wallet_id: walletId }
    );

    return address;
  }

  public async sendTransaction(
    walletId: string,
    amount: number,
    address: string,
    fee: number
  ): Promise<Transaction> {
    const { transaction } = await this.request<TransactionResponse>(
      'send_transaction',
      {
        wallet_id: walletId,
        amount,
        address,
        fee,
      }
    );

    return transaction;
  }

  public async createBackup(filePath: string): Promise<{}> {
    return this.request<{}>('create_backup', { file_path: filePath });
  }
}

export { Wallet };
