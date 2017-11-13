# and-the-hand-nails

## Project setup
### Installing Node.js
![Node.js logo](https://camo.githubusercontent.com/3102d380158f4b2359068a8e00a53f58f4f236de/687474703a2f2f6e6f64656a732e6f72672f696d616765732f6c6f676f732f6e6f64656a732e706e67 "Node.js logo")

1) Install Node.js and npm(node package manager). Visit this [site](https://nodejs.org/en/) and download the appropriate version for your system.

2) Go to the command line or terminal and check if Node.js and npm are installed

To check the node version:
```shell
$ node -v
```

To check the npm version:
```shell
$ npm -v
```

3) If commands from point 2 are not successful please consider going back to point 1 and reinstalling the Node.js package or rebooting your computer.
```shell
$ npm install.
```
### Installing gulp


![Gulp logo](http://s3-us-west-2.amazonaws.com/i.cdpn.io/75971.jmzDf.90c44df7-1c42-4f1e-afcf-54debeba00fd.png "Gulp logo")




1) Install gulp-cli (command line interface) using an official [get started page](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)


2) Check if gulp was successfully installed

```shell
$ gulp -v
```

### Installing bower

![Bower logo](http://bower.io/img/bower-logo.svg "Bower logo")

1) Install bower using guidelines on the [official page](http://bower.io/) or just execute:

```shell
npm install -g bower
```

2) Check if bower was successfully installed

```shell
$ bower -v
```

## Installing dependencies

### Node dependencies

Node dependencies are based on the package.json file that is situated in the root of the project. To install them simply do the following command:

```shell
$ npm install
```

If error occurs during installation process delete the node_modules folder and try again

### Bower dependencies

Bower dependencies are based on bower.json file that is situated in the root if the project. To install them simply do the following command:

```shell
$ bower install
```

## gulp tasks

1) gulp default

```shell
$ gulp
```

Starts the local server and executes watch task to recompile all of the specified files

2) gulp markup

```shell
$ gulp markup
```

Compiles a markup version that moves bower dependencies into plugins folder so further development if necessary can be used without npm or bower usage

3) gulp build

```shell
$ gulp build
```
Creates a build folder with minified css, images and uglified javascript for production purposes

## Folder structure

```
/-- root
    /--app (development folder that contains all of the source files)
      /--css (folder with compiled css files)
      /--images (folder that contains both background and content images)
        /--backgrounds (background images)
        /--content (content images in html, for example, img-news-1.jpg, img-promo-1.jpg)
        /--decorations (site decorations: dividers, markers, bullets, big illustrations)
        sprite.png (combines small icons and illustrations to be used in css through background-position property)
      /--jade (contains jade templates that are compiled into html files using task manager)
      /--inc (contains partials that is often used in javascript like json files or html chunks)
        gallery.html
        data.json
      /--sass (contains sass files that are divided into different folders based on the pattern lab principles)
      /--js (contains all javascript files, files that use jQuery start with a jQuery prefix)
    .csslintrc (contains rules for linting css)
  .editorconfig (defines coding styles like indents and line breaks)
  .gitignore (specifies intentionally untracked files for git to ignore)
  .jscs (code style linter for programmatically enforcing javascript style guide)
  .jscsrc (file to disable any preset rule of javascript style guide)
  .jshintrc (contains rules for javascript linting)
  bower.json (contains third-party dependencies list, that are handled by bower)
  gulpfile.js (gulp entry file that contains tasks, modules and their options)
  package.json (contains npm dependencies list)
  README.md
```
