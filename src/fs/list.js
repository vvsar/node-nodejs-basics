import fs from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dirPath = `${__dirname}/files`;

async function checkDirExists(dir) {
  return fs.access(dir, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

const list = async (url) => {
  try {
    if (!(await checkDirExists(url))) {
      throw new Error('FS operation failed');
    }
      const files = await fs.readdir(url);
      files.forEach((file) => {
        console.log(file); 
      });
  } catch (err) {
    console.log(err);
  }
};

await list(dirPath);
