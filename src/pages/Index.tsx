
import React, { useState, useEffect, useRef } from "react";
import { Coffee, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GameContainer from "@/components/GameContainer";

const Index = () => {
  const correctWord = "Sabrina Carpenter"; // Matches the images
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
        imageUrls={[
          "https://pbs.twimg.com/media/GoVPfdBWMAEHByq?format=jpg&name=medium",
          "https://pbs.twimg.com/media/GooRwDwXMAAKjzs?format=jpg&name=large",
          "https://pbs.twimg.com/media/GoV1sJ5XsAAKNi_?format=jpg&name=900x900"
        ]}
      />

      <div className="text-[#C8C8C9] text-sm mt-4 mb-16">
        Yesterday's picture was Violet Myers
      </div>
      
      <footer className="w-full fixed bottom-0 left-0 bg-transparent py-4 text-center flex justify-center items-center gap-4">
        <p className="text-[#C8C8C9] text-sm">
          New Picture Every 24 Hours 
        </p>
        <a
          href="https://ko-fi.com/cartilosan"
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
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Info</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 text-left">
              <section>
                <h3 className="font-semibold mb-2">About Goon Guessr</h3>
                <p>Every day, identify a different model featured from Pornhub, Onlyfans, Twitter/Instagram, and Pop Culture.</p>
                <p className="mt-2">All photos are from publicly available sources.</p>
                <p className="mt-2">
                  Inspired by games like <a 
                    href="https://loldle.net/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline"
                  >
                    loldle
                  </a>
                </p>
              </section>
              
              <section className="mt-4">
                <h3 className="font-semibold mb-2">Contact & Feedback</h3>
                <p>Have questions, feedback, or need to request a photo removal?</p>
                <p className="mt-2">
                  Email us at <span className="text-blue-500">goonguessr6@gmail.com</span> for:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Photo removal requests (if you are a featured model).</li>
                  <li>Suggestions or inquiries (for model-specific feedback, please include Picture, Name, and Site Link).</li>
                  <li>Wrong info or errors.</li>
                  <li>Just want to say Hi! 😎</li>
                </ul>
                <p className="mt-2">Cheers, Goon Guessr 🍻</p>
              </section>
            </div>
          </DialogContent>
        </Dialog>
      </footer>
    </div>
  );
};

export default Index;
