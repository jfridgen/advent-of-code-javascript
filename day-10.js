function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function getCombinations(list, max, start, lookup) {
  if(start != 0 && !list.includes(start)) {
    return 0;
  }

  if(start == max) {
    return 1;
  }

  let plus1Combos;
  if(lookup.has(start+1)) {
    plus1Combos = lookup.get(start+1);
  } else{
    plus1Combos = getCombinations(list, max, start+1, lookup);
    lookup.set(start+1, plus1Combos);
  }

  let plus2Combos;
  if(lookup.has(start+2)) {
    plus2Combos = lookup.get(start+2);
  } else{
    plus2Combos = getCombinations(list, max, start+2, lookup);
    lookup.set(start+2, plus2Combos);
  }

  let plus3Combos;
  if(lookup.has(start+3)) {
    plus3Combos = lookup.get(start+3);
  } else{
    plus3Combos = getCombinations(list, max, start+3, lookup);
    lookup.set(start+3, plus3Combos);
  }

  return plus1Combos + plus2Combos + plus3Combos;
}

const allNums = readInputLines("./day-10-input.txt").map(line => parseInt(line));
const max = Math.max(...allNums);
const lookup = new Map();
const combos = getCombinations(allNums, max, 0, lookup);
console.log(combos);