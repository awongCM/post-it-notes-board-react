const merge = require('webpack-merge');

const config = require('./webpack.config');

module.exports = merge(config, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    port: '3000'
  }
});