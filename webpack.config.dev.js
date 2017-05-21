const webpack = require('webpack');
const { resolve } = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  target: 'electron-renderer',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8001',
    'webpack/hot/only-dev-server',
    './src/index.js',
  ],
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    host: 'localhost',
    port: 8001,
    publicPath: '/dist/',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          configFile: '.eslintrc',
          failOnError: true,
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            ['env', {
              targets: {
                electron: '1.6',
              },
              modules: false,
              loose: true,
            }],
            'react',
          ],
          plugins: [
            'transform-class-properties',
          ],
        },
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};
