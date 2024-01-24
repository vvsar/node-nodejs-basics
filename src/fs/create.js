import fs from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function checkFileExists(file) {
  return fs.access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

const create = async () => {
  try {
    if (await checkFileExists(`${__dirname}/files/fresh.txt`)) {
      throw new Error('FS operation failed');
    }
    const content = 'I am fresh and young';
    await fs.writeFile(`${__dirname}/files/fresh.txt`, content);
  } catch (err) {
    console.log(err);
  }
};

await create();
