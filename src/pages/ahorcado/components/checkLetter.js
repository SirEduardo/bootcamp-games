
export   const checkLetter = (letter, word, wordSpan, wrongLetter, mistakes, divContainer, gameFinished) => {
    

    let found = false
    

    for (let i = 0; i < word.length; i++ ){
      if (word[i] === letter){
        wordSpan[i].innerHTML = letter
        wordSpan[i].classList.add("guessed")
        found = true
      }
    }

    if (!found){
      mistakes.value++
      wrongLetter.textContent += letter + " "
      if (mistakes.value >=6){
        const lose = document.createElement("p")
        lose.textContent = `Has perdido, la palabra era: ${word}`
        lose.classList.add("final-text")
        divContainer.appendChild(lose)
        gameFinished.value = true
        resetButton(divContainer)
      }
    } else {
      if (Array.from(wordSpan).every(span => span.classList.contains("guessed"))) {
        const win = document.createElement("p")
        win.textContent = "Has ganado!"
        win.classList.add("final-text")
        divContainer.appendChild(win)
        gameFinished.value = true
        resetButton(divContainer)
      }
    }

  }
  const resetButton = (divContainer) => {
    const reset = document.createElement("button")
    reset.textContent = "Reset"
    reset.classList.add("reset-button")
    divContainer.appendChild(reset)
    reset.addEventListener("click", () =>{
      divContainer.innerHTML = ""
      import("../ahorcado").then(module => module.ahorcado())
    })
  }