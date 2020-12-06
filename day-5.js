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
    return findRowOrSeat(choices.slice(0, choices.length / 2),
      seatIdPart.substring(1), lowerInd, upperInd);
  }

  if (seatIdPart.substring(0, 1) == upperInd) {
    return findRowOrSeat(choices.slice(choices.length / 2, choices.length),
      seatIdPart.substring(1), lowerInd, upperInd);
  }
}

const rows = getArray(128);
const seats = getArray(8);

function getAllPossibleSeats() {
  let allPossibleSeats = [];
  for (row of rows) {
    for (seat of seats) {
      allPossibleSeats.push((row * 8) + seat);
    }
  }
  return allPossibleSeats;
}

function getSeatNumber(seatId) {
  const row = findRowOrSeat(rows, seatId.substring(0, 7), "F", "B");
  const seat = findRowOrSeat(seats, seatId.substring(7, 10), "L", "R");
  return (row * 8) + seat;
}

function actualOpenSeat(seat, openSeats) {
  return (openSeats.indexOf(seat) == -1) &&
    (openSeats.indexOf(seat - 1) != -1) &&
    (openSeats.indexOf(seat + 1) != -1);
}

function getOpenSeats(allPossibleSeats, openSeats) {
  return allPossibleSeats.filter(seat => actualOpenSeat(seat, openSeats));
}

const inputLines = readInputLines("./day-5-input.txt");
const allPossibleSeats = getAllPossibleSeats();
const takenSeats = inputLines.map(line => getSeatNumber(line));
const openSeats = getOpenSeats(allPossibleSeats, takenSeats);

console.log(openSeats);
