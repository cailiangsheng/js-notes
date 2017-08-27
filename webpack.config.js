const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const NAME = 'notes';

const webpackCommonConfig = {
  entry: [
    './src/controller.js',
    './src/view/filter.js',
    './src/view/notes.less',
  ],
  externals: {
    angular: 'angular'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader', {
              loader: 'less-loader',
              options: {
                sourceMap: true,
              },
            }],
          publicPath: '/dist',
          disable: false,
          allChunks: false,
        }),
      },
    ],
  },
  plugins: []
};

const webpackDevConfig = Object.assign({}, webpackCommonConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${NAME}.js`,
  },
  plugins: webpackCommonConfig.plugins.concat([
    new ExtractTextPlugin({
      filename: `${NAME}.css`,
    }),
  ]),
  devtool: '#inline-source-map',
});

const webpackProdConfig = Object.assign({}, webpackCommonConfig, {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${NAME}.min.js`,
  },
  plugins: webpackCommonConfig.plugins.concat([
    new ExtractTextPlugin({
      filename: `${NAME}.min.css`,
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: { warnings: false },
    }),
  ]),
});

module.exports = [webpackDevConfig, webpackProdConfig];
