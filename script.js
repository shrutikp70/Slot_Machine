const SYMBOLS = ["A", "B", "C", "D"];

const ROWS = 3;
const COLS = 3;

const SYMBOL_VALUES = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
};

const outputElement = document.getElementById("output");
const spinButton = document.getElementById("spinButton");
spinButton.addEventListener("click", playGame);

function playGame() {
  const reels = spin();
  const rows = transpose(reels);
  const winnings = getWinnings(rows);
  displayResult(rows, winnings);
}

function spin() {
  const reels = [];

  for (let i = 0; i < COLS; i++) {
    const reel = [];

    for (let j = 0; j < ROWS; j++) {
      const randomSymbol = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      reel.push(randomSymbol);
    }

    reels.push(reel);
  }

  return reels;
}

function transpose(reels) {
  const rows = [];

  for (let i = 0; i < ROWS; i++) {
    const row = [];

    for (let j = 0; j < COLS; j++) {
      row.push(reels[j][i]);
    }

    rows.push(row);
  }

  return rows;
}

function getWinnings(rows) {
  let winnings = 0;

  for (const symbols of rows) {
    if (symbols.every((symbol) => symbol === symbols[0])) {
      winnings += SYMBOL_VALUES[symbols[0]];
    }
  }

  return winnings;
}

function displayResult(rows, winnings) {
  outputElement.innerHTML = "";

  for (const row of rows) {
    const rowElement = document.createElement("div");
    rowElement.textContent = row.join(" | ");
    outputElement.appendChild(rowElement);
  }

  const winningsMessage = document.createElement("p");
  winningsMessage.textContent = "You won $" + winnings;
  outputElement.appendChild(winningsMessage);
}
