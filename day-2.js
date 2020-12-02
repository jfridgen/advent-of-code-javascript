function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function isPwValid(pwObject) {
  const firstPosMatch = pwObject.pw[pwObject.firstPos-1] == pwObject.char;
  const secondPosMatch = pwObject.pw[pwObject.secondPos-1] == pwObject.char;

  if(firstPosMatch && !secondPosMatch) {
    return true;
  }

  if(!firstPosMatch && secondPosMatch) {
    return true;
  }

  return false;
}

function createPwObject(line) {
  const regex = /^(?<min>\d+)-(?<max>\d+)\s(?<char>\w):\s(?<pw>\w+)$/;
  const pwArray = line.match(regex);

  let pwObject = {};
  pwObject.firstPos = pwArray[1];
  pwObject.secondPos = pwArray[2];
  pwObject.char = pwArray[3];
  pwObject.pw = pwArray[4];
  pwObject.valid = isPwValid(pwObject);

  return pwObject;
}

const inputLines = readInputLines("./day-2-input.txt");
console.log(inputLines.map(createPwObject).filter(pwObject => pwObject.valid).length);
