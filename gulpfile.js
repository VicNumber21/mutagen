var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var bench = require('gulp-bench');

gulp.task('default', ['test']);

gulp.task('lint', function () {
  return gulp.src('./src/*.js')
             .pipe(jshint())
             .pipe(jshint.reporter('default'))
             .pipe(jshint.reporter('fail'));
});

gulp.task('test', ['lint'], function () {
  return gulp.src('./test/main.js')
             .pipe(mocha());
});

gulp.task('bench', function () {
  return gulp.src('./test/bench/compare/*.js')
             .pipe(bench());
});

gulp.task('profile', function () {
  return gulp.src('./test/bench/profile/*.js')
             .pipe(bench());
});
