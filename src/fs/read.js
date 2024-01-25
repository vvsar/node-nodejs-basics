import fs from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function checkFileExists(file) {
  return fs.access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}  

const read = async (path) => {
  try {
    if (!(await checkFileExists(path))) {
      throw new Error('FS operation failed');
    }
    const content = await fs.readFile(path, { encoding: 'utf8' });
    console.log(content);
  } catch (err) {
    console.log(err);
  }
};

await read(`${__dirname}/files/fileToRead.txt`);