function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function toBitString(num) {
  let bits = num.toString(2);
  for(let i = bits.length + 1; i <= 36; ++i) {
    bits = "0" + bits;
  }
  return bits;
}

function applyMask(mask, bits) {
  let maskChars = mask.split("");
  let bitChars = bits.split("");
  for(let i = 0; i < maskChars.length; ++i) {
    if(maskChars[i] != "X") {
      bitChars[i] = maskChars[i];
    }
  }
  return bitChars.join("");
}

function extractMask(line) {
  return line.substring(7);
}

function extractMemAddr(line) {
  const regex = /mem\[(?<memAddr>\d+)/;
  const matches = regex.exec(line);
  return parseInt(matches.groups.memAddr);
}

function extractNumber(line) {
  const regex = /\s+(?<number>\d+)/;
  const matches = regex.exec(line);
  return parseInt(matches.groups.number);
}

const inputLines = readInputLines("./day-14-input.txt");

let mask;
let memAddr;
let number;
let allMem = new Map();

for(let line of inputLines) {
  if(line.startsWith("mask")) {
    mask = extractMask(line);
  } else if(line.startsWith("mem")) {
    memAddr = extractMemAddr(line);
    number = extractNumber(line);
    allMem.set(memAddr, parseInt(applyMask(mask, toBitString(number)), 2));
  }
}

console.log(Array.from(allMem.values()).reduce((acc, cur) => acc + cur, 0));
