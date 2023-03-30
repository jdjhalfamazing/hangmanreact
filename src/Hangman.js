import React, { useState, useEffect } from 'react';

const Hangman = ({ word, maxGuesses = 6 }) => {
  const [guesses, setGuesses] = useState([]);
  const [remainingGuesses, setRemainingGuesses] = useState(maxGuesses);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const letters = word.split('');
    setGuesses(letters.map(letter => ({
      letter,
      guessed: false
    })));
  }, [word]);

  const handleGuess = letter => {
    const newGuesses = [...guesses];
    let foundLetter = false;

    newGuesses.forEach(guess => {
      if (guess.letter === letter) {
        guess.guessed = true;
        foundLetter = true;
      }
    });

    if (!foundLetter) {
      setRemainingGuesses(remainingGuesses - 1);
    }

    setGuesses(newGuesses);

    if (remainingGuesses === 1) {
      setGameOver(true);
      setWin(false);
    } else if (newGuesses.every(guess => guess.guessed)) {
      setGameOver(true);
      setWin(true);
    }
  };

  return (
    <>
      <div>
        {guesses.map((guess, index) => (
          <span key={index} style={{ marginRight: 10 }}>
            {guess.guessed ? guess.letter : '_'}
          </span>
        ))}
      </div>
      <p>Remaining guesses: {remainingGuesses}</p>
      {!gameOver && (
        <div>
          {Array.from({ length: 26 }, (_, index) => (
            <button key={index} onClick={() => handleGuess(String.fromCharCode(97 + index))}>
              {String.fromCharCode(97 + index)}
            </button>
          ))}
        </div>
      )}
      {gameOver && (
        <p>{win ? 'You win!' : 'You lose!'}</p>
      )}
    </>
  );
};

export default Hangman;