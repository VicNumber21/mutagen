var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');

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