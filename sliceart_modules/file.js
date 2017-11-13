var fs = require('fs'),
  path = require('path');

module.exports = {
  exists: function (filepath) {
    return fs.existsSync(path.join(__dirname, filepath));
  },
  isDir: function (filepath) {
    return this.exists(filepath) && fs.statSync(path.join(__dirname, filepath)).isDirectory();
  },
  readJSON: function (filepath) {
    return require(filepath);
  }
};
