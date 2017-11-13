var paths = {};

paths.dev = {
  folder: 'app/',
  css: {
    folder: 'css/',
    files: '{,**/}*.css'
  },
  sass: {
    folder: 'sass/',
    files: '{,**/}*.{scss,sass}'
  },
  less: {
    folder: 'less/',
    files: '{,**/}*.less'
  },
  js: {
    folder: 'js/',
    plgFolder: 'plugins/',
    files: '{,**/}*.js',
    ourFiles: '*.js',
    requirePrefix: '_requirejs.'
  },
  images: {
    folder: 'images/',
    files: '{,**/}*.{gif,jpeg,jpg,png,svg,ico}'
  },
  fonts: {
    folder: 'fonts/',
    files: '{,**/}*.{woff,eot,ttf,svg}'
  },
  html: {
    folder: '',
    files: '{,**/}*.html'
  },
  jade: {
    folder: 'jade/',
    files: '{,**/}*.pug'
  }
};

// css
paths.dev.css.pathToFolder = paths.dev.folder + paths.dev.css.folder;
paths.dev.css.pathToFiles = paths.dev.css.pathToFolder + paths.dev.css.files;

// sass
paths.dev.sass.pathToFolder = paths.dev.folder + paths.dev.sass.folder;
paths.dev.sass.pathToFiles = paths.dev.sass.pathToFolder + paths.dev.sass.files;

// less
paths.dev.less.pathToFolder = paths.dev.folder + paths.dev.less.folder;
paths.dev.less.pathToFiles = paths.dev.less.pathToFolder + paths.dev.less.files;

// js
paths.dev.js.pathToFolder = paths.dev.folder + paths.dev.js.folder;
paths.dev.js.pathToFiles = paths.dev.js.pathToFolder + paths.dev.js.files;

paths.dev.js.pathToPlgFolder = paths.dev.js.pathToFolder + paths.dev.js.plgFolder;

paths.dev.js.pathToOurFolder = paths.dev.folder + paths.dev.js.folder;
paths.dev.js.pathToOurFiles = paths.dev.js.pathToOurFolder + paths.dev.js.ourFiles;

paths.dev.js.requireFiles = paths.dev.js.requirePrefix + paths.dev.js.ourFiles;
paths.dev.js.pathToRequireFiles = paths.dev.js.pathToFolder + paths.dev.js.requireFiles;

// images
paths.dev.images.pathToFolder = paths.dev.folder + paths.dev.images.folder;
paths.dev.images.pathToFiles = paths.dev.images.pathToFolder + paths.dev.images.files;

// fonts
paths.dev.fonts.pathToFolder = paths.dev.folder + paths.dev.fonts.folder;
paths.dev.fonts.pathToFiles = paths.dev.fonts.pathToFolder + paths.dev.fonts.files;

// html
paths.dev.html.pathToFolder = paths.dev.folder + paths.dev.html.folder;
paths.dev.html.pathToFiles = paths.dev.html.pathToFolder + paths.dev.html.files;

// jade
paths.dev.jade.pathToFolder = paths.dev.folder + paths.dev.jade.folder;
paths.dev.jade.pathToFiles = paths.dev.jade.pathToFolder + paths.dev.jade.files;

paths.markup = {
  folder: 'markup/',
  css: {
    folder: 'css/',
    files: '{,**/}*.css'
  },
  sass: {
    folder: 'sass/',
    files: '{,**/}*.{scss,sass}'
  },
  js: {
    folder: 'js/',
    plgFolder: 'plugins/',
    files: '{,**/}*.js',
    ourFiles: '*.js'
  },
  images: {
    folder: 'images/',
    files: '{,**/}*.{gif,jpeg,jpg,png,svg,ico}'
  },
  fonts: {
    folder: 'fonts/',
    files: '{,**/}*.{woff,eot,ttf,svg}'
  }
};

// css
paths.markup.css.pathToFolder = paths.markup.folder + paths.markup.css.folder;
paths.markup.css.pathToFiles = paths.markup.css.pathToFolder + paths.markup.css.files;

// sass
paths.markup.sass.pathToFolder = paths.markup.folder + paths.markup.sass.folder;
paths.markup.sass.pathToFiles = paths.markup.sass.pathToFolder + paths.markup.sass.files;

// js
paths.markup.js.pathToFolder = paths.markup.folder + paths.markup.js.folder;
paths.markup.js.pathToFiles = paths.markup.js.pathToFolder + paths.markup.js.files;

paths.markup.js.pathToPlgFolder = paths.markup.js.pathToFolder + paths.markup.js.plgFolder;

paths.markup.js.pathToOurFolder = paths.markup.folder + paths.markup.js.folder;
paths.markup.js.pathToOurFiles = paths.markup.js.pathToOurFolder + paths.markup.js.ourFiles;

// images
paths.markup.images.pathToFolder = paths.markup.folder + paths.markup.images.folder;
paths.markup.images.pathToFiles = paths.markup.images.pathToFolder + paths.markup.images.files;

// fonts
paths.markup.fonts.pathToFolder = paths.markup.folder + paths.markup.fonts.folder;
paths.markup.fonts.pathToFiles = paths.markup.fonts.pathToFolder + paths.markup.fonts.files;

paths.build = {
  folder: 'dist/',
  css: {
    folder: 'css/',
    files: '{,**/}*.css'
  },
  sass: {
    folder: 'sass/',
    files: '{,**/}*.{scss,sass}'
  },
  js: {
    folder: 'js/',
    files: '{,**/}*.js'
  },
  images: {
    folder: 'images/',
    files: '{,**/}*.{gif,jpeg,jpg,png,svg,ico}'
  },
  fonts: {
    folder: 'fonts/',
    files: '{,**/}*.{woff,eot,ttf,svg}'
  },
  html: {
    folder: '',
    files: '{,**/}*.html'
  }
};

// css
paths.build.css.pathToFolder = paths.build.folder + paths.build.css.folder;
paths.build.css.pathToFiles = paths.build.css.pathToFolder + paths.build.css.files;

// sass
paths.build.sass.pathToFolder = paths.build.folder + paths.build.sass.folder;
paths.build.sass.pathToFiles = paths.build.sass.pathToFolder + paths.build.sass.files;

// js
paths.build.js.pathToFolder = paths.build.folder + paths.build.js.folder;
paths.build.js.pathToFiles = paths.build.js.pathToFolder + paths.build.js.files;

// images
paths.build.images.pathToFolder = paths.build.folder + paths.build.images.folder;
paths.build.images.pathToFiles = paths.build.images.pathToFolder + paths.build.images.files;

// fonts
paths.build.fonts.pathToFolder = paths.build.folder + paths.build.fonts.folder;
paths.build.fonts.pathToFiles = paths.build.fonts.pathToFolder + paths.build.fonts.files;

// html
paths.build.html.pathToFolder = paths.build.folder + paths.build.html.folder;
paths.build.html.pathToFiles = paths.build.html.pathToFolder + paths.build.html.files;

module.exports = paths;
