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

function cloneShip(ship) {
  return JSON.parse(JSON.stringify(ship));
}

function moveShip(instruction, ship) {
  const updatedShip = cloneShip(ship);

  updatedShip.eWPos += ship.waypointEwPos * instruction.value;
  updatedShip.nSPos += ship.waypointNsPos * instruction.value;

  return updatedShip;
}

function moveWaypoint(instruction, ship) {
  const updatedShip = cloneShip(ship);

  switch (instruction.action) {
    case 'N':
      updatedShip.waypointNsPos += instruction.value;
      break;
    case 'S':
      updatedShip.waypointNsPos -= instruction.value;
      break;
    case 'E':
      updatedShip.waypointEwPos += instruction.value;
      break;
    case 'W':
      updatedShip.waypointEwPos -= instruction.value;
      break;
  }

  return updatedShip;
}

function rotateWaypoint(instruction, ship) {
  const updatedShip = cloneShip(ship);

  switch (instruction.action + instruction.value) {
    case 'R90':
    case 'L270':
      updatedShip.waypointEwPos = ship.waypointNsPos;
      updatedShip.waypointNsPos = -1 * ship.waypointEwPos;
      break;
    case 'R180':
    case 'L180':
      updatedShip.waypointEwPos = -1 * ship.waypointEwPos;
      updatedShip.waypointNsPos = -1 * ship.waypointNsPos;
      break;
    case 'R270':
    case 'L90':
      updatedShip.waypointEwPos = -1 * ship.waypointNsPos;
      updatedShip.waypointNsPos = ship.waypointEwPos;
      break;
  }

  return updatedShip;
}

function applyInstruction(instruction, ship) {
  let newPosition;

  switch (instruction.action) {
    case 'N':
    case 'S':
    case 'E':
    case 'W':
      newPosition = moveWaypoint(instruction, ship);
      break;
    case 'L':
    case 'R':
      newPosition = rotateWaypoint(instruction, ship);
      break;
    case 'F':
      newPosition = moveShip(instruction, ship);
      break;
  }

  return newPosition;
}

const instructionLines = readInputLines("./day-12-input.txt");
const instructions = instructionLines.map(i => parseInstruction(i));

let ship = {};
ship.eWPos = 0;
ship.nSPos = 0;
ship.waypointEwPos = 10;
ship.waypointNsPos = 1;

for(let instruction of instructions) {
  ship = applyInstruction(instruction, ship);
}

console.log(Math.abs(ship.eWPos) + Math.abs(ship.nSPos));
