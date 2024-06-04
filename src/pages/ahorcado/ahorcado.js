import "./ahorcado.css";
import { checkLetter } from "./components/checkLetter";
import { words } from "./components/words";

export const ahorcado = () => {
  const divContainer = document.querySelector(".container");
  divContainer.innerHTML = "";

  const savedGame = JSON.parse(localStorage.getItem("hangmanGame")) 
  const word = savedGame ? savedGame.word : words[Math.floor(Math.random() * words.length)].toUpperCase();
  let mistakes = {value: savedGame ? savedGame.mistakes : 0};
  let gameFinished = {value: savedGame ? savedGame.gameFinished : false};
  const wrongLetters = savedGame ? savedGame.wrongLetters : []

  const wordToGuess = document.createElement("div");
  const wrongLetter = document.createElement("p");
  const keyboardDiv = document.createElement("div");


  wordToGuess.classList.add("words");
  keyboardDiv.classList.add("keyboard-div");
  wrongLetter.classList.add("wrong-letter");

  wrongLetter.textContent = "Letras incorrectas: " + wrongLetters;



  divContainer.appendChild(wordToGuess);
  divContainer.appendChild(wrongLetter);
  divContainer.appendChild(keyboardDiv);

  const start = () => {
    for (let i = 0; i < word.length; i++){
      const span = document.createElement("span")
      span.textContent = "_ "
      span.classList.add("word")
      if (savedGame && savedGame.correctLetters.includes(word[i])){
        span.textContent = word[i] + ""
      }
      wordToGuess.appendChild(span)
    }
    
  }
  const keyboard = "QWERTYUIOPASDFGHJKLÑZXCVBNM";

  const printKeyboard = () => {
    for (const letter of keyboard) {
      const letterBtn = document.createElement("button");
      letterBtn.textContent = letter;
      letterBtn.classList.add("keyboard");
      letterBtn.disabled = savedGame ? savedGame.usedLetters.includes(letter) : false
      letterBtn.addEventListener("click", (e) =>{
        if (!gameFinished.value){
          const wordSpan = document.querySelectorAll(".word")
          const letter = e.target.textContent
          e.target.disabled = true
          checkLetter(letter, word, wordSpan, wrongLetter, mistakes, divContainer, gameFinished, wrongLetters, saveGame)
        }
      })
      keyboardDiv.appendChild(letterBtn);
    }
  };

  const saveGame = () => {
    const wordSpan = document.querySelectorAll(".word")
    const correctLetters = Array.from(wordSpan).map(span => span.textContent.trim()).filter(letter => letter !== '_')
    const usedLetters = Array.from(keyboardDiv.querySelectorAll('button:disabled')).map(btn => btn.textContent);
    const gameState = {
      word: word,
      mistakes: mistakes.value,
      gameFinished: gameFinished.value,
      correctLetters: correctLetters,
      wrongLetters: wrongLetters,
      usedLetters: usedLetters
    };
    localStorage.setItem('hangmanGame', JSON.stringify(gameState));
  };

  
  const resetButton = () => {
    const reset = document.createElement("button")
    reset.textContent = "Reset"
    reset.classList.add("reset-button")
    divContainer.appendChild(reset)
    reset.addEventListener("click", () =>{
      localStorage.removeItem("hangmanGame")
      divContainer.innerHTML = ""
    ahorcado()
    })
  }


  start()
  printKeyboard();
  resetButton()
  } 

  

