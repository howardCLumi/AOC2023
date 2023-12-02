import { readFile } from "node:fs/promises";

const input = await readFile("../input.txt", "utf-8");
const array = input.split(/\r?\n/).map((line) => line.replace(/\r/g, ""));
let sum = 0;

for (const line of array) {
  sum += Number(findNumbers(line));
}

console.log(sum);

function findNumbers(line) {
  let numbers = [];

  for (const char of line) {
    if (!isNaN(Number(char))) {
      numbers.push(char);
    }
  }
  return numbers[0] + numbers[numbers.length - 1];
}
