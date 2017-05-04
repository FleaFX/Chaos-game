const UTF8ByteOrderMarkPlugin = require("./UTF8ByteOrderMarkPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const EncodingPlugin = require('webpack-encoding-plugin');
const path = require("path");
const webpack = require("webpack");

const extractSass = new ExtractTextPlugin({
  filename: "[name].css",
});

module.exports = bundleArguments => {
  let commonOptions = {
    module: {
      rules: [
        {
          test: /.*\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["es2015", "react"]
          }
        },
        // Include SASS, LESS and CSS
        {
          test: /\.scss$/,
          loader: extractSass.extract({
            use: [{
              loader: "css-loader"
            }, {
              loader: "autoprefixer-loader"
            },{
              loader: "sass-loader"
            }]
          })
        }
      ]
    },
    plugins: [
      extractSass
    ],
    output: {
      library: "main",
      libraryTarget: "var",
      filename: "[name].js"
    },
    resolve: {
      extensions: ['.js', '.jsx']
    }
  };

  return commonOptions;
};