const isWordGuessed = (wordSpan) => {
  return Array.from(wordSpan).every((span) =>
    span.classList.contains("guessed")
  );
};

export const checkLetter = (
  letter,
  word,
  wordSpan,
  wrongLetter,
  mistakes,
  divContainer,
  gameFinished,
  wrongLetters,
  saveGame
) => {
  let found = false;

  wordSpan.forEach((span, index) => {
    if (word[index] === letter) {
      span.textContent = letter;
      span.classList.add("guessed");
      found = true;
    }
  });

  if (!found) {
    mistakes.value++;
    wrongLetters.push(letter);
    wrongLetter.textContent = `Letras incorrectas: ${wrongLetters.join(", ")}`;
    if (mistakes.value === 6) {
      const loss = document.createElement("p");
      loss.textContent = `Has perdido, la palabra era: ${word}`;
      loss.classList.add("final-text");
      divContainer.appendChild(loss);
      gameFinished.value = true;
    }
  }
  
  if (isWordGuessed(wordSpan)) {
    const win = document.createElement("p");
    win.textContent = "Has ganado!";
    win.classList.add("final-text");
    divContainer.appendChild(win);
    gameFinished.value = true;
  }

  saveGame();
};
