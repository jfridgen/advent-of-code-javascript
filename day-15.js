function readInput(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  return text.split(",").map(s => parseInt(s));
}

const numbers = readInput("./day-15-input.txt");
numbers.push(0);
for(let i = numbers.length; i <= 2019; ++i) {
  if(!numbers.slice(0, i - 1).includes(numbers[i - 1])) {
    numbers.push(0);
  } else {
    numbers.push((i - 1) - numbers.slice(0, i - 1).lastIndexOf(numbers[i - 1]));
  }
}
console.log(numbers.pop());