'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// 指定したパスの直下のディレクトリを配列にして返す
var getDirectory = function(directoryPath) {
  var filePath;

  return fs.readdirSync(directoryPath).filter(function(file) {
    filePath = path.join(directoryPath, file);
    return fs.statSync(filePath).isDirectory();
  });
};

gulp.task('sprite', function () {
  var spriteData;
  var directory = getDirectory('./dev/sprite/');

  directory.forEach(function(fileName) {
    spriteData =  gulp.src('./dev/sprite/' + fileName + '/*.png')
      .pipe(spritesmith({
        imgName: fileName + '.png',                    // 生成されるスプライト画像名
        cssName: '_' + fileName + '.scss',             // 生成されるscssファイル名
        imgPath: '/image/sprite/' + fileName + '.png', // 生成されるscssファイルに記載されているスプライト画像のパス
        cssFormat: 'scss',                             // 生成するファイルの拡張子
        cssVarMap: (sprite) => {
          sprite.name = 'sprite-' + fileName + '-' + sprite.name; // 生成されるscssファイルの変数
        }
      }));
    spriteData.img.pipe(gulp.dest('./pub/image/sprite/'));  // 生成したスプライト画像の保存先
    spriteData.css.pipe(gulp.dest('./dev/scss/sprite/'));   // 生成したscssファイルの保存先
  });
});

gulp.task('sass', function () {
  return gulp.src('./dev/scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(gulp.dest('./pub/css'));
});

gulp.task('watch', function () {
  browserSync({
    notify: false,
    server: {
      baseDir: "./pub"
    },
    port: 8080
  });
  gulp.watch(['./dev/scss/**/*.scss'], ['sass', reload]);
});

gulp.task('default',['watch']);