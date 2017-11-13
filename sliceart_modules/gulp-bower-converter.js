var path = require('path');

module.exports = function (obj) {
  var resultArr = [];

  obj = typeof obj === 'object' ? obj : [];

  if (Array.isArray(obj)) {
    if (typeof obj[0] === 'string') {
      return obj;
    } else if (typeof obj[0] !== 'object') {
      return [];
    } else {
      obj.forEach(function (item) {
        if (Array.isArray(item.src)) {
          resultArr.push({
            src: item.src.map(function (srcItem) {
              var notIndex = srcItem.indexOf('!');

              if (notIndex !== -1) {
                srcItem = srcItem.replace(/\!/g, '');
              }

              return (notIndex !== -1 ? '!' : '') + path.join(item.cwd, srcItem);
            }),
            dest: item.dest,
            prefix: 10,
            rename: item.rename
          });
        } else {
          resultArr.push({
            src: path.join(item.cwd, item.src),
            dest: item.dest,
            prefix: 10,
            rename: item.rename
          });
        }
      });

      return resultArr;
    }
  } else {
    return [];
  }
};
