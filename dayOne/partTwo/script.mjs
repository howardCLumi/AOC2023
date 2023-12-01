import { fileURLToPath } from "node:url";
import { readFile } from "node:fs/promises";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, "../input.txt");
const input = await readFile(filePath, "utf-8");
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
