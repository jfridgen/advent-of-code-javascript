function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function convertBusToNum(bus) {
  if(bus == "x") {
    return -1;
  }
  return parseInt(bus);
}

const inputLines = readInputLines("./day-13-input.txt");
const buses = inputLines[1].split(",").map(bus => convertBusToNum(bus));
const maxBusNum = Math.max(...buses);
const maxBusIndex = buses.indexOf(maxBusNum);

let match = false;
let timestamp = 0 - maxBusIndex;
while(!match) {
  match = true;
  timestamp += maxBusNum;
  for(let i = 0; i < buses.length; ++i) {
    if(buses[i] == -1) {
      continue;
    }
    if(!((timestamp + i) % buses[i] == 0)) {
      match = false;
      break;
    }
  }
}

console.log(timestamp);