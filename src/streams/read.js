import fs from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/files/fileToRead.txt`;

const read = async (file) => {
  const readStream = fs.createReadStream(file, 'utf8');
  readStream.on('open', () => {
    readStream.pipe(process.stdout);
  });
};

await read(filePath);