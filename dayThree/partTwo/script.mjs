import { readFile } from "node:fs/promises";
import { join } from "node:path";

const input = await readFile("../input.txt", "utf-8");
const SCHEMATIC = input.split(/\r?\n/).map((line) => line.replace(/\r/g, ""));
const specialChar = "*";

function main() {
  const gearRatioSum = findEngineNumSum(SCHEMATIC);
  console.log(gearRatioSum);
}

function findEngineNumSum(schematic) {
  let gearRatioSum = 0;
  for (let i = 0; i < schematic.length; i++) {
    for (let j = 0; j < schematic[i]?.length; j++) {
      if (schematic[i][j] == specialChar) {
        const { numberResult, arrayResult } = addNumbers(
          schematic,
          [schematic[i - 1], schematic[i], schematic[i + 1]],
          j
        );
        gearRatioSum += numberResult;
        for (let k = 0; k < arrayResult.length; k++) {
          if (arrayResult !== undefined) {
            schematic[i - 1 + k] = arrayResult[k];
          }
        }
      }
    }
  }
  return gearRatioSum;
}

function addNumbers(schematic, schematicLines, specialIndex) {
  let sum = 0;
  const totalNumberArray = [];
  let gearRatio = 0;

  for (let i = 0; i < schematicLines.length; i++) {
    if (schematicLines[i] !== undefined) {
      const { arrayResult, stringResult } = checkNearbyNums(
        schematic,
        schematicLines[i],
        specialIndex
      );

      if (schematicLines[i] !== undefined) {
        schematicLines[i] = stringResult;
      }
      totalNumberArray.push(...arrayResult);
    }
  }
  if (totalNumberArray.length == 2) {
    gearRatio = totalNumberArray[0] * totalNumberArray[1];
  }
  return { numberResult: gearRatio, arrayResult: schematicLines };
}

function checkNearbyNums(schematic, line, specialIndex) {
  let numberArray = [];
  for (let i = -1; i < 2; i++) {
    if (!isNaN(Number(line[specialIndex + i]))) {
      const { arrayResult, stringResult } = findNum(line, specialIndex + i);
      line = stringResult;
      numberArray.push(...arrayResult);
    }
  }
  return { arrayResult: numberArray, stringResult: line };
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
