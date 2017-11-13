var bowerJSON = require('../bower.json'),
  uglifyRename = require('./uglify-rename.js'),
  bowerFolder = '../bower_components/',
  paths = require('./paths.js'),
  file = require('./file.js'),
  path = require('path');

module.exports = function (fileType, target, returnArr, uglify) {
  var mainPaths = [],
    plgBowerObj = {},
    postfix = '',
    result = [],
    destString = '',
    plgName = '',
    plgPath = '',
    folder = '',
    regExpParam = {
      'js': /\.js$/,
      'css': /\.css$/,
      'images': /(\.(png|jpg|jpeg|gif|svg)$)|((\.\{)+((png|jpg|jpeg|gif|svg|,)+\})$)/,
      'other': /\w/
    },
    renameFunc = function (dest, src) { // add .min.js for all css and js files
      return uglifyRename(dest, src, fileType);
    };

  // setup variables
  fileType = (typeof fileType === 'string' && /^(css|js|images|other)/.test(fileType)) ? fileType : 'js';
  target = (typeof target === 'string' && /^(markup|build|dev)/.test(target)) ? target : 'markup';
  returnArr = returnArr ? true : false;
  uglify = uglify ? true : false;
  folder = target === 'build' ? paths.build.folder : paths.markup.folder;

  // start
  for (plgName in bowerJSON.dependencies) {
    plgPath = path.join(bowerFolder, plgName + '/');

    if (bowerJSON.dependencies.hasOwnProperty(plgName)) {
      // plugin bower exist and project bower files, for this plugin, is empty
      if (file.exists(path.join(plgPath, 'bower.json')) &&
      !(bowerJSON.files[plgName] && bowerJSON.files[plgName][fileType])) {

        plgBowerObj = file.readJSON(path.join(plgPath, 'bower.json'));

        if (plgBowerObj.hasOwnProperty('main')) {
          mainPaths = plgBowerObj.main; // get main path(s) from bower json

          if (typeof mainPaths === 'string') { // check string or array
            mainPaths = [mainPaths]; // transform main path to array
          }

          if (fileType === 'js' || fileType === 'css') { // only css and js file types
            if (returnArr) { // setup result array. return type is array with path(s)
              mainPaths.forEach(function (mainPath) {
                if (regExpParam[fileType].test(mainPath) &&
                !(plgName === 'respond' && target === 'build')) {
                  // setup result array
                  result.push(path.join(__dirname, plgPath, mainPath));
                }
              });
            } else if (!(plgName === 'respond' && target === 'build')) {
              mainPaths.forEach(function (mainPath) {
                if (regExpParam[fileType].test(mainPath)) {
                  // get clear file and postfix file
                  postfix = path.parse(mainPath);
                  mainPath = postfix.base;

                  if (fileType === 'js' && target !== 'dev') {
                    destString = path.join(folder, paths.dev.js.folder,
                      (target === 'markup' ? paths.dev.js.plgFolder : ''));
                  } else {
                    destString = path.join(folder, paths.dev.css.folder);
                  }

                  // setup result array
                  result.push({
                    expand: true,
                    cwd: path.join(__dirname, plgPath, postfix.dir),
                    src: mainPath,
                    dest: destString,
                    rename: uglify ? renameFunc : undefined,
                    plgName: plgName
                  });
                }
              });
            }
          }
        }
      // plugin bower not exist, but we have folder and files path(s)
      } else if (file.isDir(plgPath) &&
      bowerJSON.files[plgName] && bowerJSON.files[plgName][fileType]) {

        plgResources = JSON.parse(JSON.stringify(bowerJSON.files[plgName][fileType]));

        if (!Array.isArray(plgResources)) { // check array or object
          plgResources = [plgResources];
        }

        if (returnArr) { // setup result array. return type is array with path(s)
          plgResources.forEach(function (plgResource) {
            if (typeof plgResource.paths === 'string') { // check string or array
              plgResource.paths = [plgResource.paths];
            }

            plgResource.paths.forEach(function (pathItem) {
              if (regExpParam[fileType].test(pathItem) &&
              !(plgName === 'respond' && target === 'build')) {
                // setup result array
                result.push(path.join(__dirname, plgPath, plgResource.cwd, pathItem));
              }
            });
          });
        } else if (!(plgName === 'respond' && target === 'build')) {
          // setup result array. return type is array with object(s)
          plgResources.forEach(function (plgResource) {
            mainPaths = [];

            if (typeof plgResource.paths === 'string') { // check string or array
              plgResource.paths = [plgResource.paths];
            }

            plgResource.paths.forEach(function (objPath) {
              if (regExpParam[fileType].test(objPath)) {
                mainPaths.push(objPath);
              }
            });

            plgResource.dest = plgResource.dest || '';

            if (target === 'build' || !(fileType === 'js' && !plgResource.dest)) {
              destString = path.join(folder, plgResource.dest);
            } else if (target === 'markup' && !(fileType === 'js' && !plgResource.dest)) {
              destString = path.join(folder, paths.dev.js.folder, paths.dev.js.plgFolder,
                plgResource.dest);
            }

            // setup result array
            result.push({
              expand: true,
              cwd: path.join(__dirname, plgPath, plgResource.cwd),
              src: mainPaths,
              dest: destString,
              rename: uglify && /^(css|js)/.test(fileType) ? renameFunc : undefined,
              plgName: plgName
            });
          });
        }
      }
    }
  }

  return result;
};
