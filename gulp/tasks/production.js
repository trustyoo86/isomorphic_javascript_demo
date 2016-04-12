'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

/**
 * @name production
 * @description NODE_ENV = production gulp tasks
 */
gulp.task('prod', [], (cb) => {
  cb = cb || function () {};

  global.isProd = true;

  runSequence(['styles'], cb);
});