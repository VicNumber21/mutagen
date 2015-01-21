var gulp = require('gulp');
var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var bench = require('gulp-benchmark');
var parseArgs = require('minimist');
var _ = require('underscore');


// Utils
var benchSources = function (basePath, defaultBench, suffix) {
  var argv = parseArgs(process.argv.slice(3));

  var tests = _(argv.s).isString()? [argv.s]:
              _(argv.s).isArray()?  argv.s:
                                    [defaultBench];

  return tests.map(function (test) {
    return basePath + test + suffix;
  });
};


// Tasks
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
  return gulp.src(benchSources('./test/bench/compare/', '*', '.js'))
             .pipe(bench({
               reporters: bench.reporters.etalon('Mutagen API')
             }));
});

gulp.task('profile', function () {
  return gulp.src(benchSources('./test/bench/profile/', '*' ,'.js'))
             .pipe(bench({
               reporters: bench.reporters.fastest()
             }));
});
