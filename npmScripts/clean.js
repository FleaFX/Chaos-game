const parseCommandLineArguments = require("./Arguments/parseCommandLineArguments");
const removeFiles = require("./FileSystem/removeFiles");
const removeFolders = require("./FileSystem/removeFolders");
const config = require("./config");
const logger = require("./logger");
const nodeModulesFolder = "./node_modules";

const commandLineArguments = parseCommandLineArguments();
const cleanArguments = {
  targets: commandLineArguments.targets && commandLineArguments.targets.split("_")
    || ["js", "patient", "referrer", "tests"], // by default, clean everything except node_modules
};

const getAction = target => {
  switch (target) {
    case "patient"  :
      return removeFolders([config.patient.outputFolder]);
    case "referrer" :
      return removeFolders([config.referrer.outputFolder]);
    case "tests"    :
      return removeFolders([config.tests.outputFolder]);
    case "node-modules"    :
      return removeFolders([nodeModulesFolder]);
    case "js"          :
      return removeFiles("./App/**/*.js{x,}");
  }
};

cleanArguments.targets
  .map(getAction)
  .reduce(
    (promise, nextAction) => promise.then(nextAction, logger.logError),
    Promise.resolve(true)
  );

