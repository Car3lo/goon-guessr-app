
import React from 'react';
import { cn } from '@/lib/utils';

interface WordBlanksProps {
  correctWord: string;
  gameWon: boolean;
  isShaking: boolean;
  currentGuess?: string;
  allCorrectLetters?: Set<string>;
  revealed?: boolean;
}

const WordBlanks: React.FC<WordBlanksProps> = ({ 
  correctWord, 
  gameWon, 
  isShaking,
  currentGuess = "",
  allCorrectLetters = new Set(),
  revealed = false
}) => {
  const createBlanksWithCorrectLetters = (word: string, guess: string) => {
    if (revealed) {
      return word; // Show the full word when revealed
    }

    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedCorrect = word.toLowerCase();
    
    const correctWords = normalizedCorrect.split(" ");
    const guessWords = normalizedGuess.split(" ");
    
    const result = correctWords.map((correctWord, wordIndex) => {
      let displayWord = "";
      const guessWord = guessWords[wordIndex] || "";
      
      for (let i = 0; i < correctWord.length; i++) {
        const positionKey = `${wordIndex}_${i}`;
        
        if (
          (i < guessWord.length && correctWord[i] === guessWord[i]) || 
          allCorrectLetters.has(positionKey)
        ) {
          displayWord += word.split(" ")[wordIndex][i];
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
        gameWon ? "text-green-600" : revealed ? "text-gray-800" : "text-gray-800",
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
