import fs from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as zlib from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/files/fileToCompress.txt`;

const compress = async (file) => {
  const gzip = zlib.createGzip();
  const readStream = fs.createReadStream(file);
  const writeStream = fs.createWriteStream(`${__dirname}/files/archive.gz`);

  readStream.pipe(gzip).pipe(writeStream);
};

await compress(filePath);