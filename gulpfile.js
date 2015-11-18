'use strict';
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var nsp = require('gulp-nsp');
var plumber = require('gulp-plumber');
var coveralls = require('gulp-coveralls');
var nodemon = require('gulp-nodemon');

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('nsp', function (cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('coverage', ['static'], function () {
  return gulp.src('backend/test/**/*.js')
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task('test', function (cb) {
  var mochaErr;

  gulp.src('backend/test/**/*.spec.js')
    .pipe(plumber())
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function (err) {
      mochaErr = err;
      cb(mochaErr);
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr);
    });
});

gulp.task('coveralls', ['test'], function () {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls());
});

gulp.task('dev-server', function () {
  nodemon({
    script: 'backend/src/server/server.js',
    ext: 'js',
    env: { NODE_ENV: 'development' },
    verbose: true,
    watch: [
      'backend/src/',
      'backend/test/'
    ],
    events: {
      restart: 'osascript -e "display notification "App restarted due to:\n\'$FILENAME\' with title "nodemon"'
    }
  });
});

gulp.task('prepublish', ['nsp']);
gulp.task('default', ['static', 'test', 'coverage', 'coveralls']);
gulp.task('dev', ['dev-server']);
