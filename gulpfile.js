
var gulp = require('gulp');
var rename = require('gulp-rename');
var json = require('gulp-specificity-json');
var graph = require('./gulp/graph');

gulp.task('json', function() {
  gulp.src('./css/*.css')
    .pipe(json())
    .pipe(gulp.dest('./json'));
});

gulp.task('graph', ['json'], function() {
  gulp.src('./json/*.json')
    .pipe(graph())
    .pipe(gulp.dest('./svg'));
});

gulp.task('default', ['graph']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['./gulp/graph.js'], ['default']);
});

