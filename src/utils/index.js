import fs from 'fs';
/* eslint-disable import/prefer-default-export */

export const readFile = srcPath => new Promise((resolve, reject) => {
  fs.readFile(srcPath, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});

export const writeFile = (savPath, data) => new Promise((resolve, reject) => {
  fs.appendFile(savPath, data, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(data);
    }
  });
});
