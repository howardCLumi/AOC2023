import { readFile } from "node:fs/promises";

const input = await readFile("../input.txt", "utf-8");
const array = input.split(/\r?\n/).map((line) => line.replace(/\r/g, ""));
let sum = 0;

const numbers = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

for (const line of array) {
  sum += Number(findNumbers(line));
}

console.log(sum);

function findNumbers(line) {
  let arrayOfNumbers = [];
  let example = line;

  for (let num in numbers) {
    example = example.replaceAll(num, num + numbers[num] + num);
  }

  for (const char of example) {
    if (!isNaN(Number(char))) {
      arrayOfNumbers.push(char);
    }
  }
  return arrayOfNumbers[0] + arrayOfNumbers[arrayOfNumbers.length - 1];
}
