function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

const EMPTY = "L";
const OCCUPIED = "#";

function numOccupiedAdjacentSeats(seatsByRow, currentRow, currentSeat) {
  let num = 0;
  let startingRow = (currentRow == 0) ? 0 : currentRow - 1;
  let endingRow = (currentRow >= seatsByRow.length - 1) ? currentRow : currentRow + 1;
  let startingSeat = (currentSeat == 0) ? 0 : currentSeat - 1;
  let endingSeat = (currentSeat >= seatsByRow[currentRow].length - 1) ? currentSeat : currentSeat + 1;

  for(let row = startingRow; row <= endingRow; ++row) {
    for(let seat = startingSeat; seat <= endingSeat; ++seat) {
      if((!(row == currentRow && seat == currentSeat)) && seatsByRow[row][seat] == OCCUPIED) {
        num += 1;
      }
    }
  }
  return num;
}

function applyRules(seatsByRow) {
  const updated = JSON.parse(JSON.stringify(seatsByRow));

  for(let row = 0; row < seatsByRow.length; ++row) {
    for(let seat = 0; seat < seatsByRow[row].length; ++seat) {
      if(seatsByRow[row][seat] == EMPTY && numOccupiedAdjacentSeats(seatsByRow, row, seat) == 0) {
        updated[row][seat] = OCCUPIED;
      } if(seatsByRow[row][seat] == OCCUPIED && numOccupiedAdjacentSeats(seatsByRow, row, seat) >= 4) {
        updated[row][seat] = EMPTY;
      }
    }
  }

  return updated;
}

function arrayEquals(a, b) {
  for(let row = 0; row < a.length; ++row) {
    for(let seat = 0; seat < a[row].length; ++seat) {
      if(a[row][seat] !== b[row][seat]) {
        return false;
      }
    }
  }
  return true;
}

function applyRulesUntilNoChange(seatsByRow) {
  let result = applyRules(seatsByRow);

  if(!arrayEquals(result, seatsByRow)) {
    return applyRulesUntilNoChange(result);
  }

  return result;
}

function countOccupied(seatsByRow) {
  let count = 0;
  for(let row = 0; row < seatsByRow.length; ++row) {
    for(let seat = 0; seat < seatsByRow[row].length; ++seat) {
      if(seatsByRow[row][seat] == OCCUPIED) {
        count += 1;
      }
    }
  }
  return count;
}

const rows = readInputLines("./day-11-input.txt");
const seatsByRow = rows.map(line => line.split(""));
const stablizedSeatsByRow = applyRulesUntilNoChange(seatsByRow);
const occupiedSeats = countOccupied(stablizedSeatsByRow);
console.log(occupiedSeats);
