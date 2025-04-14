
import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Timer, Image } from "lucide-react";
import GameImage from "@/components/GameImage";
import WordBlanks from "@/components/WordBlanks";
import StopWatch from "@/components/StopWatch";
import { cn } from "@/lib/utils";

const Index = () => {
  // Game settings
  const correctWord = "Violet Myers"; // Matches the image
  const [gameWon, setGameWon] = useState(false);
  const [guess, setGuess] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [finalTime, setFinalTime] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Focus input on component mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleGuess = () => {
    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedCorrect = correctWord.toLowerCase();
    
    if (normalizedGuess === normalizedCorrect && !gameWon) {
      setGameWon(true);
      setTimerRunning(false);
      
      toast({
        title: "Congratulations!",
        description: `You guessed "${correctWord}" correctly!`,
      });
    } else if (guess.trim() !== "") {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      
      toast({
        variant: "destructive",
        title: "Incorrect guess",
        description: "Try again!",
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleGuess();
    }
  };

  const handleTimerUpdate = (time: string) => {
    if (gameWon) {
      setFinalTime(time);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">
      <Card className="w-full max-w-md mx-auto bg-white p-6 shadow-md rounded-xl">
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold text-gray-800">Goon Guessr</h1>
            <p className="text-gray-500 text-sm">Guess who's in the picture</p>
          </div>
          
          <GameImage 
            imageUrl="https://pbs.twimg.com/media/GceW5mzXAAAWLO2?format=jpg&name=large" 
            altText="Game Image" 
            gameWon={gameWon}
          />
          
          <div className="space-y-4">
            <WordBlanks 
              correctWord={correctWord} 
              gameWon={gameWon} 
              isShaking={isShaking} 
            />
            
            <div className="flex items-center justify-center">
              <Timer className="w-4 h-4 mr-2 text-gray-500" />
              <StopWatch 
                running={timerRunning} 
                onTimerUpdate={handleTimerUpdate}
              />
            </div>
            
            <div className="space-y-2">
              <Input
                ref={inputRef}
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your guess"
                disabled={gameWon}
                className={cn(
                  "w-full transition-all",
                  gameWon && "bg-gray-100"
                )}
              />
              
              {gameWon && (
                <div className="text-center text-sm text-green-600 animate-fade-in font-medium">
                  You guessed it in {finalTime}!
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Index;
