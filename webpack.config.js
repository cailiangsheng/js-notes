const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const NAME = 'notes';

function newWebpackConfig(isProd) {
  return {
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
              {
                loader: 'css-loader',
                options: {
                  minimize: isProd
                }
              },
              'postcss-loader',
              {
                loader: 'less-loader',
                options: {
                  sourceMap: !isProd,
                },
              }
            ],
            publicPath: '/dist',
            disable: false,
            allChunks: false,
          }),
        }
      ],
    }
  };
}

const webpackDevConfig = Object.assign(newWebpackConfig(false), {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${NAME}.js`,
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `${NAME}.css`,
    }),
  ],
  devtool: '#inline-source-map',
});

const webpackProdConfig = Object.assign(newWebpackConfig(true), {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${NAME}.min.js`,
  },
  plugins: [
    new ExtractTextPlugin({
      filename: `${NAME}.min.css`,
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: { warnings: false },
    }),
  ],
});

module.exports = [webpackDevConfig, webpackProdConfig];
