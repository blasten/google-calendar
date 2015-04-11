'use strict';

var path = require('path');
var gulp = require('gulp');
var vulcanize = require('gulp-vulcanize');
var uglify = require('gulp-uglify');
var webpack = require('gulp-webpack');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var copy = require('gulp-contrib-copy');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');

var COMPONENT_DIR = './components'
var DEST_DIR = './.build';
var customComponents = ['event-calendar'];

gulp.task('default', ['build']);

gulp.task('vulcanize', ['webpack', 'sass', 'copy'], function () { 
  return gulp.src('public/index.html')
    .pipe(vulcanize({
        dest: DEST_DIR,
        csp: true,
        inline: true
    }))
    .pipe(gulp.dest(DEST_DIR));
});

gulp.task('build', ['vulcanize'], function () {
   return gulp.src(DEST_DIR + '/index.js')
    .pipe(uglify())
    .pipe(gulp.dest(DEST_DIR))
});

var webpackDependencies = [];
var sassDependencies = [];
var copyDependencies = [];

gulp.task('webpack', webpackDependencies);
gulp.task('sass', sassDependencies);
gulp.task('copy', copyDependencies);

customComponents.forEach(function(component) {
  var componentBaseDir = COMPONENT_DIR + '/' + component + '/';
  var buildConfig = require(componentBaseDir + 'build');
  var srcDir = path.dirname(buildConfig.entry);
  
  // babel
  gulp.task('babel-' + component, function() {
    return gulp.src(path.normalize(componentBaseDir + srcDir + '/*.js'))
      //.pipe(sourcemaps.init())
      .pipe(babel())
      //.pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(path.normalize(componentBaseDir + '/es5/' + srcDir)));
  });

  // webpack
  webpackDependencies.push('webpack-' + component);
  gulp.task('webpack-' + component, ['babel-' + component], function() {
    return gulp.src(path.normalize(componentBaseDir + '/es5/' + buildConfig.entry))
      .pipe(webpack(buildConfig.webpackConfig || {}))
      .pipe(gulp.dest(path.normalize(componentBaseDir + buildConfig.dest)));
  });

  // sass
  sassDependencies.push('sass-' + component);
  gulp.task('sass-' + component, function() {
    return gulp.src(path.normalize(componentBaseDir + buildConfig.sass))
      .pipe(sass())
      .pipe(gulp.dest(path.normalize(componentBaseDir + buildConfig.dest)));
  });

  // copy
  copyDependencies.push('copy-' + component);
  gulp.task('copy-' + component, function() {
    return gulp.src(path.normalize(componentBaseDir + buildConfig.dest + '/*.chunk.js'))
      .pipe(copy())
      .pipe(uglify())
      .pipe(gulp.dest(DEST_DIR));
  });
});
