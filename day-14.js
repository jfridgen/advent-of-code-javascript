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

function applyMask(mask, bitString) {
  let maskChars = mask.split("");
  let bitChars = bitString.split("");

  for(let i = 0; i < maskChars.length; ++i) {
    if(maskChars[i] != "0") {
      bitChars[i] = maskChars[i];
    }
  }
  return bitChars;
}

function applyFloatingBits(bitChars, index, impactedAddresses) {
  if(index == bitChars.length) {
    impactedAddresses.push(bitChars.join(""));
    return;
  }

  if(bitChars[index] == "X") {
    bitChars[index] = "1";
    applyFloatingBits(bitChars, index + 1, impactedAddresses);
    bitChars[index] = "0";
    applyFloatingBits(bitChars, index + 1, impactedAddresses);
    bitChars[index] = "X";
  } else {
    applyFloatingBits(bitChars, index + 1, impactedAddresses);
  }
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
let maskedMemAddrChars = [];
let number;
let allMem = new Map();
let impactedAddresses = [];

for(let line of inputLines) {
  if(line.startsWith("mask")) {
    mask = extractMask(line);
  } else if(line.startsWith("mem")) {
    impactedAddresses = [];
    memAddr = extractMemAddr(line);
    number = extractNumber(line);
    maskedMemAddrChars = applyMask(mask, toBitString(memAddr));
    applyFloatingBits(maskedMemAddrChars, 0, impactedAddresses);
    for(let address of impactedAddresses) {
      allMem.set(parseInt(address, 2), number);
    }
  }
}

console.log(Array.from(allMem.values()).reduce((acc, cur) => acc + cur, 0));
