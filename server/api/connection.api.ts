import express from 'express';
import { v4 } from 'uuid';
import { FullNode, Harvester, Wallet } from '../chia-client';
import { Connection } from '../contracts/connection';
import { db } from '../database/Database';
import { makeLogger } from '../logger';

type CreateConnectionResponse = void;
type CreateConnectionParams = Omit<Connection, '_id' | 'timestamp'>;

export default function init() {
  const router = express.Router();
  const logger = makeLogger('api.connection');
  const handleError = (error, res: express.Response) => {
    logger.error(error);
    res.status(400);
    switch (error?.code) {
      case 'MISSINGPROPERTIES':
        return res.send('Missing required properties');
      case 'ENOENT':
      case 'ECONNRESET':
        return res.send('Invalid credentials');
      case 'ECONNREFUSED':
        return res.send('Connection refused');
      default:
        return res.send('Connection refused');
    }
  };
  router.post<{}, CreateConnectionResponse | Error, CreateConnectionParams>(
    '/fullNode',
    async (req, res) => {
      const connectionToAdd = req.body;
      if (Object.values(connectionToAdd).some((property) => !property)) {
        return handleError({ code: 'MISSINGPROPERTIES' }, res);
      }
      try {
        const fullNode = new FullNode({
          hostname: connectionToAdd.host,
          port: connectionToAdd.port,
          certPath: connectionToAdd.crt,
          keyPath: connectionToAdd.key,
        });
        await fullNode.getBlockchainState();
        await db.connection.asyncInsert({
          ...connectionToAdd,
          _id: v4(),
          timestamp: new Date(),
        });
        res.status(201);
        res.send();
      } catch (error) {
        return handleError(error, res);
      }
    }
  );

  router.post<{}, CreateConnectionResponse | Error, CreateConnectionParams>(
    '/wallet',
    async (req, res) => {
      const connectionToAdd = req.body;
      if (Object.values(connectionToAdd).some((property) => !property)) {
        return handleError({ code: 'MISSINGPROPERTIES' }, res);
      }
      try {
        const wallet = new Wallet({
          hostname: connectionToAdd.host,
          port: connectionToAdd.port,
          certPath: connectionToAdd.crt,
          keyPath: connectionToAdd.key,
        });
        const x = await wallet.getHeightInfo();
        console.log('wallet height', x);
        await db.connection.asyncInsert({
          ...connectionToAdd,
          _id: v4(),
          timestamp: new Date(),
        });
        res.status(201);
        res.send();
      } catch (error) {
        return handleError(error, res);
      }
    }
  );
  router.post<{}, CreateConnectionResponse | Error, CreateConnectionParams>(
    '/harvester',
    async (req, res) => {
      const connectionToAdd = req.body;
      if (Object.values(connectionToAdd).some((property) => !property)) {
        return handleError({ code: 'MISSINGPROPERTIES' }, res);
      }
      try {
        const harvester = new Harvester({
          hostname: connectionToAdd.host,
          port: connectionToAdd.port,
          certPath: connectionToAdd.crt,
          keyPath: connectionToAdd.key,
        });
        await harvester.getPlotDirectories();
        await db.connection.asyncInsert({
          ...connectionToAdd,
          _id: v4(),
          timestamp: new Date(),
        });
        res.status(201);
        res.send();
      } catch (error) {
        return handleError(error, res);
      }
    }
  );
  router.post<{}, CreateConnectionResponse | Error, CreateConnectionParams>(
    '/chiaExplorer',
    async (req, res) => {
      const connectionToAdd = req.body;
      if (
        !connectionToAdd.name ||
        !connectionToAdd.crt ||
        !connectionToAdd.key
      ) {
        return handleError({ code: 'MISSINGPROPERTIES' }, res);
      }
      try {
        await db.connection.asyncInsert({
          ...connectionToAdd,
          _id: v4(),
          timestamp: new Date(),
        });
        res.status(201);
        res.send();
      } catch (error) {
        return handleError(error, res);
      }
    }
  );
  return router;
}
