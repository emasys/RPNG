import fs from 'fs';

export const createFile = path => fs.closeSync(fs.openSync(path, 'a'));

export const readFile = srcPath => new Promise((resolve) => {
  fs.readFile(srcPath, 'utf8', (err, data) => {
    resolve(data);
  });
});

export const writeFile = (savPath, data) => new Promise((resolve) => {
  fs.appendFile(savPath, data, () => {
    resolve(data);
  });
});
