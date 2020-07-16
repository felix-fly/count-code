import fs from 'fs';
import path from 'path';
import readline from 'readline';
import FileType from '../constants/FileType';
import BaseIgnore from '../constants/BaseIgnore';

const G = {
  fileList: [],
  report: {},
  entry: '',
  option: {}
};

const loadFile = (file, callback) => {
  const ext = path.extname(file);
  const { useBaseIgnore, ignoreFile } = G.option;

  // Ignore files
  let files = [];
  if (ignoreFile) files = ignoreFile.split(',');
  if (useBaseIgnore) files = files.concat(BaseIgnore.files);
  if (files.includes(ext)) {
    return;
  }

  const type = FileType[ext];
  let total = 0;
  let code = 0;
  let empty = 0;
  let comment = 0;
  const r = readline.createInterface({
    input: fs.createReadStream(file),
    output: null,
  });
  r.on('line', (line) => {
    const text = line.trim();
    if (!text) {
      empty += 1;
    } else if (type.comment.test(text)) {
      comment += 1;
    } else {
      code += 1;
    }
    total += 1;
  }).on('close', () => {
    const result = {
      file: file.replace(G.entry, ''),
      total,
      code,
      empty,
      comment,
    };
    callback(result);
  });
};

const loadFolder = (current, callback) => {
  const { useBaseIgnore, ignoreFolder } = G.option;
  const name = path.basename(current);
  // Ignore folders
  let folders = [];
  if (ignoreFolder) folders = ignoreFolder.split(',');
  if (useBaseIgnore) folders = folders.concat(BaseIgnore.folders);
  if (folders.includes(name)) {
    return;
  }

  // Scan sub files under this folder
  fs.readdir(current, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      const sub = path.resolve(current, file);
      fs.stat(sub, (e, stat) => {
        if (e) {
          console.error(e);
          return;
        }

        if (stat.isDirectory()) {
          loadFolder(sub, callback);
        } else {
          loadFile(sub, (result) => {
            G.fileList.push(result);
            G.report.total += result.total;
            G.report.code += result.code;
            G.report.empty += result.empty;
            G.report.comment += result.comment;
            callback({ fileList: G.fileList, report: G.report });
          });
        }
      });
    });
  });
};

const FileUtil = {
  load: (params, callback) => {
    G.fileList = [];
    G.report = {
      files: 0,
      folders: 0,
      total: 0,
      code: 0,
      empty: 0,
      comment: 0,
    };
    G.entry = params.entry;
    G.option = params.option;
    loadFolder(G.entry, callback);
  },
};

export default FileUtil;
