import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import cron from 'node-cron';
import connectionApi from './api/connection.api';
import dashboardApi from './api/dashboard.api';
import { DataFetcherService } from './domain/dataFetcher/dataFetcherService';
import { makeLogger } from './logger';
export default async function server() {
  const logger = makeLogger('server');
  const app = express();
  var cors = require('cors');
  app.use(express.static('build'));
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(helmet());

  app.use('/connection', connectionApi());
  app.use('/dashboard', dashboardApi());

  app
    .listen(process.env.PORT || 8080, () => {
      logger.info(
        `chia-desktop.api listening at http://localhost:${
          process.env.PORT || 8080
        }`
      );
    })
    .on('error', (error) => {
      logger.error(error);
    });

  cron.schedule('* * * * *', async () => {
    logger.debug('running cron job');
    const dataFetcherService = new DataFetcherService();
    logger.debug('fetching new data');
    await dataFetcherService.fetchNewData();
  });
}
