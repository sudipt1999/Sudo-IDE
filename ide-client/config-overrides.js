const path = require('path');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const APP_DIR = path.resolve(__dirname, './src');
const MONACO_DIR = path.resolve(__dirname, './node_modules/monaco-editor');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.plugins = [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html',
            favicon: './public/favicon.ico'
          }),
        new MonacoWebpackPlugin({
          // available options are documented at https://github.com/Microsoft/monaco-editor-webpack-plugin#options
          languages: ['python','cpp', 'c', 'java']
        })
      ]
    return config;
}
