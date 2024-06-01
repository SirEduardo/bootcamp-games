import "./ahorcado.css";
import { checkLetter } from "./components/checkLetter";
import { words } from "./components/words";

export const ahorcado = () => {
  const divContainer = document.querySelector(".container");
  divContainer.innerHTML = "";


  const word = words[Math.floor(Math.random() * words.length)].toUpperCase();

  let mistakes = {value: 0};
  let gameFinished = {value: false};

  const wordToGuess = document.createElement("div");
  const wrongLetter = document.createElement("p");
  const keyboardDiv = document.createElement("div");

  wordToGuess.classList.add("words");
  keyboardDiv.classList.add("keyboard-div");
  wrongLetter.classList.add("wrong-letter");

  wrongLetter.textContent = "Letras incorrectas: ";

  divContainer.append(wordToGuess);
  divContainer.append(wrongLetter);
  divContainer.appendChild(keyboardDiv);

  const start = () => {
    for (let i = 0; i < word.length; i++){
      const span = document.createElement("span")
      span.textContent = "_ "
      span.classList.add("word")
      wordToGuess.appendChild(span)
    }
  }
  const keyboard = "QWERTYUIOPASDFGHJKLÑZXCVBNM";

  const printKeyboard = () => {
    for (const letter of keyboard) {
      const letterBtn = document.createElement("button");
      letterBtn.textContent = letter;
      letterBtn.classList.add("keyboard");
      letterBtn.addEventListener("click", (e) =>{
        if (!gameFinished.value){
          const wordSpan = document.querySelectorAll(".word")
          checkLetter(e.target.textContent, word, wordSpan, wrongLetter, mistakes, divContainer, gameFinished)
        }
      })
      keyboardDiv.appendChild(letterBtn);
    }
  };

  start()
  printKeyboard();
  
  } 

  

