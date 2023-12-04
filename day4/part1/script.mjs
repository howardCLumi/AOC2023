import { readFile } from "node:fs/promises";

const input = await readFile("../input.txt", "utf-8");

function main() {
  const lotteryCards = formatLotteryCards(input); // { game: [ [winningNumbers], [cardNumbers] ] }
  console.log(totalPoints(lotteryCards));
}

function totalPoints(lotteryCards) {
  let totalPoints = 0;

  for (const [game, cardNumbers] of Object.entries(lotteryCards)) {
    totalPoints += calculateGamePoints(cardNumbers);
  }

  return totalPoints;
}

function calculateGamePoints(cardNumbers) {
  const winningNumbers = cardNumbers[0];
  const playerNumbers = cardNumbers[1];
  let gamePoints = 0;
  const matchingNumbers = [];
  let matchingNumber = 0;

  for (const number of playerNumbers) {
    winningNumbers.includes(number)
      ? gamePoints !== 0
        ? (gamePoints *= 2) &&
          (matchingNumber += 1) &&
          matchingNumbers.push(number)
        : (gamePoints = 1) &&
          (matchingNumber += 1) &&
          matchingNumbers.push(number)
      : undefined;
  }
  console.log(cardNumbers);
  console.log(matchingNumber);
  console.log(matchingNumbers);
  process.exit();
  return gamePoints;
}

function formatLotteryCards(input) {
  const lotteryGames = {};
  const inputFormatted = input
    .split(/\r?\n/)
    .map((line) => line.replace(/\r/g, ""));
  for (const game of inputFormatted) {
    const gameFormatted = game.split(/:|\|/);

    lotteryGames[gameFormatted[0].split(" ")[1]] = [
      gameFormatted[1].split(" ").filter((value) => value !== ""),
      gameFormatted[2].split(" ").filter((value) => value !== ""),
    ];
  }
  return lotteryGames;
}
main();
