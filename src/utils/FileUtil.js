import fs from 'fs';
import path from 'path';
import readline from 'readline';

let fileList = [];

const count = (file, callback) => {
  let lines = 0;
  const r = readline.createInterface({
    input: fs.createReadStream(file),
    output: null,
  });
  r.on('line', () => {
    lines += 1;
  }).on('close', () => {
    callback({ file, lines });
  });
};

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
          count(sub, (result) => {
            fileList.push(result);
            callback(fileList);
          });
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
