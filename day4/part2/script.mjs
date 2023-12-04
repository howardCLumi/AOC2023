import { readFile } from "node:fs/promises";

const input = await readFile("../input.txt", "utf-8");
const lotteryCards = formatLotteryCards(input); // { game: [ [winningNumbers], [cardNumbers] ] }

function main() {
  console.log(totalScratchCards(lotteryCards));
}

function totalScratchCards(lotteryCards) {
  console.log(lotteryCards);
  if (lotteryCards == {}) {
    return 0;
  }
  let totalScratchCards = 0;

  for (const [game, cardNumbers] of Object.entries(lotteryCards)) {
    totalScratchCards += calculateNumberOfCards(game, cardNumbers);
  }

  return totalScratchCards;
}

function calculateNumberOfCards(game, cardNumbers) {
  console.log(game);
  console.log(cardNumbers);
  const [winningNumbers, playerNumbers] = [cardNumbers[0], cardNumbers[1]];
  let [amountOfMatches, scratchCards] = [0, 1];

  for (const number of playerNumbers) {
    if (!winningNumbers.includes(number)) continue;
    amountOfMatches += 1;
  }

  const newCards = newWinningCards(game, amountOfMatches);
  scratchCards += totalScratchCards(newCards);

  process.exit();

  return scratchCards;
}

function newWinningCards(game, amountOfMatches) {
  const newLotteryCards = {};

  for (let i = Number(game) + 1; i <= game + amountOfMatches; i++) {
    newLotteryCards[i] = lotteryCards[i];
  }

  return newLotteryCards;
}

function formatLotteryCards(input) {
  const lotteryGames = {};
  const inputFormatted = input
    .split(/\r?\n/)
    .map((line) => line.replace(/\r/g, ""));
  for (const game of inputFormatted) {
    const gameFormatted = game.split(/:|\|/);

    lotteryGames[gameFormatted[0].replace(/[^0-9]/g, "")] = [
      gameFormatted[1].split(" ").filter((value) => value !== ""),
      gameFormatted[2].split(" ").filter((value) => value !== ""),
    ];
  }
  return lotteryGames;
}
main();
