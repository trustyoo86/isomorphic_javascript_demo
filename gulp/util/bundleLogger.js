'use strict';

import gutil        from 'gulp-util';
import prettyHrtime from 'pretty-hrtime';

let startTime;

module.exports = {
  start() {
    startTime = process.hrtime();
    gutil.log('Running', gutil.colors.green('\'bundle\'') + '...');
  },

  end() {
    let taskTime = process.hrtime(startTime);
    let prettyTime = prettyHrtime(taskTime);
    gutil.log('Finished', gutil.colors.green('\'bundle\''), 'in', gutil.colors.magenta(prettyTime));
  }
}