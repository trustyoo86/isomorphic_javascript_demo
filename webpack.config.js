var path         = require('path');
var webpack      = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');

var DEBUG = !(process.env.NODE_ENV === 'production');

var config = {
  devtool : DEBUG? 'cheap-module-eval-source-map' : false,
  entry : {
    app : './src/shared/app',
    vendor : [
      'react',
      'react-router',
      'redux',
      'react-dom',
      'lodash',
      'bluebird',
      'humps',
      'history'
    ]
  },
  resolve : {
    root : [__dirname],
    extensions : ['', '.js', '.scss']
  },
  output : {
    path : path.join(__dirname, 'dist'),
    filename : DEBUG ? '[name].js' : '[name].[chunkhash].js'
  },
  plugins : [
    new webpack.DefinePlugin({
      'process.env' : JSON.stringify(process.env)
    })
  ],
  module : {
    loaders : [
      {
        test : /\.js$/,
        loader : 'babel',
        exclude : /node_modules/,
        include : __dirname
      }
    ]
  }
};

if (DEBUG) {
  config.entry.dev = [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server'
  ];

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', Infinity)
  ]);

  config.output.publicPath = 'http://localhost:3001/static';
  config.module.loaders[0].query = {
    "env" : {
      "development" : {
        "presets" : ["react-hmre"]
      }
    }
  };
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.CommonsChunkPlugin({
      name : 'vendor',
      filename : '[name].[chunkhash].js'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new AssetsPlugin({
      path : path.join(__dirname, 'dist')
    })
  ]);
}

module.exports = config;