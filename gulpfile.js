const gulp = require('gulp');
const concat = require('gulp-concat');
const uglifycss = require('gulp-uglifycss');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('src/assets/sass/padrao.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(rename('padrao.css'))
    .pipe(gulp.dest('./dist/src/assets/tema'));
});

gulp.task('fonts', function () {
  return gulp.src('src/assets/fonts/**')
    .pipe(gulp.dest('./dist/src/assets/fonts'));
});