
export   const checkLetter = (letter, word, wordSpan, wrongLetter, mistakes, divContainer, gameFinished, wrongLetters, saveGame) => {
    

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
      wrongLetters.push(letter)
      wrongLetter.textContent += letter + ", "
      if (mistakes.value === 6){
        const loss = document.createElement("p")
        loss.textContent = `Has perdido, la palabra era: ${word}`
        loss.classList.add("final-text")
        divContainer.appendChild(loss)
        gameFinished.value = true
        
      }
    } else {
      if (!gameFinished.value && Array.from(wordSpan).every(span => span.classList.contains("guessed"))) {
        const win = document.createElement("p")
        win.textContent = "Has ganado!"
        win.classList.add("final-text")
        divContainer.appendChild(win)
        gameFinished.value = true
   
      }
    }
    saveGame()

  }
