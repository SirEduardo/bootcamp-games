import "./whac-a-mole.css";
import { board } from "./components/board";

export const whacAMole = () => {
  const divContainer = document.querySelector(".container");
  divContainer.innerHTML = "";

  let time = 60;
  let SCORE = 0;
  let gameEnded = false;
  let lastCellIndex = -1

  const score = document.createElement("p");
  const divCount = document.createElement("div");
  const counter = document.createElement("p");

  score.textContent = `Score: ${SCORE}`;

  divCount.appendChild(counter);
  divContainer.appendChild(score);
  divContainer.appendChild(divCount);

  const cells = document.querySelectorAll(".cells");
  const cellStates = Array.from(cells).map(() => false)


  const countdown = () => {
    counter.textContent = `Quedan: ${time} segundos`;
    if (time <= 0) {
      clearInterval(countdownInterval);
      endGame("Has perdido!")
    }
    time--;
  };
  const countdownInterval = setInterval(countdown, 1000);

  board();

  const moleAppearance = setInterval(() => {
    if (!gameEnded) {
      const randomCellIndex = getRandomEmptyCellIndex();
      if (randomCellIndex !== -1) {
        const moleImg = document.createElement("img");
        moleImg.src = "./assets/topo.png";
        moleImg.classList.add("mole");
        const randomCell = cells[randomCellIndex];
        randomCell.appendChild(moleImg);
        cellStates[randomCellIndex] = true
        setTimeout(() => {
          if (randomCell.contains(moleImg)) { 
            randomCell.removeChild(moleImg);
            cellStates[randomCellIndex] = false
          }
          }, 2000);
          lastCellIndex = randomCellIndex;
        }
      }
  }, 1000);


  const getRandomEmptyCellIndex = () => {
    const emptyCellIndices = cellStates.reduce((acc, state, index) => {
      if (!state) acc.push(index);
      return acc;
    }, []);
    if (emptyCellIndices.length === 0) {
      return -1;
    }
    return emptyCellIndices[Math.floor(Math.random() * emptyCellIndices.length)];
  };

  const handleClick = (event) => {
    if (!gameEnded && event.target.classList.contains("mole")) {
      SCORE++;
      score.textContent = `Score: ${SCORE}`;
      const moleImg = event.target;
      const moleContainer = moleImg.parentNode;
      const moleCell = moleContainer.parentNode;
      const cellIndex = Array.from(moleCell.parentNode.children).indexOf(moleCell);
      moleContainer.removeChild(moleImg);
      cellStates[cellIndex] = false; 
      checkWinner();
    }
  };
  divContainer.addEventListener("click", handleClick);

  const checkWinner = () => {
    if (score >= 20) {
      endGame("HAS GANADO!!!");
    }
  };

  const endGame = (message) => {
    const endMessage = document.createElement("p");
    endMessage.textContent = message;
    divContainer.appendChild(endMessage);
    clearInterval(countdownInterval);
    gameEnded = true;
    divContainer.removeEventListener("click", handleClick);
  };

};
