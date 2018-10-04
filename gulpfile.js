require("babel-core/register");

var rimraf = require('rimraf');
var path = require('path');
var runSequence = require('run-sequence');
var gulp = require('gulp');
var watch = require('gulp-watch');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var filter = require('gulp-filter');

// webpack
var webpack = require('webpack');
var defaultServerPort = 3002;

// webpack dev-server new
var webpackServe = require('webpack-serve');
var history = require('connect-history-api-fallback');


var build = require('./build.settings');
var webpackConfig = require(build.getWebpackConfig());
var outputPath = webpackConfig.output.path;


var browserSync = require('browser-sync');

// reload
var reload = browserSync.reload;

// postcss
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var precss = require('precss'); // like sass, have nested, mixin, extend
var lost = require('lost'); // grid system
var assets = require('postcss-assets'); // image-size, inline file
var at2x = require('postcss-at2x');
var url = require('postcss-url');
var comments = require('postcss-discard-comments');
var stripInlineComments = require('postcss-strip-inline-comments');
var postscss = require('postcss-scss');
var postcssCalc = require("postcss-calc");

// path
var rootPath = path.resolve(__dirname, 'design');
var destPath = path.resolve(__dirname, 'src/style');
var hostIP = build.getHostIP();

var filefolder = {
  img: {
    all: [rootPath + '/img/**/*'],
    compress: [
      rootPath + '/img/**/*.png',
      rootPath + '/img/**/*.jpg',
      rootPath + '/img/**/*.gif',
      rootPath + '/img/**/*.svg',
      '!' + rootPath + '/img/png-sprite/**/*',
      '!' + rootPath + '/img/png-sprite-2x/**/*',
      '!' + rootPath + '/img/svg-sprite/**/*',
    ],
    svg: {
      sprite: rootPath + '/img/svg-sprite/**/*.svg',
      temp: rootPath + '/svgSpriteTemp/',
    },
    move: [
      rootPath + '/img/**/*.svg',
      rootPath + '/img/**/*.ico',
      '!' + rootPath + '/img/svg-sprite',
    ],
  },
  html: {
    all: [rootPath + '/html/**/*.html'],
    dest: rootPath + '/html',
  },
  css: {
    all: [rootPath + '/css/**/*.css'],
    move: [
      rootPath + '/css/globals/normalize.css',
    ],
    bundle: [
      rootPath + '/css/main.css',
    ],
  },
  postcss: rootPath + '/postcss/**/*.css',
  font: rootPath + '/font/**/*',
};

gulp.task('browser-sync', function () {

  var syncAry = filefolder.img.all.concat(filefolder.css.all);

  gulp.watch(syncAry, reload);

  return browserSync({
    server: {
      baseDir: './',
      directory: true,
    },
    port: 4000,
    debugInfo: false,
    open: false,
    browser: ['google chrome', 'firefox'],
    injectChanges: true,
    notify: true,
    ghostMode: false,
  });
});

// postcss
gulp.task('postcss', function () {
  return gulp.src(filefolder.postcss)
    .pipe(plumber())
    .pipe(filter(function (file) {
      return !/\/(_|__).*\.css$/.test(file.path);
    }))
    .pipe(postcss([
      precss,
      postcssCalc(),
      lost(),
      assets({
        basePath: 'design',
        relativeTo: 'css',
        loadPaths: ['img/'],
      }),
      at2x({
        identifier: '_2x',
      }),
      autoprefixer({
        browsers: [
          '> 2%',
          'last 2 versions',
          'ie >= 10',
        ],
      }),
      comments(),
      stripInlineComments(),
    ], { syntax: postscss }))
    .pipe(gulp.dest(rootPath + '/css'));
});

gulp.task('postcss-watch', ['postcss'], function () {
  return watch(filefolder.postcss, function (e) {
    gulp.run(['postcss']);
  });
});

gulp.task('postcss-watch-move', function (cb) {
  watch(filefolder.postcss, function (e) {
    gulp.run(['move-css']);
  });

  cb();
});

gulp.task('move-css', ['postcss'], function () {
  var moveFiles = filefolder.css.move;
  var bundleFiles = filefolder.css.bundle;

  gulp.src(moveFiles)
    .pipe(plumber())
    .pipe(gulp.dest(destPath + '/css'));

  return gulp.src(bundleFiles)
    .pipe(plumber())
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(destPath + '/css'));

});

// fonts
gulp.task('move-font', function () {
  return gulp.src(filefolder.font)
    .pipe(plumber())
    .pipe(gulp.dest(destPath + '/font'));
});

// compress images
gulp.task('move-img', function () {
  return gulp.src(filefolder.img.all)
    .pipe(gulp.dest(destPath + '/img'))
    .on('error', gutil.log);
});

// clean style
gulp.task('clean-style', function () {
  return gulp.src([destPath + '/css', destPath + '/font'], {
    read: false,
  }).pipe(clean({
    force: true,
  }));
});

gulp.task('clean-style-img', function (cb) {
  return gulp.src([destPath + '/img'], {
    read: false,
  }).pipe(clean({
    force: true,
  }));
});

gulp.task('clean-style-all', ['clean-style', 'clean-style-img']);

// style gulp scripts
gulp.task('design', ['browser-sync', 'postcss-watch']);

// 將 design 檔案轉到 src/style 資料夾內
gulp.task('dist', function (cb) {
  runSequence('clean-style', 'move-css', 'move-font', cb);
});

// 將 design 檔案轉到 src/style 資料夾內, 加圖片, depoly 時應該都要跑過一遍, 確保 design 的檔案都有同步到 src/
gulp.task('dist-img', function (cb) {
  runSequence('clean-style-all', 'move-img', 'move-css', 'move-font', cb);
});

gulp.task('serve:local', ['clean', 'staticFiles', 'postcss-watch-move'], function () {
  webpackServe({
    config: webpackConfig,
    content: 'dist',
    add: (app) => {
      // see example: https://github.com/webpack-contrib/webpack-serve/blob/master/docs/addons/history-fallback.config.js
      const historyOptions = {
        disableDotRule: false,
      };
    },
    hot: true,
    open: true,
    host: hostIP,
    port: defaultServerPort,
  });
});

gulp.task('moveStaticFile', ['dist-img'], function () {
  return gulp.src([
    './static/**/*.*',
    '!./static/index.tpl',
    '!./static/webFittingRoom2D/*.*',
  ])
    .pipe(gulp.dest(outputPath));
});

gulp.task('staticFiles', ['moveStaticFile']);

gulp.task('webpack', ['staticFiles'], function (callback) {
  webpack(webpackConfig, function (err) {
    if (err) {
      console.log(err);
      throw new Error("Webpack build failed: " + err);
    }
    callback();
  });
});

gulp.task('clean', function (cb) {
  rimraf.sync(outputPath);
  cb();
});

gulp.task('build', ['clean', 'webpack']);
