function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function twoNumsSum(numToCheck, allNums) {
  for(let num of allNums) {
    if(allNums.filter(n => n == (numToCheck - num)).length == 1) {
      return true;
    }
  }
  return false;
}

function getInvalidNum(allNums, preambleLength) {
  let invalidNum = 0;
  for(let i = preambleLength; i < allNums.length; ++i) {
    if(!twoNumsSum(allNums[i], allNums.slice(i - preambleLength, i))) {
      invalidNum = allNums[i];
    }
  }
  return invalidNum;
}

function getBlockThatSumsTo(numToCheck, allNums) {
  let sum;
  outerloop:
  for(let i = 0; i < allNums.length; ++i) {
    sum = allNums[i];
    for(let j = i + 1; j < allNums.length; ++j) {
      sum += allNums[j];
      if(sum == numToCheck) {
        return allNums.slice(i, j + 1);
      }
      if(sum > numToCheck) {
        break;
      }
    }
  }
}

const allNums = readInputLines("./day-9-input.txt").map(line => parseInt(line));
const preambleLength = 25;
const invalidNum = getInvalidNum(allNums, preambleLength);
const block = getBlockThatSumsTo(invalidNum, allNums);
const result = Math.min(...block) + Math.max(...block);

console.log(result);
