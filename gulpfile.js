'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    prefix = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename');

gulp.task('styles', function() {
  gulp.src('lib/autoscale.css')
      .pipe(prefix('> 5%'))
      .pipe(rename('aranja-autoscale.css'))
      .pipe(gulp.dest('demo'))
      .pipe(connect.reload());
});

gulp.task('scripts', function() {
  gulp.src('lib/autoscale.js')
      .pipe(browserify())
      .pipe(rename('aranja-autoscale.js'))
      .pipe(gulp.dest('demo'))
      .pipe(connect.reload());
});

gulp.task('server', ['styles', 'scripts', 'watch'], function() {
  connect.server({
      root: ['demo'],
      port: 9000,
      livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch('lib/autoscale.css', ['styles']);
  gulp.watch('lib/autoscale.js', ['scripts']);
});

gulp.task('default', ['server']);
