function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function parseOperation(opString) {
  const regex = /^(?<op>[a-z]{3})\s(?<qtySign>[\+\-]{1})(?<qty>\d+)/;
  const matches = regex.exec(opString);

  const opObj = {};
  opObj.op = matches.groups.op;
  opObj.qty = parseInt(matches.groups.qty);
  if(matches.groups.qtySign == "-") {
    opObj.qty = opObj.qty * -1;
  }
  opObj.executed = false;

  return opObj;
}

function getAcc(ops) {
  let i = 0;
  let acc = 0;
  while(i < ops.length && !ops[i].executed) {
    ops[i].executed = true;

    if(ops[i].op == 'nop') {
      i += 1;
    } else if(ops[i].op == 'acc') {
      acc += ops[i].qty;
      i += 1;
    } else if(ops[i].op == 'jmp') {
      i += ops[i].qty;
    }
  }

  // Reset executed
  for(let op of ops) {
    op.executed = false;
  }

  if (i == ops.length) {
    return acc;
  }

  // Infinite loop
  return 0;
}

function iterateOps(ops) {
  let acc = 0;
  for(let op of ops) {
    if(op.op == 'nop') {
      op.op = 'jmp';
      acc = getAcc(ops);
      if (acc != 0) {
        return acc;
      }
      op.op = 'nop';
    } else if(op.op == 'jmp') {
      op.op = 'nop';
      acc = getAcc(ops);
      if (acc != 0) {
        return acc;
      }
      op.op = 'jmp';
    }
  }
  return 0;
}

const inputLines = readInputLines("./day-8-input.txt");
const ops = inputLines.map(line => parseOperation(line));
const acc = iterateOps(ops);

console.log(acc);
