import fs from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { stdin as input, stdout as output } from 'node:process';
import * as readline from 'node:readline/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/files/fileToWrite.txt`;

const write = async (file) => {
  const welcome =
    `Hello! Please type your text below.
To save the file after typing, press ENTER.
To quit, press Ctrl^C.\n\n`;

  const farewell = '\nThank you! Have a nice day!\n';

  const rl = readline.createInterface({ input, output });
  const writer = fs.createWriteStream(file);
  
  process.on('exit', () => {
    output.write(farewell);
  });

  process.on('SIGINT', () => {
    process.exit();
  });
  
  output.write(welcome);

  rl.on('line', (text) => {
    writer.write(`${text}\n`);
  });
};

await write(filePath);