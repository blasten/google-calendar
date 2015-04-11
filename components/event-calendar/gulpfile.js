'use strict';

var path = require('path');
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var sourcemaps = require('gulp-sourcemaps');
var buildConfig = require('./build');
var srcDir = path.dirname(buildConfig.entry);

gulp.task('default', ['build']);
gulp.task('build', ['webpack', 'sass']);

gulp.task('babel', function() {
  return gulp.src(path.normalize('./' + srcDir + '*.js'))
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.normalize('./es5/' + srcDir)));
});

gulp.task('webpack', ['babel'], function() {
  return gulp.src(path.normalize('./es5/' + buildConfig.entry))
    .pipe(webpack(buildConfig.webpackConfig || {}))
    .pipe(gulp.dest(path.normalize('./' + buildConfig.dest)));
});

gulp.task('sass', function() {
  return gulp.src(path.normalize('./' + buildConfig.sass))
    .pipe(sass())
    .pipe(gulp.dest(path.normalize('./' + buildConfig.dest)));
});