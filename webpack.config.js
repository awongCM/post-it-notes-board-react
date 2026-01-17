const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load .env file into process.env
const env = dotenv.config().parsed || {};
// Merge with system environment variables (for Render)
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
// Add system REACT_APP_API_URL if set (overrides .env)
if (process.env.REACT_APP_API_URL) {
  envKeys['process.env.REACT_APP_API_URL'] = JSON.stringify(process.env.REACT_APP_API_URL);
}

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
  plugins: [
    new HtmlWebpackPlugin(options),
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin(envKeys)
  ]
};