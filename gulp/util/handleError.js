'use strict';

import notify from 'gulp-notify';

/**
 * @name handleError
 * @description error handle module when processing gulp tasks
 * @param {object} error error objects
 */
module.exports = (error) => {
  if (!global.isProd) {
    var args = Array.prototype.slice.call(arguments);
    //send error to notification
    notify.onError({
      title : 'Compile Error',
      message : '<%= error.message %>',
    }).apply(this, args);

    this.emit('end');
  } else {
    //stop the process - prevent broken code from build
    console.log(error);
    process.exit(1);
  }
};