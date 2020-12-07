function readInputSplitByBlankLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textSplitByBlankLine = text.split("\r\n\r\n").map(line => line.replace(/\r\n/g, ""));

  return textSplitByBlankLine;
}

function getUniqueResponses(responses) {
  return [...new Set(responses)];
}

const groups = readInputSplitByBlankLines("./day-6-input.txt");
const groupResponses = groups.map(line => line.split(""));
const groupUniqueResponses = groupResponses.map(getUniqueResponses);
const totalUniqueResponses = groupUniqueResponses.reduce((acc, cur) => acc + cur.length, 0);
console.log(totalUniqueResponses);