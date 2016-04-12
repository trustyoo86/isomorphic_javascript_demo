'use strict';

var webpackTestConfig = require('../webpack.tests.config.js');

module.exports = function (config) {
  config.set({
    browsers : ['Chrome'],
    singleRun : true,
    frameworks : [
      'chai',
      'mocha',
      'sinon',
      'sinon-chai',
      'phantomjs-shim'
    ],
    plugins : [
      'karma-chrome-launcher',
      'karma-chai',
      'karma-mocha',
      'karma-sinon',
      'karma-sinon-chai',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-phantomjs-shim'
    ],
    phantomjsLauncher : {},
    preprocessors : {

    },
    reporters : ['mocha', 'coverage'],
    mochaReporter : {
      output : 'autowatch'
    }
  })
}