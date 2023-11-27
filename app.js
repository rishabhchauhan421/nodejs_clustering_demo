const express = require('express');
const cluster = require('cluster');
const os = require('os');

const app = express();

const numCpu = os.cpus().length;
app.get('/', (req, res) => {
  for (let i = 0; i < 1e9; i++) {
    //something complex;
  }
  console.log;
  res.send(`ok ... ${process.pid}`);
  //killing the respective worker who is handling the request
  cluster.worker.kill();
});

if (cluster.isMaster) {
  for (let i = 0; i < numCpu; i++) {
    //creating workers
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} is killed`);
    //once a worker is killed, we are creating new worker
    cluster.fork();
  });
} else {
  //all worker can listen to same port
  app.listen(3000, () => {
    console.log(`running 3000 with process: ${process.pid}`);
  });
}
