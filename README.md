# gulp-spritesmith-sample-improve
スプライト画像をディレクトリ毎に生成するgulpタスクのサンプルです。

# ディレクトリ構成
```
.
├── README.md
├── dev
│   ├── scss
│   │   ├── sprite
│   │   │   ├── _sample.scss
│   │   │   └── _sample2.scss
│   │   └── style.scss
│   └── sprite
│       ├── sample
│       │   ├── icon1.png
│       │   ├── icon2.png
│       │   └── icon3.png
│       └── sample2
│           ├── icon1.png
│           ├── icon2.png
│           └── icon3.png
├── gulpfile.js
├── config.js
├── node_modules
├── package.json
└── pub
    ├── css
    │   └── style.css
    ├── image
    │   └── sprite
    │       ├── sample.png
    │       └── sample2.png
    └── index.html
```

# config.js
生成したスプライト画像の保存先などは`config.js`上で指定することができます。

```
module.exports = {
  sass: {
    devPath: './dev/scss/**/*.scss',
    pubPath: './pub/css'
  },
  sprite: {
    imagePath: './dev/sprite/',
    outputSpritePath: './pub/image/sprite/',
    outputScssPath: './dev/scss/sprite/'
  }
};
```
