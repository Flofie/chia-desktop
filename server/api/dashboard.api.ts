import express from 'express';
import { ChiaExplorerModel } from '../contracts/chiaExplorer.model';
import { FullNodeModel } from '../contracts/fullNode.model';
import { HarvesterModel } from '../contracts/harvester.model';
import { WalletModel } from '../contracts/wallet.model';
import { db } from '../database/Database';
import { makeLogger } from '../logger';
type GetDashboardResponse = void;

export default function init() {
  const router = express.Router();
  const logger = makeLogger('api.dashboard');
  router.get<{}, GetDashboardResponse>('/', async (req, res) => {
    logger.debug('get dashboard');
    logger.debug('try to get connections');
    const connections = await db.connection.asyncFind({});
    logger.debug('got connections', connections);
    const result: any[] = [];
    let totalChiasEarned = 0;
    for (const connection of connections) {
      switch (connection.type) {
        case 'fullNode':
          const fullNode: FullNodeModel = await db[
            connection.type
          ].asyncFindOne({
            connection: connection._id,
            archived: { $ne: true },
          });
          let fullNodeEntity = {
            name: connection.name,
            type: connection.type,
            timestamp: connection.timestamp,
            noData: true,
          };
          if (fullNode) {
            fullNodeEntity = {
              ...fullNodeEntity,
              ...{
                isSync: fullNode?.blockchain_state?.sync.synced,
                height: fullNode?.blockchain_state?.sync.sync_tip_height,
                networkSpace: fullNode?.blockchain_state?.space,
              },
              noData: false,
            };
          }
          result.push(fullNodeEntity as any);
          break;
        case 'harvester':
          const harvester: HarvesterModel = await db[
            connection.type
          ].asyncFindOne({
            connection: connection._id,
            archived: { $ne: true },
          });

          let harvesterEntity = {
            name: connection.name,
            type: connection.type,
            timestamp: connection.timestamp,
            noData: true,
          };

          if (harvester) {
            harvesterEntity = {
              ...harvesterEntity,
              ...{
                plotCount: harvester?.plots?.length,
              },
              noData: false,
            };
          }
          result.push(harvesterEntity as any);
          break;
        case 'wallet':
          const wallets: WalletModel = await db[connection.type].asyncFindOne({
            connection: connection._id,
            archived: { $ne: true },
          });

          let walletsEntity = {
            name: connection.name,
            type: connection.type,
            timestamp: connection.timestamp,
            noData: true,
          };
          if (wallets) {
            for (const wallet of Object.values(wallets)) {
              if (!wallet.id) {
                continue;
              }
              result.push({
                ...walletsEntity,
                ...{
                  balance: wallet.balance.confirmed_wallet_balance,
                  height: wallet.height,
                },
                noData: false,
              } as any);
              totalChiasEarned += wallet.balance.confirmed_wallet_balance;
            }
          } else {
            result.push(walletsEntity as any);
          }
          break;
        case 'chiaExplorer':
          const chiaExplorer: ChiaExplorerModel = await db[
            connection.type
          ].asyncFindOne({
            connection: connection._id,
            archived: { $ne: true },
          });
          let chiaExplorerEntity = {
            name: connection.name,
            type: connection.type,
            timestamp: connection.timestamp,
            noData: true,
          };
          if (chiaExplorer) {
            chiaExplorerEntity = {
              ...chiaExplorerEntity,
              ...{ rank: chiaExplorer.rank },
              noData: false,
            };
          }
          result.push(chiaExplorerEntity as any);
          break;

        default:
          logger.error(`unknown type ${connection.type}`);
      }
    }

    result.push({
      name: 'Chias earned',
      type: 'summary',
      data: `${totalChiasEarned} XCH`,
    } as any);
    return res.send(result as any);
  });

  return router;
}
