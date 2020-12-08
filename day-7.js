function readInputLines(filePath) {
  const fs = require("fs"); // Built-in Node.js module
  const text = fs.readFileSync(filePath).toString("utf-8");
  const textByLine = text.split("\r\n")

  return textByLine;
}

function getChildComponents(childString) {
  // Example
  // 4 muted yellow bags. (. optional)
  const childObj = {};
  const regex = /^(?<qty>\d+)\s(?<color>.+)\sbag/;
  const matches = regex.exec(childString);
  childObj.qty = matches.groups.qty;
  childObj.color = matches.groups.color;

  return childObj;
}

function getRule(line) {
  // Examples
  // light red bags contain 1 bright white bag, 2 muted yellow bags.
  // bright white bags contain 1 shiny gold bag.
  // dotted black bags contain no other bags.
  const rule = {};
  const parentChildSplit = line.split(" bags contain ");
  rule.color = parentChildSplit[0];

  let children = [];
  if(!parentChildSplit[1].includes("no other bags")) {
    children = parentChildSplit[1].split(", ").map(child => getChildComponents(child));
  }
  rule.children = children;

  return rule;
}

function matchingDescendent(rules, rule, search) {
  for(let child of rule.children) {
    if(child.color == search) {
      return true;
    }
    const childRule = rules.find(r => r.color == child.color);
    if(matchingDescendent(rules, childRule, search)) {
      return true;
    }
  }
  return false;
}

const inputLines = readInputLines("./day-7-input.txt");
const rules = inputLines.map(getRule);
const search = "shiny gold";
const matchingRules = rules.filter(rule => matchingDescendent(rules, rule, search));
console.log(matchingRules.length);