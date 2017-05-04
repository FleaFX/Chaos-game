const glob = require("glob");

const testsEntries = {
  "tests" : glob.sync("./src/**/*Tests.js")
};

module.exports = {
  build: {
    entries: {
      "bundle": "./src/app.jsx"
    },
    outputFolder: "./dist"
  },
  tests: {
    entries: testsEntries,
    outputFolder: "./dist/tests"
  }
};