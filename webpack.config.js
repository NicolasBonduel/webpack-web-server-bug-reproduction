/* eslint-disable import/no-extraneous-dependencies */
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './index.jsx',
  target: 'web',
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, './build'),
    hot: false,
    liveReload: false,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'static',
          globOptions: {
            dot: false,
            ignore: ['index.ejs'],
          },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './static/index.ejs'),
      title: 'test',
      mode: 'development',
      inject: 'head',
      scriptLoading: 'blocking',
      templateParameters: {
        bundleName: 'testlib',
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  output: {
    library: 'testlib',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    filename: `[name].bundle.js`,
    path: path.resolve(__dirname, './build'),
  },
};
