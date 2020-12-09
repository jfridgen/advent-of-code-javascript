function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function twoNumsSum(numToCheck, list) {
  for(let num of list) {
    if(list.filter(n => n == (numToCheck - num)).length == 1) {
      return true;
    }
  }
  return false;
}

const allNums = readInputLines("./day-9-input.txt");
const preambleLength = 25;

for (let i = preambleLength; i < allNums.length; ++i) {
  if(!twoNumsSum(allNums[i], allNums.slice(i - preambleLength, i))) {
    console.log(allNums[i]);
  }
}