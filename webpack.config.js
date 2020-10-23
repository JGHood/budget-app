
const path = require('path');
const webpack = require('webpack');

let options ={
watch: true,
target: "electron",
externals: {
    'electron': 'require("electron")',
    'net': 'require("net")',
    'remote': 'require("remote")',
    'shell': 'require("shell")',
    'app': 'require("app")',
    'ipc': 'require("ipc")',
    'fs': 'require("fs")',
    'buffer': 'require("buffer")',
    'system': '{}',
    'file': '{}',
    'electron-config': 'require("electron-config")',
    'electron-store': 'require("electron-store)'
},
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: [],
      exclude: /node_modules/,
    }]
  },
  output: {
    path: path.join(__dirname, 'app/build'),
    publicPath: path.join(__dirname, 'src'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    alias: {vue: 'vue/dist/vue.js'}
  },
  entry: [
    './app/js/index',
  ],
  debug: true,

};
module.exports = config => {
  config.target = "electron-renderer";
  return config;
};
module.exports = options;