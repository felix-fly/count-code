import fs from 'fs';
import path from 'path';

let fileList = [];

const dir = (base, callback) => {
  fs.readdir(base, (err, files) => {
    if (err) {
      console.error(err);
      callback(fileList);
      return;
    }

    files.forEach((file) => {
      const sub = path.resolve(base, file);
      fs.stat(sub, (e, stat) => {
        if (e) {
          console.error(e);
          callback(fileList);
          return;
        }

        if (stat.isDirectory()) {
          dir(sub, callback);
        } else {
          fileList.push(sub);
          callback(fileList);
        }
      });
    });
  });
};

const FileUtil = {
  list: (base, callback) => {
    fileList = [];
    dir(base, callback);
  },
};

export default FileUtil;
