import React from 'react';
import { Timer } from "lucide-react";
import StopWatch from "@/components/StopWatch";
import Counter from "@/components/Counter";
import CountdownTimer from "@/components/CountdownTimer";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface GameStatsProps {
  timerRunning: boolean;
  onTimerUpdate: (time: string) => void;
  gameWon: boolean;
  revealed: boolean;
  finalTime: string;
  guess: string;
  onGuessChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  disabled: boolean;
}

const socialmediausername = "@sabrinacarpenter"
const socialmedialink = "https://www.instagram.com/sabrinacarpenter/"

const GameStats: React.FC<GameStatsProps> = ({
  timerRunning,
  onTimerUpdate,
  gameWon,
  revealed,
  finalTime,
  guess,
  onGuessChange,
  onKeyDown,
  inputRef,
  disabled
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center">
        <Timer className="w-4 h-4 mr-2 text-gray-500" />
        <StopWatch 
          running={timerRunning} 
          onTimerUpdate={onTimerUpdate}
        />
      </div>

      <Input
        ref={inputRef}
        type="text"
        value={guess}
        onChange={onGuessChange}
        onKeyDown={onKeyDown}
        placeholder="Enter your guess (Full Name)"
        disabled={disabled}
        className={cn(
          "w-full transition-all text-center",
          disabled && "bg-gray-100"
        )}
      />

      {(gameWon || revealed) && (
        <div className="text-center">
          <a 
            href={socialmedialink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-bold text-gray-800 hover:text-blue-600 transition-colors"
          >
            {socialmediausername}
          </a>
        </div>
      )}

      <Counter gameWon={gameWon} />

      {gameWon && (
        <div className="text-center text-sm text-gray-600">
          You gooned in <span className="font-bold">{finalTime}</span>!
        </div>
      )}

      <CountdownTimer revealed={revealed || gameWon} />
    </div>
  );
};

export default GameStats; 