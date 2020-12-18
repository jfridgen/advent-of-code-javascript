function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function convertToBus(busNumber, index) {
  if(busNumber == "x") {
    return null;
  }

  const bus = {};
  bus.number = parseInt(busNumber);
  bus.offset = index;

  return bus;
}

function getEarliestMatchingDepartureTime(buses, startingTime, multiplier) {
  let time = startingTime;
  let match = false;
  let bus;
  while(!match) {
    match = true;
    time = time + multiplier;
    for(bus of buses) {
      if((time + bus.offset) % bus.number != 0) {
        match = false;
        break;
      }
    }
  }
  return time;
}

const inputLines = readInputLines("./day-13-input.txt");
const busNumbers = inputLines[1].split(",");
const buses = busNumbers.map(busNumber =>
  convertToBus(busNumber, busNumbers.indexOf(busNumber)))
  .filter(bus => bus != null);

let time = 0;
let multiplier = 0;
for(let i = 1; i < buses.length; ++i) {
  multiplier = buses.slice(0, i).reduce((acc, cur) => acc * cur.number, 1);
  time = getEarliestMatchingDepartureTime(buses.slice(0, i + 1), time, multiplier);
}
console.log(time);