const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './build/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  resolve: {
    alias: {
      '@type': path.resolve(__dirname, 'build/types'),
      '@components': path.resolve(__dirname, 'build/components'),
      '@api': path.resolve(__dirname, 'build/api'),
      '@util': path.resolve(__dirname, 'build/util'),
    },
  },
};
