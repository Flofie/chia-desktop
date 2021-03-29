import { BlockchainStateResponse } from '../chia-client/contracts/FullNode/RpcResponse';

export type FullNodeModel = BlockchainStateResponse & {
  _id: string;
  connection: string;
  timestamp: Date;
};
