// import { FullNode, Harvester } from './chia-client';
// import { db } from './database/Database';
// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const app = express();
// var cors = require('cors');
// app.use(express.static(path.join(__dirname, 'build')));
// app.use(cors());

import server from './server';

// app.get('/ping', function (req, res) {
//   return res.send('pong');
// });
// db.farmer.loadDatabase();
// const certPath =
//   'C:\\Users\\FlorianFiedler\\.chia\\testnet\\config\\ssl\\full_node\\private_full_node.crt';
// const keyPath =
//   'C:\\Users\\FlorianFiedler\\.chia\\testnet\\config\\ssl\\full_node\\private_full_node.key';

// app.get('/chia', async (req, res) => {
//   const fullNode = new FullNode({ certPath, keyPath });

//   try {
//     const blockchain = await fullNode.getBlockchainState();
//     console.log('blockchain', blockchain);
//     return res.send(blockchain);
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.get('/harvester', async (req, res) => {
//   const certPath = path.join(__dirname, 'remote_harvester.crt');
//   const keyPath = path.join(__dirname, 'remote_harvester.key');
//   path.join(__dirname, '..', 'build', 'index.html');
//   const harvester = new Harvester({
//     hostname: '192.168.2.202',
//     certPath,
//     keyPath,
//   });

//   try {
//     await harvester.refreshPlots();
//     const dirs = await harvester.getPlotDirectories();
//     console.log('dirs', dirs);
//     const plots = await harvester.getPlots();
//     console.log('plots', plots);
//     return res.send(plots);
//   } catch (error) {
//     console.error(error);
//   }
// });

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });

// app.listen(process.env.PORT || 8080);
server();
