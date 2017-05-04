const config = require("../config");
const createCommonWebpackOptions = require("./createCommonWebpackOptions");

module.exports = bundleArguments => {
  let options = createCommonWebpackOptions(bundleArguments);
  options.entry = config.tests.entries;
  options.output.path = config.tests.outputFolder;
  return options;
};