// Generated on 2017-02-07 using generator-sliceart 3.1.0
// node modules
var path = require('path');
var es = require('event-stream');
var gulp = require('gulp');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var clean = require('gulp-rimraf');
var compass = require('gulp-compass');
var csslint = require('gulp-csslint');
var pug = require('gulp-pug');
var processhtml = require('gulp-processhtml');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var copy = require('gulp-copy');
var concat = require('gulp-concat');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var gutil = require('gulp-util');
var ftp = require('gulp-ftp');
var psi = require('psi');
var zip = require('gulp-zip');
var w3cjs = require('gulp-w3cjs');
var validate = require('gulp-w3c-css');
var access = require('gulp-accessibility');
var jsonFormat = require('gulp-json-format');
var args = require('yargs').argv;
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');

// sliceart modules
var paths = require('./sliceart_modules/paths.js');
var MainTasks = require('./sliceart_modules/gulp.init-main-tasks.js');
var gulpBowerConverter = require('./sliceart_modules/gulp-bower-converter.js');
var uglifyRename = require('./sliceart_modules/uglify-rename.js');
var renderBowerFileOrg = require('./sliceart_modules/render-bower-file.js');
var fileExists = require('file-exists');
var hostExists = fileExists('./sliceart_modules/host.js');
var ftppassExists = fileExists('./sliceart_modules/gulp.ftppass.js');

if (hostExists && ftppassExists) {
  var host = require('./sliceart_modules/host.js');
  var ftppass = require('./sliceart_modules/gulp.ftppass.js');
}

var renderBowerFile = function () {
  return gulpBowerConverter(renderBowerFileOrg.apply(undefined, arguments));
};

var pkg = require('./package.json');

var compassDevOpt = {
  sass: paths.dev.sass.pathToFolder,
  css: paths.dev.css.pathToFolder,
  image: paths.dev.images.pathToFolder,
  font: paths.dev.fonts.pathToFolder
};
var compassMarkupOpt = {
  sass: paths.dev.sass.pathToFolder,
  css: paths.markup.css.pathToFolder,
  image: paths.markup.images.pathToFolder,
  font: paths.markup.fonts.pathToFolder
};

var pugOpt = {
  pretty: true
};



var processhtmlOpt = {
  markup: {
    data: {
      ie: ''
    },
    strip: true,
    environment: 'markup'
  },
  build: {
    data: {
      ie: ''
    },
    strip: true,
    environment: 'build'
  }
};

var cssminOpt = {
  banner: '/*! ' + pkg.name + ' - v' + pkg.version + ' - ' + ' */',
  keepSpecialComments: 0
};

if (hostExists && ftppassExists) {
  var base = host.domain + host.path + '/';
  var htmlPages = ['index.html', 'ui.html'];
  var psiOutput = function (pageNum, options) {
    if (pageNum > 0) {
      return psi.output(base + htmlPages[pageNum], options).then(function () {
        return psiOutput(pageNum - 1, options);
      });
    } else {
      return psi.output(base + htmlPages[pageNum], options);
    }
  };
}

var tasks = {
  jshint: function () {
    return gulp.src([paths.dev.js.pathToOurFiles, '!' + paths.dev.js.pathToRequireFiles])
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'));
  },
  clean: {
    css: function () {
      return gulp.src(paths.dev.css.pathToFolder)
        .pipe(clean());
    },
    markup: function () {
      return gulp.src(paths.markup.folder)
        .pipe(clean());
    },
    build: function () {
      return gulp.src(paths.build.folder)
        .pipe(clean());
    }
  },
  compass: {
    dev: function () {
      return gulp.src(paths.dev.sass.pathToFiles)
          .pipe(compass(compassDevOpt));
    },
    markup: function () {
      return gulp.src(paths.dev.sass.pathToFiles)
          .pipe(compass(compassMarkupOpt));
    }
  },
  less: {
    dev: function () {
      return gulp.src([paths.dev.less.pathToFiles, '!{,**/}_*.less'])
          .pipe(less())
          .pipe(gulp.dest(paths.dev.css.pathToFolder));
    },
    markup: function () {
      return gulp.src([paths.dev.less.pathToFiles, '!{,**/}_*.less'])
          .pipe(less())
          .pipe(gulp.dest(paths.markup.css.pathToFolder));
    }
  },
  csslint: {
    dev: function () {
      return gulp.src(paths.dev.css.pathToFiles)
          .pipe(csslint('.csslintrc'))
          .pipe(csslint.reporter());
    },
    markup: function () {
      return gulp.src(paths.markup.css.pathToFiles)
          .pipe(csslint('.csslintrc'))
          .pipe(csslint.reporter());
    }
  },
  jade: {
    dev: function () {
      return gulp.src([paths.dev.jade.pathToFiles, '!{**/,}_*/**'])
          .pipe(pug(pugOpt))
          .pipe(gulp.dest(paths.dev.folder));
    }
  },
  processhtml: {
    markup: function () {
      return gulp.src(paths.dev.html.pathToFiles)
          .pipe(processhtml(processhtmlOpt.markup))
          .pipe(gulp.dest(paths.markup.folder));
    },
    build: function () {
      return gulp.src(paths.dev.html.pathToFiles)
          .pipe(processhtml(processhtmlOpt.build))
          .pipe(gulp.dest(paths.build.folder));
    }
  },
  imagemin: {
    markup: function () {
      return gulp.src(paths.dev.images.pathToFiles)
          .pipe(imagemin({
              use: [pngquant()]
          }))
          .pipe(gulp.dest(paths.markup.images.pathToFolder));
    },
    build: function () {
      return gulp.src(paths.dev.images.pathToFiles)
          .pipe(imagemin({
              use: [pngquant()]
          }))
          .pipe(gulp.dest(paths.build.images.pathToFolder));
    }
  },
  copy: {
    allM: function () {
      var files = [{
        src: [
          paths.dev.folder + '**',
          '!' + paths.dev.html.pathToFiles,
          '!' + paths.dev.css.pathToFolder + '**',
          '!' + paths.dev.js.pathToRequireFiles,
          '!' + paths.dev.jade.pathToFolder + '**',
          '!' + paths.dev.images.pathToFolder + '**'
        ],
        dest: paths.markup.folder
      }].concat(renderBowerFile('css', 'markup'),
          renderBowerFile('images', 'markup'),
          renderBowerFile('other', 'markup'));

      var streams = files.map(function (fileOpt) {
          return gulp.src(fileOpt.src)
            .pipe(rename(function (filePath) {
              if (typeof fileOpt.rename === 'function') {
                return fileOpt.rename(filePath);
              }

              return filePath;
            })).pipe(copy(fileOpt.dest, {
              prefix: fileOpt.prefix || 1
            }));
        });

      return es.merge.apply(es, streams);
    },
    allB: function () {
      var files = [{
        src: [
          paths.dev.folder + '**',
          '!' + paths.dev.html.pathToFiles,
          '!' + paths.dev.css.pathToFolder + '**',
          '!' + paths.dev.jade.pathToFolder + '**',
          '!' + paths.dev.images.pathToFolder + '**',
          '!' + paths.dev.js.pathToFolder + '**',
          '!' + paths.dev.sass.pathToFolder + '**',
          '!' + paths.dev.less.pathToFolder + '**'
        ],
        dest: paths.build.folder
      }].concat(renderBowerFile('images', 'dist'),
          renderBowerFile('other', 'dist'));

      var streams = files.map(function (fileOpt) {
          return gulp.src(fileOpt.src)
            .pipe(rename(function (filePath) {
              if (typeof fileOpt.rename === 'function') {
                return fileOpt.rename(filePath);
              }

              return filePath;
            })).pipe(copy(fileOpt.dest, {
              prefix: fileOpt.prefix || 1
            }));
        });

      return es.merge.apply(es, streams);
    }
  },
  concat: {
    build: function () {
      return gulp.src(renderBowerFile('js', 'dist', true)
          .concat([paths.dev.js.pathToFiles, '!' + paths.dev.js.pathToRequireFiles]))
        .pipe(concat(pkg.name + '.min.js', {
          newLine: '\n\r;'
        })).pipe(gulp.dest(paths.build.js.pathToFolder));
    }
  },
  cssmin: function () {
    var streams = [
      gulp.src(renderBowerFile('css', 'dist', true)
          .concat([
            paths.dev.css.pathToFiles,
            '!' + paths.dev.css.pathToFolder + 'ie{,9}.css'
        ])).pipe(cssmin(cssminOpt))
        .pipe(rename({
          basename: pkg.name,
          suffix: '.min'
        })).pipe(gulp.dest(paths.build.css.pathToFolder)),
      gulp.src(paths.dev.css.pathToFolder + 'ie.css')
        .pipe(cssmin(cssminOpt))
        .pipe(gulp.dest(paths.build.css.pathToFolder)),
      gulp.src(paths.dev.css.pathToFolder + 'ie9.css')
        .pipe(cssmin(cssminOpt))
        .pipe(gulp.dest(paths.build.css.pathToFolder))];

    return es.merge.apply(es, streams);
  },
  uglify: {
    markup: function () {
      var files = renderBowerFile('js', 'markup', false, true);

      var streams = files.map(function (fileOpt) {
          return gulp.src(fileOpt.src)
            .pipe(uglify())
            .pipe(rename(function (filePath) {
              if (typeof fileOpt.rename === 'function') {
                return fileOpt.rename(filePath);
              }

              return filePath;
            })).pipe(gulp.dest(fileOpt.dest));
        });

      return es.merge.apply(es, streams);
    },
    build: function () {
      var streams = [
        gulp.src(path.join(paths.build.js.pathToFolder, pkg.name + '.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest(paths.build.js.pathToFolder)),
        gulp.src('bower_components/respond/dest/respond.src.js')
          .pipe(uglify())
          .pipe(rename(function (filePath) {
            return uglifyRename(filePath);
          })).pipe(gulp.dest(paths.build.js.pathToFolder))]

      return es.merge.apply(es, streams);
    }
  },
  zip: function () {
    return gulp.src('dist/**/*')
      .pipe(zip("and-the-hand-nails-2017-02-07".replace(/-/g, '_')  + '.zip'))
      .pipe(gulp.dest('./'));
  },
  w3cjs: function () {
    return gulp.src(paths.dev.html.pathToFiles)
      .pipe(gulpif(!args.noValidation, htmlValidation()))
  },
  'css-validation': function () {
    return gulp.src('app/css/all.css')
      .pipe(validate())
      .pipe(gulp.dest('reports/css'));
  },
  accessibility: function () {
    return gulp.src(paths.dev.html.pathToFiles)
      .pipe(access({
        force: true,
        ignore: [
          'WCAG2A.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl',
          'WCAG2A.Principle3.Guideline3_1.3_1_1.H57.2'
        ]
      }))
      .on('error', console.log)
      .pipe(access.report({
        reportLocation: 'reports/accessibility',
        reportType: 'json'
      }))
      .pipe(rename({
        extname: '.json'
      }))
      .pipe(gulp.dest('reports/accessibility'));
  },
  'json-stringify': {
    markup: function () {
      return gulp.src('reports/markup/*.json')
        .pipe(jsonFormat(4))
        .pipe(gulp.dest('reports/markup'));
    },
    css: function () {
      return gulp.src('reports/css/*')
        .pipe(jsonFormat(4))
        .pipe(gulp.dest('reports/css'));
    }
  },
  connectReload: {
    html: function () {
      return gulp.src(paths.dev.html.pathToFiles)
          .pipe(reload({stream: true}));
    },
    js: function () {
      return gulp.src(paths.dev.js.pathToOurFiles)
          .pipe(reload({stream: true}));
    },
    css: function () {
      return gulp.src(paths.dev.css.pathToFiles)
          .pipe(reload({stream: true}));
    }
  },
  connect: function () {
    connect.server(connectOpt);
  },
  browserSync: function () {
    browserSync.init({
      server: {
        baseDir: './'
      },
      startPath: paths.dev.folder + 'index.html'
    });
  },
  watch: function() {
    gulp.watch(paths.dev.jade.pathToFiles, ['watch:jade:dev', reload]);
    gulp.watch([paths.dev.js.pathToOurFiles, '!' + paths.dev.js.pathToRequireFiles], ['watch:jshint', reload]);
    gulp.watch(paths.dev.sass.pathToFiles, ['watch:csslint:dev', reload]);
    
  }
};

if (hostExists && ftppassExists) {
  tasks.deploy = function() {
    return gulp.src(['dist/**', '**/reports/**'])
      .pipe(ftp({
        host: host.name,
        user: ftppass.username,
        pass: ftppass.password,
        port: 21,
        remotePath: host.path
      }))
      .pipe(gutil.noop());
  };
}

gulp.task('watch:jshint', tasks.jshint);

gulp.task('watch:clean:css', tasks.clean.css);

gulp.task('watch:compass:dev', ['watch:clean:css'], tasks.compass.dev);

gulp.task('watch:csslint:dev', ['watch:compass:dev'], tasks.csslint.dev);

gulp.task('watch:jade:dev', tasks.jade.dev);



new MainTasks(tasks).init('default', [
  'jshint',
  'clean:css',
  'compass:dev',
  'csslint:dev',
  'jade:dev',
  'browserSync',
  'watch'
]).init('markup', [
  'clean:markup',
  'jade:dev',
  'processhtml:markup',
  'jshint',
  'accessibility',
  'json-stringify:markup',
  'imagemin:markup',
  'compass:markup',
  'csslint:markup',
  'css-validation',
  'json-stringify:css',
  'copy:allM',
  'uglify:markup'
]).init('build', [
  'clean:build',
  'jade:dev',
  'processhtml:build',
  'jshint',
  'imagemin:build',
  'concat:build',
  'uglify:build',
  'clean:css',
  'compass:dev',
  'csslint:dev',
  'cssmin',
  'copy:allB'
]).init('archive', [
  'clean:build',
  'jade:dev',
  'processhtml:build',
  'jshint',
  'accessibility',
  'json-stringify:markup',
  'imagemin:build',
  'concat:build',
  'uglify:build',
  'clean:css',
  'compass:dev',
  'csslint:dev',
  'css-validation',
  'json-stringify:css',
  'cssmin',
  'copy:allB',
  'zip'
]);

if (hostExists && ftppassExists) {
  new MainTasks(tasks).init('deploy', [
    'clean:build',
    'jade:dev',
    'processhtml:build',
    'jshint',
    'accessibility',
    'json-stringify:markup',
    'imagemin:build',
    'concat:build',
    'uglify:build',
    'clean:css',
    'compass:dev',
    'csslint:dev',
    'css-validation',
    'json-stringify:css',
    'cssmin',
    'copy:allB',
    'deploy'
  ]);
}
