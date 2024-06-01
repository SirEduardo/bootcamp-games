import "./3-en-raya.css";
import { board } from "./components/board";

export const ticTacToe = () => {
  const divContainer = document.querySelector(".container");
  divContainer.innerHTML = "";

  const selectDiv = document.createElement("div");
  const btnX = document.createElement("button");
  const bntO = document.createElement("button");
  const turnDiv = document.createElement("div");
  const turn = document.createElement("p");

  btnX.textContent = "X";
  bntO.textContent = "O";

  selectDiv.classList.add("select-container");
  btnX.classList.add("select-button");
  bntO.classList.add("select-button");

  selectDiv.appendChild(btnX);
  selectDiv.appendChild(bntO);
  turnDiv.appendChild(turn);
  divContainer.appendChild(selectDiv);
  divContainer.appendChild(turn);

  board();

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (cells) => {
    for (const combinations of winningCombinations) {
      const [a, b, c] = combinations;
      if (
        cells[a].textContent &&
        cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent
      ) {
        return cells[a].textContent;
      }
    }
    return null;
  };

  const saveGame = (currentPlayer, moves, cells) => {
    const game = {
      currentPlayer,
      moves,
      board: Array.from(cells).map((cell) => cell.textContent),
    };
    localStorage.setItem("ticTacToeGame", JSON.stringify(game));
  };

  const loadGame = () => {
    const savedGame = localStorage.getItem("ticTacToeGame");
    if (savedGame) {
      return JSON.parse(savedGame);
    }
    return null;
  };

  const play = (startingPlayer, savedGame) => {
    let currentPlayer = savedGame ? savedGame.currentPlayer : startingPlayer;
    turn.textContent = `Turno de: ${currentPlayer}`;

    let moves = savedGame ? savedGame.moves : 0;
    const cells = document.querySelectorAll(".cell");

    if (savedGame) {
      savedGame.board.forEach((value, index) => {
        cells[index].textContent = value;
        if (value) {
          cells.textContent;
        }
      });
      turn.textContent = `Turno de: ${currentPlayer}`;
    }

    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (cell.textContent === "" && !checkWinner(cells)) {
          cell.textContent = currentPlayer;

          moves++;

          const winner = checkWinner(cells);
          if (winner) {
            turn.textContent = `${winner} HA GANADO!`;
          } else if (moves === 9) {
            turn.textContent = "ES UN EMPATE!";
          } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            turn.textContent = `Turno de: ${currentPlayer}`;
            saveGame(currentPlayer, moves, cells);
          }
        }
      });
    });
  };

  const savedGame = loadGame();
  if (savedGame) {
    play(savedGame.currentPlayer, savedGame);
    selectDiv.style.display = "none";
  } else {
    btnX.addEventListener("click", () => {
      play("X");
      selectDiv.style.display = "none";
    });
    bntO.addEventListener("click", () => {
      play("O");
      selectDiv.style.display = "none";
    });
  }

  const reset = document.createElement("button");
  reset.textContent = "Reset";
  reset.classList.add("reset");

  reset.addEventListener("click", () => {
    const divContainer = document.querySelector(".container");
    divContainer.innerHTML = "";
    localStorage.clear("ticTacToe");
    ticTacToe();
  });
  divContainer.appendChild(reset);
};
