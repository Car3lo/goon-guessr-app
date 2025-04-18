
import React, { useState, useEffect, useRef } from "react";
import { Coffee, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GameContainer from "@/components/GameContainer";

const Index = () => {
  const correctWord = "Sabrina Carpenter"; // Matches the image
  const [gameWon, setGameWon] = useState(false);
  const [guess, setGuess] = useState("");
  const [submittedGuess, setSubmittedGuess] = useState("");
  const [isShaking, setIsShaking] = useState(false);
  const [timerRunning, setTimerRunning] = useState(true);
  const [finalTime, setFinalTime] = useState("");
  const [allCorrectLetters, setAllCorrectLetters] = useState<Set<string>>(new Set());
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleGuess = () => {
    const normalizedGuess = guess.toLowerCase().trim();
    const normalizedCorrect = correctWord.toLowerCase();
    
    setSubmittedGuess(guess);
    
    const correctWords = normalizedCorrect.split(" ");
    const guessWords = normalizedGuess.split(" ");
    
    const newCorrectLetters = new Set(allCorrectLetters);
    
    correctWords.forEach((correctWord, wordIndex) => {
      const guessWord = guessWords[wordIndex] || "";
      
      for (let i = 0; i < correctWord.length; i++) {
        if (i < guessWord.length && correctWord[i] === guessWord[i]) {
          newCorrectLetters.add(`${wordIndex}_${i}`);
        }
      }
    });
    
    setAllCorrectLetters(newCorrectLetters);
    
    if (normalizedGuess === normalizedCorrect && !gameWon) {
      setGameWon(true);
      setTimerRunning(false);
    } else if (guess.trim() !== "") {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setWrongAttempts(prev => prev + 1);
    }
    
    setGuess("");
  };

  const handleReveal = () => {
    setRevealed(true);
    setTimerRunning(false);
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
      <GameContainer 
        correctWord={correctWord}
        gameWon={gameWon}
        guess={guess}
        submittedGuess={submittedGuess}
        isShaking={isShaking}
        allCorrectLetters={allCorrectLetters}
        revealed={revealed}
        timerRunning={timerRunning}
        wrongAttempts={wrongAttempts}
        onGuessChange={(e) => setGuess(e.target.value)}
        onKeyDown={handleKeyDown}
        onReveal={handleReveal}
        onTimerUpdate={handleTimerUpdate}
        inputRef={inputRef}
        finalTime={finalTime}
      />

      <div className="text-[#C8C8C9] text-sm mt-4 mb-16">
        Yesterday's picture was blank
      </div>
      
      <footer className="w-full fixed bottom-0 left-0 bg-transparent py-4 text-center flex justify-center items-center gap-4">
        <p className="text-[#C8C8C9] text-sm">
          Goon Guessr: Where Pop Culture Meets Guess Game
        </p>
        <a
          href="https://ko-fi.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C8C8C9] hover:text-[#a8a8a9] transition-colors"
        >
          <Coffee size={20} />
        </a>
        <Dialog>
          <DialogTrigger asChild>
            <button className="text-[#C8C8C9] hover:text-[#a8a8a9] transition-colors">
              <Info size={20} />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>About Goon Guessr</DialogTitle>
              <DialogDescription>
                A daily guessing game where you try to identify pop culture figures. Test your knowledge and challenge your friends!
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </footer>
    </div>
  );
};

export default Index;
