function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

const inputLines = readInputLines("./day-1-input.txt");
const magicSum = 2020;
let match;
outer_loop:
for(const outerLine of inputLines) {
  for(const innerLine of inputLines) {
    match = magicSum - outerLine - innerLine;
    if(inputLines.indexOf(match.toString()) != -1) {
      console.log(outerLine * innerLine * match);
      break outer_loop;
    }
  }
}
