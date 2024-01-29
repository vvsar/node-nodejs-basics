import fs from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'node:crypto';

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = `${__dirname}/files/fileToCalculateHashFor.txt`;

const calculateHash = async (file) => {
  const content = await fs.readFile(file, { encoding: 'utf8' });
  const hash = createHash('sha256').update(content).digest('hex');
  console.log(hash);
};

await calculateHash(filePath);