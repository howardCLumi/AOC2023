import { readFile } from "node:fs/promises";
import { join } from "node:path";

const input = await readFile("../input.txt", "utf-8");
const SCHEMATIC = input.split(/\r?\n/).map((line) => line.replace(/\r/g, ""));
const specialChar = /[^a-zA-Z0-9.]/;

function main() {
  const engineNumSum = findEngineNumSum(SCHEMATIC);
  console.log(engineNumSum);
}

function findEngineNumSum(schematic) {
  let engineNumSum = 0;
  for (let i = 0; i < schematic.length; i++) {
    for (let j = 0; j < schematic[i]?.length; j++) {
      if (specialChar.test(schematic[i][j])) {
        const { numberResult, arrayResult } = addNumbers(
          schematic,
          [schematic[i - 1], schematic[i], schematic[i + 1]],
          j
        );
        engineNumSum += numberResult;
        for (let k = 0; k < arrayResult.length; k++) {
          if (arrayResult !== undefined) {
            schematic[i - 1 + k] = arrayResult[k];
          }
        }
      }
    }
  }
  return engineNumSum;
}

function addNumbers(schematic, schematicLines, specialIndex) {
  let sum = 0;

  for (let i = 0; i < schematicLines.length; i++) {
    if (schematicLines[i] !== undefined) {
      const { numberResult, stringResult } = checkNearbyNums(
        schematic,
        schematicLines[i],
        specialIndex
      );
      sum += numberResult;
      if (schematicLines[i] !== undefined) {
        schematicLines[i] = stringResult;
      }
    }
  }
  return { numberResult: sum, arrayResult: schematicLines };
}

function checkNearbyNums(schematic, line, specialIndex) {
  let sumOfNearbyNums = 0;

  for (let i = -1; i < 2; i++) {
    if (!isNaN(Number(line[specialIndex + i]))) {
      const { arrayResult, stringResult } = findNum(line, specialIndex + i);
      for (const num of arrayResult) {
        sumOfNearbyNums += Number(num);
      }
      line = stringResult;
    }
  }
  return { numberResult: sumOfNearbyNums, stringResult: line };
}

function findNum(line, specialIndex) {
  let num = "";
  let count = 0;
  let nums = [];
  let arrayLine = line.split("");
  const specialChar = /[^a-zA-Z0-9]/;

  while (!isNaN(Number(line[specialIndex]))) {
    count += 1;
    specialIndex -= 1;
  }
  let lumi = specialIndex + 1;

  for (let i = lumi; i < arrayLine.length; i++) {
    if (specialChar.test(arrayLine[i])) {
      nums.push(num);
      break;
    }
    if (!isNaN(Number(arrayLine[i]))) {
      num += line[i];
      arrayLine[i] = ".";
    }
    if (i == arrayLine.length - 1) {
      nums.push(num);
    }
  }

  line = arrayLine.join("");

  return { arrayResult: nums, stringResult: line };
}

main();
