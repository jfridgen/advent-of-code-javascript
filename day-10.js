function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

const allNums = readInputLines("./day-10-input.txt").map(line => parseInt(line));
const max = Math.max(...allNums);
let i = 0;
let oneDiff = 0;
let threeDiff = 0;
while(i < max) {
  if(allNums.includes(i+1)) {
    i = i+1;
    oneDiff += 1;
  } else if(allNums.includes(i+3)) {
    i = i+3;
    threeDiff += 1;
  } else {
    throw new Error("No num found 1 or 3 greater");
  }
}
// Increment once more for built-in adapter
threeDiff += 1;
const result = oneDiff * threeDiff;

console.log(oneDiff);
console.log(threeDiff);
console.log(result);