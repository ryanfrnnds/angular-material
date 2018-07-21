const nomeProjetoFront = "BLANK";
const nomeProjetoBack = "BLANK-rest";
const tipoArquivo = ".war";
const nomeDoZip = nomeProjetoFront+tipoArquivo;

const gulp = require('gulp');
const concat = require('gulp-concat');
const zip = require('gulp-zip');
const del = require('del');
const replace = require('gulp-string-replace');

gulp.task('distCriarWar', function() {
  gulp.src(["./dist/index.html","./dist/**"])
  .pipe(zip(nomeDoZip))
  .pipe(gulp.dest("./build"));
});

gulp.task('distReplaceIndex', function() {
  gulp.src(['./dist/index.html'])
    .pipe(replace(new RegExp('<base href="/">', 'g'), '<base href="/'+ nomeProjetoFront +'/">'))
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('guardarConfOriginal', function() {
  gulp.src(['./src/app/app.component.ts'])
    .pipe(concat('app.component-temp.ts'))
    .pipe(gulp.dest('./'));
});

gulp.task('sobrescreverConf', function() {
  gulp.src(['./src/app/app.component.ts'])
  .pipe(replace(new RegExp('urlServidor: SERVIDOR', 'g'), "urlServidor:'/"+nomeProjetoBack+"'"))
  .pipe(concat('app.component.ts'))
  .pipe(gulp.dest('./src/app/'));
});

gulp.task('deletarArquivoTemporario', function() {
  del.sync(['./app.component-temp.ts']);
});

gulp.task('recuperarConfInicial', function() {
  gulp.src(['./app.component-temp.ts'])
  .pipe(concat('app.component.ts'))
  .pipe(gulp.dest('./src/app/'));
});


gulp.task('clean', function() {
  del.sync(['./dist/**']);
});