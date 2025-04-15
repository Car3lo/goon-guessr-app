
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
    
    const words = word.split(" ");
    const result = words.map((wordPart) => {
      let displayWord = "";
      for (let i = 0; i < wordPart.length; i++) {
        if (
          normalizedGuess.includes(wordPart[i].toLowerCase()) ||
          (normalizedCorrect.charAt(i) === " " && normalizedGuess.charAt(i) === " ")
        ) {
          displayWord += wordPart[i];
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
