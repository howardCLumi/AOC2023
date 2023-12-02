import { readFile } from "node:fs/promises";

const input = await readFile("../input.txt", "utf-8");
const array = input.split(/\r?\n/).map((line) => line.replace(/\r/g, ""));
const CUBES = { blue: 14, red: 12, green: 13 };
let sumPower = 0;
let gamePower = 1;

for (const line of array) {
  const cubes = line.split(/[;,:]+/);
  const gameCubes = sortCubes(cubes);
  let keys = Object.keys(CUBES);
  gamePower = 1;

  for (let i = 0; i < 3; ++i) {
    let key = keys[i];
    gamePower *= gameCubes[key];
  }
  sumPower += gamePower;
}
console.log(sumPower);

function sortCubes(cubes) {
  const gameCubes = {};
  for (let i = 1; i < cubes.length; ++i) {
    const numAndColor = cubes[i].split(" ");
    if (!(numAndColor[2] in gameCubes)) {
      gameCubes[numAndColor[2]] = Number(numAndColor[1]);
    }
    if (numAndColor[1] > gameCubes[numAndColor[2]]) {
      gameCubes[numAndColor[2]] = Number(numAndColor[1]);
    }
  }
  return gameCubes;
}
