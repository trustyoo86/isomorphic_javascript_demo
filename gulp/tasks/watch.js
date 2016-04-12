'use strict';

import config from '../config';
import gulp   from 'gulp';

/**
 * @name watch
 * @description Watching file with gulp tasks
 */
gulp.task('watch', [], () => {
  gulp.watch(config.styles.src, ['styles']);
});