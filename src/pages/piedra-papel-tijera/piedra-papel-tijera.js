import "./piedra-papel-tijera.css";

export const PPT = () => {
  const divContainer = document.querySelector(".container");
  divContainer.innerHTML = "";

  const TIE = 0;
  const WIN = 1;
  const LOSS = 2;

  const ROCK = "piedra";
  const PAPER = "papel";
  const SCISSORS = "tijeras";

  let compCounter = 0
  let userCounter = 0

  const container = document.createElement("div")
  const divCounter = document.createElement("div");
  const counter = document.createElement("p");
  const resMessage = document.createElement("p");
  const btnDiv = document.createElement("div");
  const rockbtn = document.createElement("img");
  const scissorsbtn = document.createElement("img");
  const paperbtn = document.createElement("img");
  const playDiv = document.createElement("div")
  const userImg = document.createElement("img");
  const computerImg = document.createElement("img");

  rockbtn.src = "public/piedra.png";
  scissorsbtn.src = "public/tijeras.png";
  paperbtn.src = "public/papel.png";

  container.classList.add("ppt-container")
  divCounter.classList.add("counter-div")
  btnDiv.classList.add("img-container");
  rockbtn.classList.add("img");
  scissorsbtn.classList.add("img");
  paperbtn.classList.add("img");
  playDiv.classList.add("play-div")
  userImg.classList.add("img");
  computerImg.classList.add("img");
  counter.classList.add("counter")

  counter.textContent =`user  ${userCounter} : ${compCounter}  computer`

  divCounter.appendChild(counter);
  btnDiv.appendChild(rockbtn);
  btnDiv.appendChild(paperbtn);
  btnDiv.appendChild(scissorsbtn);
  playDiv.appendChild(userImg)
  playDiv.appendChild(resMessage)
  playDiv.appendChild(computerImg)
  container.appendChild(divCounter);
  container.appendChild(playDiv)
  container.appendChild(btnDiv);
  divContainer.appendChild(container)

  rockbtn.addEventListener("click", () => {
    play(ROCK);
  });
  paperbtn.addEventListener("click", () => {
    play(PAPER);
  });
  scissorsbtn.addEventListener("click", () => {
    play(SCISSORS);
  });

  const play = (userOption, savedGame) => {

    const computerOption = calcMachineOption();
    const result = calcResult(userOption, computerOption);

    userImg.src = "public/" + userOption + ".png";
    computerImg.src = "public/" + computerOption + ".png";
    
    if (result === TIE ){
        resMessage.textContent = "Habeis empatado!"
    }else if (result === WIN){
        resMessage.textContent = "Has Ganado"
        userCounter++
    }else {
        resMessage.textContent = "Has perdido"
        compCounter++
    }
    counter.textContent =`user  ${userCounter} : ${compCounter}  computer`
    saveGame()
  };

  const calcMachineOption = () => {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
      case 0:
        return ROCK;
      case 1:
        return PAPER;
      case 2:
        return SCISSORS;
    }
  };

  const calcResult = (userOption, computerOption) => {
    if (userOption === computerOption) {
      return TIE;
    } else if (userOption === ROCK) {
      if (computerOption === PAPER) return LOSS;
      if (computerOption === SCISSORS) return WIN;
    } else if (userOption === PAPER) {
      if (computerOption === SCISSORS) return LOSS;
      if (computerOption === ROCK) return WIN;
    } else if (userOption === SCISSORS) {
      if (computerOption === ROCK) return LOSS;
      if (computerOption === PAPER) return WIN;
    }
  };

 
   const saveGame = () => {
    const gameState = {
        userCounter,
        compCounter,
    }
    localStorage.setItem("ppt", JSON.stringify(gameState))
   }


  const loadGame = () => {
    const savedGame = localStorage.getItem("ppt")
    if (savedGame){
        const gameState = JSON.parse(savedGame)
        userCounter = gameState.userCounter
        compCounter = gameState.compCounter
        counter.textContent = `user  ${userCounter} : ${compCounter}  computer`
    }
  }

  loadGame()

  const resetBtn = document.createElement("button")
  resetBtn.textContent = "Reset"
  resetBtn.classList.add("reset")
  resetBtn.addEventListener("click", () => {
  divContainer.innerHTML = ""
    localStorage.clear()
    PPT()
  })
  divContainer.appendChild(resetBtn)


};
