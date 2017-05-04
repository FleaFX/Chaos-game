require("colors");
const ProgressBar = require("progress");
const ProgressPlugin = require("webpack/lib/ProgressPlugin");
const webpack = require("webpack");
const logger = require("../logger");
const createWebpackOptions = require("./createWebpackOptions");

module.exports = bundleArguments => {
  logger.logStart("Creating webpack compiler...");
  const webpackOptions = createWebpackOptions(bundleArguments);
  const compiler = webpack(webpackOptions);
  const progressBar = new ProgressBar('>> ' + 'Compiling [:bar] :percent :msg'.cyan, {
    complete: '=',
    incomplete: ' ',
    width: 50,
    total: 100
  });

  compiler.apply(new ProgressPlugin(function (percentage, msg) {
    progressBar.update(percentage, { msg: msg });
  }));

  logger.logFinish("OK Finished creating webpack compiler");
  return compiler;
};
