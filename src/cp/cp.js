import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));

const spawnChildProcess = async (args) => {
  const child = fork(`${__dirname}/files/script.js`, args);

  const welcome = `Hello!
Type yor text below arguments and press ENTER.
To quit, press Ctrl^C or type 'CLOSE' and press ENTER\n`;

  const farewell = '\nThank you! Have a nice day!\n';

  process.on('exit', () => {
    process.stdout.write(farewell);
  });

  process.on('SIGINT', () => {
    process.exit();
  });
  
  process.stdout.write(welcome);
};

spawnChildProcess(['ho-ho-ho', 'ha-ha-ha']);
