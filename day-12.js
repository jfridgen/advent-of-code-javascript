const { dir } = require("console");

function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function parseInstruction(instructionString) {
  const regex = /^(?<action>[A-Z]{1})(?<value>[0-9]+)/;
  const matches = regex.exec(instructionString);

  const instruction = {};
  instruction.action = matches.groups.action;
  instruction.value = parseInt(matches.groups.value);

  return instruction;
}

function clonePosition(currentPosition) {
  return JSON.parse(JSON.stringify(currentPosition));
}

function moveInDirection(direction, value, currentPosition) {
  const newPosition = clonePosition(currentPosition);

  switch (direction) {
    case 'N':
      newPosition.nSPos += value;
      break;
    case 'S':
      newPosition.nSPos -= value;
      break;
    case 'E':
      newPosition.eWPos += value;
      break;
    case 'W':
      newPosition.eWPos -= value;
      break;
  }

  return newPosition;
}

function translateDegreesToDirection(degrees) {
  switch (degrees) {
    case 0:
      return 'W';
    case 90:
      return 'N';
    case 180:
      return 'E';
    case 270:
      return 'S';
  }
}

function translateDirectionToDegress(direction) {
  switch (direction) {
    case 'W':
      return 0;
    case 'N':
      return 90;
    case 'E':
      return 180;
    case 'S':
      return 270;
  }
}

function turnRightOrLeft(rightLeft, value, currentPosition) {
  const newPosition = clonePosition(currentPosition);
  const degreesFacing = translateDirectionToDegress(currentPosition.directionFacing);
  let newDegreesFacing;
  if(rightLeft == 'R') {
    newDegreesFacing = (degreesFacing + value) % 360;
  } else if(rightLeft == 'L') {
    newDegreesFacing = degreesFacing - value;
    if(newDegreesFacing < 0) {
      newDegreesFacing += 360;
    }
  }
  newPosition.directionFacing = translateDegreesToDirection(newDegreesFacing);

  return newPosition;
}

function applyInstruction(instruction, currentPosition) {
  let newPosition;

  switch (instruction.action) {
    case 'N':
    case 'S':
    case 'E':
    case 'W':
      newPosition = moveInDirection(instruction.action, instruction.value, currentPosition);
      break;
    case 'L':
      newPosition = turnRightOrLeft('L', instruction.value, currentPosition);
      break;
    case 'R':
      newPosition = turnRightOrLeft('R', instruction.value, currentPosition);
      break;
    case 'F':
      newPosition = moveInDirection(currentPosition.directionFacing, instruction.value, currentPosition);
      break;
  }

  return newPosition;
}

const instructionLines = readInputLines("./day-12-input.txt");
const instructions = instructionLines.map(i => parseInstruction(i));

let position = {};
position.eWPos = 0;
position.nSPos = 0;
position.directionFacing = 'E';

for(let instruction of instructions) {
  position = applyInstruction(instruction, position);
}

console.log(Math.abs(position.eWPos) + Math.abs(position.nSPos));
