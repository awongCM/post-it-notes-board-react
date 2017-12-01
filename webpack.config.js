const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//For html-webpack-plugin
const options = {
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
};

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'bundled.js'
  },
  module: {
    loaders: [
      {test: /\.js$/, loader:'babel-loader', exclude: /node_modules/},
      {test: /\.jsx$/, loader:'babel-loader', exclude: /node_modules/},
      {test: /\.(css|scss)$/, loader:'style-loader!css-loader!sass-loader'},
      {test: /\.(png|jpg|jpeg|gif)$/, loader:'file-loader'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=src/[name].[ext]'}
    ]
  },
  plugins: [new HtmlWebpackPlugin(options), new CleanWebpackPlugin(['dist'])]
};