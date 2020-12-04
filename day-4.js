function readInputSplitByBlankLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textSplitByBlankLine = text.split("\r\n\r\n").map(line => line.replace(/\r\n/g, " "));

  return textSplitByBlankLine;
}

function isValidYear(year, min, max) {
  if(year.match(/^\d{4}$/) == null) {
    return false;
  }

  if(year < min || year > max) {
    return false;
  }

  return true;
}

function isValidHeight(height) {
  const regex = /^(?<qty>\d+)(?<unit>cm|in)$/;
  const matches = regex.exec(height);

  if(matches == null) {
    return false;
  }

  if(matches.groups.unit == "cm") {
    if(matches.groups.qty < 150 || matches.groups.qty > 193) {
      return false;
    }
  }

  if(matches.groups.unit == "in") {
    if(matches.groups.qty < 59 || matches.groups.qty > 76) {
      return false;
    }
  }

  return true;
}

function isValidHairColor(hairColor) {
  if(hairColor.match(/^#(\d|[a-f]){6}$/) == null) {
    return false;
  }

  return true;
}

function isValidEyeColor(eyeColor) {
  if(eyeColor.match(/^(amb|blu|brn|gry|grn|hzl|oth){1}$/) == null) {
    return false;
  }

  return true;
}

function isValidPassportId(pid) {
  if(pid.match(/^\d{9}$/) == null) {
    return false;
  }

  return true;
}

function isPassportValid(passport) {
  const requiredProps = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const actualProps = Object.keys(passport);

  const hasAllReqProps = requiredProps.every((prop) => {
    return actualProps.indexOf(prop) !== -1;
  });

  if(!hasAllReqProps) {
    return false;
  }

  if(!isValidYear(passport.byr, 1920, 2002)) {
    return false;
  }
  if(!isValidYear(passport.iyr, 2010, 2020)) {
    return false;
  }
  if(!isValidYear(passport.eyr, 2020, 2030)) {
    return false;
  }
  if(!isValidHeight(passport.hgt)) {
    return false;
  }
  if(!isValidHairColor(passport.hcl)) {
    return false;
  }
  if(!isValidEyeColor(passport.ecl)) {
    return false;
  }
  if(!isValidPassportId(passport.pid)) {
    return false;
  }

  return true;
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
