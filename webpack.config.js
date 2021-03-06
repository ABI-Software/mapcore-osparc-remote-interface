var path = require('path');
var webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: "none",
  entry: {
    "mapcore-osparc-remote-interface": "./src/index.js",
  },
  externals: [
    nodeExternals({}),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "[name].js",
    library: 'mapcore-osparc-remote-interface',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  module: {
    rules: [
      { test: /\.(html)$/, use: [{ loader: 'html-loader' }]},
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] },
      {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
              presets: ['@babel/preset-env',
            	  ['minify',  {
            		  builtIns: false,
            		  evaluate: false,
            		  mangle: false,
            	   }]]
          }
      }
    ]
  },
  devtool: 'source-map'
};
