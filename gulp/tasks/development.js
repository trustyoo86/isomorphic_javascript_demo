'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

/**
 * @name development
 * @description ENV_MODE dev tasks
 */
gulp.task('dev', [], (cb) => {
  cb = cb || function () {};

  global.isProd = false;

  runSequence(['styles'], 'watch', cb);
});