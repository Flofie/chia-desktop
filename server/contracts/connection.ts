export type ConnectionType =
  | 'fullNode'
  | 'wallet'
  | 'harvester'
  | 'chiaExplorer';

export interface Connection {
  _id: string;
  name: string;
  host: string;
  port: number;
  crt: string;
  key: string;
  type: ConnectionType;
  timestamp: Date;
}
