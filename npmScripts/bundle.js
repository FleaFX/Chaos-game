const parseCommandLineArguments = require("./Arguments/parseCommandLineArguments");
const createWebpackCompiler = require("./Webpack/createWebpackCompiler");
const runWebpackCompiler = require("./Webpack/runWebpackCompiler");
const config = require("./config");

const commandLineArguments = parseCommandLineArguments();

const bundleArguments = {
  target: commandLineArguments.target,
  logger: commandLineArguments.logger,
  configuration: commandLineArguments.configuration,
  action: commandLineArguments.action
};

const webpackCompiler = createWebpackCompiler(bundleArguments);
runWebpackCompiler(webpackCompiler, bundleArguments);
