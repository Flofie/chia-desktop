// import nedb from 'nedb';
import AsyncNedb from 'nedb-async';
import { Connection } from '../contracts/connection';
const path = require('path');

export const db = {
  connection: new AsyncNedb<Connection>({
    filename: path.join(__dirname, 'connection.db'),
    autoload: true,
  }),
  harvester: new AsyncNedb({
    filename: path.join(__dirname, 'harvester.db'),
    autoload: true,
  }),
  fullNode: new AsyncNedb({
    filename: path.join(__dirname, 'fullNode.db'),
    autoload: true,
  }),
  wallet: new AsyncNedb({
    filename: path.join(__dirname, 'wallet.db'),
    autoload: true,
  }),
  chiaExplorer: new AsyncNedb({
    filename: path.join(__dirname, 'chiaExplorer.db'),
    autoload: true,
  }),
};
