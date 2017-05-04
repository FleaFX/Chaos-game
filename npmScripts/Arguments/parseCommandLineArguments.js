/**
 * Provides an object representation of the passed in command line arguments
 * @returns {{ allArgs: [], arg1: string, arg2: string, ... }}
 */
module.exports = () => {
  const allArgs = process.argv.slice(2);
  const keyValuePairArgs = allArgs
    .map(arg => /([a-zA-Z]+[0-9a-zA-Z_\-]*)[=]([0-9a-zA-Z_\-]*)/ig.exec(arg))
    .filter(matches => !!matches);
  let args = {
    args: allArgs
  };
  keyValuePairArgs.forEach(keyValuePair => {
    args[keyValuePair[1]] = keyValuePair[2];
  });
  return args;
};