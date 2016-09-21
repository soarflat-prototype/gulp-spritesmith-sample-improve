'use strict';

var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// タスクの設定データ
var CONFIG = require('./config');

/**
 * 指定したパスの直下のディレクトリを配列にして返す
 *
 * @param {String} directoryPath
 * @return {Array} filePath
 */
function getDirectory(directoryPath) {
  var filePath;

  return fs.readdirSync(directoryPath).filter(function(file) {
    filePath = path.join(directoryPath, file);
    return fs.statSync(filePath).isDirectory();
  });
};

gulp.task('sprite', function () {
  var spriteData;
  var directory = getDirectory(CONFIG.sprite.imagePath);

  directory.forEach(function(fileName) {
    spriteData =  gulp.src(CONFIG.sprite.imagePath + fileName + '/*.png')
      .pipe(spritesmith({
        // 生成されるスプライト画像名
        imgName: fileName + '.png',
        // 生成されるscssファイル名
        cssName: '_' + fileName + '.scss',
        // 生成されるscssファイルに記載されているスプライト画像のパス
        imgPath: '/image/sprite/' + fileName + '.png',
        // 生成するファイルの拡張子
        cssFormat: 'scss',
        cssVarMap: (sprite) => {
          // 生成されるscssファイルの変数
          sprite.name = 'sprite-' + fileName + '-' + sprite.name;
        }
      }));

    // 生成したスプライト画像の保存先
    spriteData.img.pipe(gulp.dest(CONFIG.sprite.outputSpritePath));
    // 生成したscssファイルの保存先
    spriteData.css.pipe(gulp.dest(CONFIG.sprite.outputScssPath));
  });
});

gulp.task('sass', function () {
  return gulp.src(CONFIG.sass.devPath)
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(gulp.dest(CONFIG.sass.pubPath));
});

gulp.task('watch', function () {
  browserSync({
    notify: false,
    server: {
      baseDir: "./pub"
    },
    port: 8080
  });
  gulp.watch([CONFIG.sass.devPath], ['sass', reload]);
});

gulp.task('default',['watch']);
