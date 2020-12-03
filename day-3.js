function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function getTreeHits(userMap, rightSlope, downSlope) {
  let row = 0;
  let column = 0;
  let treeCount = 0;

  for(row; row < userMap.length; row += downSlope) {
    if(userMap[row][column] == "#") {
      treeCount += 1;
    }
    column = (column + rightSlope) % userMap[row].length;
  }

  return treeCount;
}

const inputLines = readInputLines("./day-3-input.txt");
const inputLineChars = inputLines.map(line => line.split(""));

const slope1 = getTreeHits(inputLineChars, 1, 1);
const slope2 = getTreeHits(inputLineChars, 3, 1);
const slope3 = getTreeHits(inputLineChars, 5, 1);
const slope4 = getTreeHits(inputLineChars, 7, 1);
const slope5 = getTreeHits(inputLineChars, 1, 2);

console.log(slope1 * slope2 * slope3 * slope4 * slope5);