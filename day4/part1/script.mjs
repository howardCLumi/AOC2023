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

  for (const number of playerNumbers) {
    if (!winningNumbers.includes(number)) continue;
    gamePoints = gamePoints === 0 ? 1 : gamePoints * 2;
  }
  return gamePoints;
}

function formatLotteryCards(input) {
  const lotteryGames = {};
  const inputFormatted = input
    .split(/\r?\n/)
    .map((line) => line.replace(/\r/g, ""));
  for (const game of inputFormatted) {
    const gameFormatted = game.split(/:|\|/);

    lotteryGames[gameFormatted[0].split(" ").pop()] = [
      gameFormatted[1].split(" ").filter((value) => value !== ""),
      gameFormatted[2].split(" ").filter((value) => value !== ""),
    ];
  }
  return lotteryGames;
}
main();
