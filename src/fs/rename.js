import fs from 'node:fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const oldFilePath = `${__dirname}/files/wrongFilename.txt`;
const newFilePath = `${__dirname}/files/properFilename.md`;

async function checkFileExists(file) {
  return fs.access(file, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)
  }

const rename = async (oldPath, newPath) => {
  try {
    if (!(await checkFileExists(oldPath)) || await checkFileExists(newPath)) {
      throw new Error('FS operation failed');
    }
    await fs.rename(oldPath, newPath);
  } catch (err) {
    console.log(err);
  }
};

await rename(oldFilePath, newFilePath);