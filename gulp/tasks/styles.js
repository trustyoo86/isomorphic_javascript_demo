'use strict';

import config       from '../config';
import gulp         from 'gulp';
import sass         from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import path         from 'path';
import handleErrors from '../util/handleError';

let $ = require('gulp-load-plugins')();

gulp.task('styles', () => {
  if (global.isProd) {
    return gulp.src(config.styles.sourceDest)
      .pipe($.rev())
      .pipe(gulp.dest(config.styles.dest))
      .pipe($.rev.manifest())
      .pipe(gulp.dest(config.styles.dest));
  } else {
    return gulp.src(config.styles.src)
      .pipe(sass({
        sourceComments : 'map',
        sourceMap : 'sass',
        outputStyle : 'nested'
      }))
      .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8"))
      .on('error', handleErrors)
      .pipe(gulp.dest(config.styles.dest));
  }
});