function readInput(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  return text.split(",").map(s => parseInt(s));
}

const startingNumbers = readInput("./day-15-input.txt");

const map = new Map();
for(let number of startingNumbers) {
  map.set(number, startingNumbers.indexOf(number) + 1);
}

function playTurn(currentTurn, lastNumberSpoken) {
  if(map.has(lastNumberSpoken)) {
    let lastTurnSpoken = currentTurn - map.get(lastNumberSpoken);
    map.set(lastNumberSpoken, currentTurn);
    return lastTurnSpoken;
  }

  map.set(lastNumberSpoken, currentTurn);
  return 0;
}

let lastNumberSpoken = playTurn(startingNumbers.length + 1, 0);
for(let i = startingNumbers.length + 2; i < 30000000; ++i) {
  lastNumberSpoken = playTurn(i, lastNumberSpoken);
}
console.log(lastNumberSpoken);
