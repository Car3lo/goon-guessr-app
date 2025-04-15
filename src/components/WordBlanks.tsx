
import React from 'react';
import { cn } from '@/lib/utils';

interface WordBlanksProps {
  correctWord: string;
  gameWon: boolean;
  isShaking: boolean;
  currentGuess?: string;
}

const WordBlanks: React.FC<WordBlanksProps> = ({ 
  correctWord, 
  gameWon, 
  isShaking,
  currentGuess = ""
}) => {
  const createBlanksWithCorrectLetters = (word: string, guess: string) => {
    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedCorrect = word.toLowerCase();
    
    // Split both the correct word and guess into arrays of words
    const correctWords = normalizedCorrect.split(" ");
    const guessWords = normalizedGuess.split(" ");
    
    const result = correctWords.map((correctWord, wordIndex) => {
      let displayWord = "";
      const guessWord = guessWords[wordIndex] || ""; // Use empty string if no corresponding word in guess
      
      for (let i = 0; i < correctWord.length; i++) {
        // Show letter only if it's in the correct position within the word
        if (i < guessWord.length && correctWord[i] === guessWord[i]) {
          displayWord += word.split(" ")[wordIndex][i]; // Use original case from correct word
        } else {
          displayWord += "_";
        }
      }
      return displayWord;
    });
    
    return result.join("   ");
  };

  return (
    <div 
      className={cn(
        "font-mono text-center text-3xl tracking-wider transition-all",
        gameWon ? "text-green-600" : "text-gray-800",
        isShaking && "animate-[shake_0.5s_ease-in-out] text-red-500"
      )}
    >
      {gameWon 
        ? correctWord 
        : createBlanksWithCorrectLetters(correctWord, currentGuess)
      }
    </div>
  );
};

export default WordBlanks;
