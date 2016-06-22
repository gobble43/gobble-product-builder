require('babel-polyfill');
const cluster = require('cluster');

const workers = {};
let redisClient;

const checkOnHTTPServer = () => {
  if (workers.httpServer === undefined) {
    console.log('master starting an httpServer');
    workers.httpServer = cluster.fork({ ROLE: 'http server' });

    workers.httpServer.on('online', () => {
      console.log('http server online');
    });
    workers.httpServer.on('exit', () => {
      console.log('http server died');
      delete workers.httpServer;
    });

    workers.httpServer.on('message', (message) => {
      console.log('master recieved message from http server', message);
      if (!message.upc) {
        console.log('bad task');
      } else {
        redisClient.lpush('addProduct', message.upc.toString());
      }
    });
  }
};
const checkOnProductDataWorker = () => {
  if (workers.productDataWorker === undefined) {
    console.log('master starting an data worker');
    workers.productDataWorker = cluster.fork({ ROLE: 'product data worker' });

    workers.productDataWorker.on('online', () => {
      console.log('product data worker online');
    });
    workers.productDataWorker.on('exit', () => {
      console.log('product data worker died');
      delete workers.productDataWorker;
    });

    workers.productDataWorker.on('message', (message) => {
      console.log('master recieved message from product data worker', message);
    });
  }
};

const masterJob = () => {
  console.log('master job started');

  const redis = require('redis');
  redisClient = redis.createClient();
  redisClient.on('connect', () => {
    console.log('connected to redis');

    const masterLoop = () => {
      checkOnHTTPServer();
      checkOnProductDataWorker();
    };

    setInterval(masterLoop, 2000);
  });
};

if (cluster.isMaster) {
  masterJob();
} else if (process.env.ROLE === 'http server') {
  require('./httpServer/server.js');
} else if (process.env.ROLE === 'product data worker') {
  require('./productDataWorker/worker.js');
}
