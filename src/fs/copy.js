import fs from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const oldDirPath = `${__dirname}/files`;
const newDirPath = `${__dirname}/files_copy`;

async function checkDirExists(dir) {
  return fs.access(dir, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
}

const copy = async (oldPath, newPath) => {
  try {
    if (!(await checkDirExists(oldPath)) || await checkDirExists(newPath)) {
      throw new Error('FS operation failed');
    }
      await fs.cp(oldPath, newPath, {recursive: true});
  } catch (err) {
    console.log(err);
  }
};

await copy(oldDirPath, newDirPath);
