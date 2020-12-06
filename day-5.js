function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function getArray(numRows) {
  let rows = [];
  for (let i = 0; i < numRows; ++i) {
    rows.push(i);
  }
  return rows;
}

function findRowOrSeat(choices, seatIdPart, lowerInd, upperInd) {
  if (choices.length == 1) {
    return choices[0];
  }

  if (seatIdPart.substring(0, 1) == lowerInd) {
    return findRowOrSeat(choices.slice(0, choices.length / 2), seatIdPart.substring(1), lowerInd, upperInd);
  }

  if (seatIdPart.substring(0, 1) == upperInd) {
    return findRowOrSeat(choices.slice(choices.length / 2, choices.length), seatIdPart.substring(1), lowerInd, upperInd);
  }
}

const rows = getArray(128);
const seats = getArray(8);

function getSeatNumber(seatId) {
  const row = findRowOrSeat(rows, seatId.substring(0, 7), "F", "B");
  const seat = findRowOrSeat(seats, seatId.substring(7, 10), "L", "R");
  return (row * 8) + seat;
}


const inputLines = readInputLines("./day-5-input.txt");

console.log(inputLines.map(line => getSeatNumber(line)).reduce(function (a, b) { return a > b ? a : b }));
