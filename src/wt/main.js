import * as os from 'node:os';
import { Worker } from 'node:worker_threads';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const performCalculations = async () => {
  const threadCount = os.cpus().length;
  const threads = new Set();
  const results = [];

  function createWorker (workerData) {
    const worker = new Worker(`${__dirname}/worker.js`, { workerData });
    worker.on('error', (err) => {
      results.push({status: 'error', data: null });
    });
    worker.on('message', (msg) => {
    //   console.log('value: ', msg);
      results.push({number: Object.values(workerData)[0], status: 'resolved', data: msg});
    });
    worker.on('exit', () => {
      if (results.length === threadCount) {
        results.sort((a, b) => a.number - b.number);
        results.forEach((el) => delete el.number);
        console.log(results);
      }
    });
  }

  for(let i = 0; i <threadCount; i++) {
    const number = 10 + i;
    threads.add(createWorker({number}));
  }
};

await performCalculations();