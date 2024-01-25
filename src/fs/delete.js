import fs from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function checkFileExists(file) {
  return fs.access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}  

const remove = async (url) => {
  try {
    if (!(await checkFileExists(url))) {
      throw new Error('FS operation failed');
    }
    await fs.unlink(url);
  } catch (err) {
    console.log(err);
  }
};

await remove(`${__dirname}/files/fileToRemove.txt`);