
import React from 'react';
import { cn } from '@/lib/utils';

interface WordBlanksProps {
  correctWord: string;
  gameWon: boolean;
  isShaking: boolean;
}

const WordBlanks: React.FC<WordBlanksProps> = ({ correctWord, gameWon, isShaking }) => {
  const createBlanks = (word: string) => {
    const words = word.split(" ");
    return words
      .map((w) => "▂".repeat(w.length))
      .join("   ");
  };

  return (
    <div 
      className={cn(
        "font-mono text-center text-4xl tracking-wider transition-all",
        gameWon ? "text-green-600" : "text-gray-800",
        isShaking && "animate-[shake_0.5s_ease-in-out]"
      )}
    >
      {gameWon ? correctWord : createBlanks(correctWord)}
    </div>
  );
};

export default WordBlanks;

