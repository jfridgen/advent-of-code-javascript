function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

const EMPTY = "L";
const OCCUPIED = "#";
const NORTH = "N";
const SOUTH = "S";
const EAST = "E";
const WEST = "W";

function getOccupiedVisibleSeatsForDirection(seatsByRow, currentRow, currentSeat, northSouth, eastWest) {
  let row = currentRow;
  if(northSouth == NORTH) {
    row = currentRow - 1;
  } else if(northSouth == SOUTH) {
    row = currentRow + 1;
  }

  let seat = currentSeat;
  if(eastWest == WEST) {
    seat = currentSeat - 1;
  } else if(eastWest == EAST) {
    seat = currentSeat + 1;
  }

  let count = 0;
  while(row >= 0 && row < seatsByRow.length &&
    seat >= 0 && seat < seatsByRow[row].length) {
    if(seatsByRow[row][seat] == OCCUPIED) {
      count += 1;
      break;
    }
    if(seatsByRow[row][seat] == EMPTY) {
      break;
    }

    if(northSouth == NORTH) {
      --row;
    } else if(northSouth == SOUTH) {
      ++row;
    }

    if(eastWest == WEST) {
      --seat;
    } else if(eastWest == EAST) {
      ++seat;
    }
  }

  return count;
}

function getAllOccupiedVisibleSeats(seatsByRow, currentRow, currentSeat) {
  const westCount = getOccupiedVisibleSeatsForDirection(seatsByRow, currentRow, currentSeat, null, WEST);
  const northWestCount = getOccupiedVisibleSeatsForDirection(seatsByRow, currentRow, currentSeat, NORTH, WEST);
  const northCount = getOccupiedVisibleSeatsForDirection(seatsByRow, currentRow, currentSeat, NORTH, null);
  const northEastCount = getOccupiedVisibleSeatsForDirection(seatsByRow, currentRow, currentSeat, NORTH, EAST);
  const eastCount = getOccupiedVisibleSeatsForDirection(seatsByRow, currentRow, currentSeat, null, EAST);
  const southEastCount = getOccupiedVisibleSeatsForDirection(seatsByRow, currentRow, currentSeat, SOUTH, EAST);
  const southCount = getOccupiedVisibleSeatsForDirection(seatsByRow, currentRow, currentSeat, SOUTH, null);
  const southWestCount = getOccupiedVisibleSeatsForDirection(seatsByRow, currentRow, currentSeat, SOUTH, WEST);

  return westCount + northWestCount + northCount + northEastCount +
    eastCount + southEastCount + southCount + southWestCount;
}

function applyRules(seatsByRow) {
  const updated = JSON.parse(JSON.stringify(seatsByRow));

  for(let row = 0; row < seatsByRow.length; ++row) {
    for(let seat = 0; seat < seatsByRow[row].length; ++seat) {
      if(seatsByRow[row][seat] == EMPTY && getAllOccupiedVisibleSeats(seatsByRow, row, seat) == 0) {
        updated[row][seat] = OCCUPIED;
      } if(seatsByRow[row][seat] == OCCUPIED && getAllOccupiedVisibleSeats(seatsByRow, row, seat) >= 5) {
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

function printResult(result) {
  result.forEach(row => console.log(row.join("")));
  console.log("\n");
}

function applyRulesUntilNoChange(seatsByRow) {
  let result = applyRules(seatsByRow);
  //printResult(result);

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
