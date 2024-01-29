import fs from 'node:fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import * as zlib from 'zlib';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/files/archive.gz`;

const decompress = async (file) => {
  const gunzip = zlib.createGunzip();
  const readStream = fs.createReadStream(file);
  const writeStream = fs.createWriteStream(`${__dirname}/files/fileToCompress.txt`);
  
  readStream.pipe(gunzip).pipe(writeStream);
};

await decompress(filePath);