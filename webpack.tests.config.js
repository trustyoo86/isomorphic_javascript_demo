'use strict';

var path = require('path');

module.exports = {
  devtool : 'inline-source-map',
  module : {
    loaders : [
      {
        test : /\.(js|jsx)$/,
        include : [
          path.join(__dirname, 'src'),
          path.join(__dirname, 'test')
        ],
        loader : 'babel'
      }
    ],
    postLoaders : [{
      test : /\.(js|jsx)$/,
      include : [path.join(__dirname, 'src')],
      loader : 'istanbul-instrumenter'
    }]
  },
  resolve : {
    extensions : ['', '.js', '.jsx', '.json']
  }
};