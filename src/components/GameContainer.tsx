
import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import GameImage from "@/components/GameImage";
import WordBlanks from "@/components/WordBlanks";
import StopWatch from "@/components/StopWatch";
import { cn } from "@/lib/utils";

interface GameContainerProps {
  correctWord: string;
  gameWon: boolean;
  guess: string;
  submittedGuess: string;
  isShaking: boolean;
  allCorrectLetters: Set<string>;
  revealed: boolean;
  timerRunning: boolean;
  wrongAttempts: number;
  onGuessChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onReveal: () => void;
  onTimerUpdate: (time: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const GameContainer: React.FC<GameContainerProps> = ({
  correctWord,
  gameWon,
  guess,
  submittedGuess,
  isShaking,
  allCorrectLetters,
  revealed,
  timerRunning,
  wrongAttempts,
  onGuessChange,
  onKeyDown,
  onReveal,
  onTimerUpdate,
  inputRef
}) => {
  return (
    <Card className="w-full max-w-md mx-auto bg-white p-6 shadow-md rounded-xl">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Goon Guessr</h1>
        </div>
        
        <GameImage 
          imageUrl="https://pbs.twimg.com/media/GoVPfdBWMAEHByq?format=jpg&name=medium" 
          altText="Game Image" 
          gameWon={gameWon} 
        />
        
        <div className="space-y-4">
          <WordBlanks 
            correctWord={correctWord} 
            gameWon={gameWon} 
            isShaking={isShaking}
            currentGuess={submittedGuess}
            allCorrectLetters={allCorrectLetters}
            revealed={revealed}
          />
          
          <div className="flex items-center justify-center">
            <Timer className="w-4 h-4 mr-2 text-gray-500" />
            <StopWatch 
              running={timerRunning} 
              onTimerUpdate={onTimerUpdate}
            />
          </div>
          
          <div className="space-y-2">
            <Input
              ref={inputRef}
              type="text"
              value={guess}
              onChange={onGuessChange}
              onKeyDown={onKeyDown}
              placeholder="Enter your guess (Full Name)"
              disabled={gameWon || revealed}
              className={cn(
                "w-full transition-all text-center",
                (gameWon || revealed) && "bg-gray-100"
              )}
            />
            
            {wrongAttempts >= 5 && !revealed && !gameWon && (
              <button
                onClick={onReveal}
                className="w-full mt-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
              >
                STOP EDGING
              </button>
            )}
            
            {gameWon && (
              <div className="text-center text-sm text-green-600 animate-fade-in font-medium">
                <p>You guessed it in {finalTime}!</p>
                <p>Goon-guess a new picture Tomorrow.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GameContainer;
