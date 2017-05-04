const webpack = require("webpack");
const config = require("../config");
const createCommonWebpackOptions = require("./createCommonWebpackOptions");

module.exports = bundleArguments => {
  let options = createCommonWebpackOptions(bundleArguments);
  options.entry = config.build.entries;
  options.output.path = config.build.outputFolder;

  if (bundleArguments.configuration == "release") {
    options.entry["vendor"] = [
      "react",
      "react-aria-modal",
      "react-dom",
      "rx"
    ];
    options.plugins.unshift(new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      fileName: "vendor.js"
    }));
  }
  return options;
};