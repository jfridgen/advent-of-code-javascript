function readInputSplitByBlankLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textSplitByBlankLine = text.split("\r\n\r\n").map(line => line.replace(/\r\n/g, " "));

  return textSplitByBlankLine;
}

function isPassportValid(passport) {
  const requiredProps = ["iyr", "byr", "hcl", "eyr", "hgt", "pid", "ecl"];
  const actualProps = Object.keys(passport);

  return requiredProps.every((prop) => {
    return actualProps.indexOf(prop) !== -1;
  });
}

function createPassportObject(line) {
  const allPropVals = line.split(/\s/);

  let passport = {};

  let propValSplit;
  for(propVal of allPropVals) {
    propValSplit = propVal.split(":");
    passport[propValSplit[0]] = propValSplit[1];
  }

  passport.valid = isPassportValid(passport);

  return passport;
}

const passportLines = readInputSplitByBlankLines("./day-4-input.txt");
console.log(passportLines.map(createPassportObject).filter(passport => passport.valid).length);
