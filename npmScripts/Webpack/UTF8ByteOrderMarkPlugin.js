const fs = require('fs');

const BOM = new Buffer([0xEF, 0xBB, 0xBF]);

class UTF8ByteOrderMarkPlugin {

  constructor(fileMask) {
    this.fileMask = fileMask || /\.(html|htm|css|js|map)$/;
  }

  apply(compiler) {
    compiler.plugin('done', statistics => {
      const files = statistics.compilation.assets;
      const fileNames = Object.keys(files).filter(fileName => fileName.match(this.fileMask));
      fileNames.forEach(fileName => {
        const path = files[fileName].existsAt;
        if(!path) return;

        const fileContents = fs.readFileSync(path);
        if(fileContents.length >= 3 && fileContents[0] === 0xEF && fileContents[1] === 0xBB && fileContents[2] === 0xBF)
          return;

        fs.writeFile(path, (BOM + fileContents).toString(), "utf8");
      });
    });
  }
}

module.exports = UTF8ByteOrderMarkPlugin;