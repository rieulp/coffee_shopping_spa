const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
require('webpack-dev-server');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
module.exports = {
  name: 'Coffee Shop',
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'hidden-source-map' : 'eval',
  entry: './index',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/dist/',
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './index.html' }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@type': path.resolve(__dirname, 'src', 'types'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@api': path.resolve(__dirname, 'src', 'api'),
      '@util': path.resolve(__dirname, 'src', 'util'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: { browsers: ['last 2 chrome versions', 'IE 10'] }, debug: isDevelopment }],
            '@babel/preset-typescript',
          ],
        },
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 5000,
    devMiddleware: {
      publicPath: '/dist/',
    },
    static: { directory: path.resolve(__dirname) },
  },
};
