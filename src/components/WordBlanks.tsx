import React from 'react';
import { cn } from '@/lib/utils';

interface WordBlanksProps {
  correctWord: string;
  gameWon: boolean;
  isShaking: boolean;
  currentGuess?: string;
  submittedGuess?: string;
  allCorrectLetters?: Set<string>;
  revealed?: boolean;
}

const WordBlanks: React.FC<WordBlanksProps> = ({ 
  correctWord, 
  gameWon, 
  isShaking,
  currentGuess = "",
  submittedGuess = "",
  allCorrectLetters = new Set(),
  revealed = false
}) => {
  const createBlanksWithCorrectLetters = (word: string, currentGuess: string, submittedGuess: string) => {
    if (revealed) {
      return word; // Show the full word when revealed
    }

    const normalizedCurrentGuess = currentGuess.toLowerCase().trim();
    const normalizedSubmittedGuess = submittedGuess.toLowerCase().trim();
    const normalizedCorrect = word.toLowerCase();
    
    // Create a map of all letters in the current guess for quick lookup
    const currentGuessLetters = new Set(normalizedCurrentGuess.replace(/\s/g, '').split(''));
    
    const result = normalizedCorrect.split(" ").map((correctWord, wordIndex) => {
      let displayWord = "";
      
      for (let i = 0; i < correctWord.length; i++) {
        const positionKey = `${wordIndex}_${i}`;
        const currentChar = word.split(" ")[wordIndex][i];
        
        // Show letter if it's been correctly guessed before (from submitted guesses)
        if (allCorrectLetters.has(positionKey)) {
          displayWord += currentChar;
        } else {
          // Check if the current letter exists anywhere in the current guess
          displayWord += currentGuessLetters.has(correctWord[i]) ? currentChar : "_";
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
        : createBlanksWithCorrectLetters(correctWord, currentGuess, submittedGuess)
      }
    </div>
  );
};

export default WordBlanks;
