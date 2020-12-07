function readInputByGroup(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  //const textSplitByBlankLine = text.split("\r\n\r\n").map(line => line.replace(/\r\n/g, ""));
  const textSplitByBlankLine = text.split("\r\n\r\n");

  return textSplitByBlankLine;
}

function getUnanimousGroupYesResponses(responses) {
  const individualResponses = responses.split("\r\n");
  const unanimousResponses = [];
  let chars;
  for(response of individualResponses) {
    chars = response.split("");
    for(char of chars) {
      if(individualResponses.every(r => r.includes(char))) {
        unanimousResponses.push(char);
      }
    }
  }

  return [...new Set(unanimousResponses)];
}

function getUniqueResponses(responses) {
  return [...new Set(responses)];
}

const groups = readInputByGroup("./day-6-input.txt");
const unanimousResponses = groups.map(getUnanimousGroupYesResponses);
const total = unanimousResponses.reduce((acc, cur) => acc + cur.length, 0);

console.log(total);