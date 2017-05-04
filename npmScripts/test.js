const Jasmine = require("jasmine");
const jasmineReporters = require("jasmine-reporters");
const parseCommandLineArguments = require("./Arguments/parseCommandLineArguments");
const config = require("./config");

const commandLineArguments = parseCommandLineArguments();
const testRunnerArguments = {
  reporter: commandLineArguments.reporter
};

const jasmine = new Jasmine();

jasmine.loadConfig({
  spec_dir: ".",
  spec_files: [
    config.tests.outputFolder + '/tests.js'
  ]
});

switch (testRunnerArguments.reporter) {
  case "terminal":
    jasmine.addReporter(new jasmineReporters.TerminalReporter({
      verbosity: 2,
      color: true,
      showStack: true
    }));
    break;
  case "teamcity":
    jasmine.addReporter(new jasmineReporters.TeamCityReporter());
    break;
}

jasmine.execute();




