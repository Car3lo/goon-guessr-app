
import React, { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Timer, Coffee, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GameImage from "@/components/GameImage";
import WordBlanks from "@/components/WordBlanks";
import StopWatch from "@/components/StopWatch";
import { cn } from "@/lib/utils";
import { safeSupabaseCall } from "@/lib/supabase";

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
  const [correctGuessCount, setCorrectGuessCount] = useState(0);
  const [previousDayImage, setPreviousDayImage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchStats();
    fetchPreviousDayImage();
  }, []);

  const fetchStats = async () => {
    const { data, error } = await safeSupabaseCall(async (client) => {
      return await client
        .from('daily_stats')
        .select('correct_guesses')
        .eq('date', new Date().toISOString().split('T')[0])
        .single();
    });

    if (data && !error) {
      setCorrectGuessCount(data.correct_guesses);
    }
  };

  const fetchPreviousDayImage = async () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const { data, error } = await safeSupabaseCall(async (client) => {
      return await client
        .from('daily_images')
        .select('name')
        .eq('date', yesterday.toISOString().split('T')[0])
        .single();
    });

    if (data && !error) {
      setPreviousDayImage(data.name);
    } else {
      setPreviousDayImage("Unknown");
    }
  };

  const updateCorrectGuessCount = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    const { error } = await safeSupabaseCall(async (client) => {
      return await client
        .from('daily_stats')
        .upsert(
          { 
            date: today, 
            correct_guesses: correctGuessCount + 1 
          },
          { onConflict: 'date' }
        );
    });

    if (!error) {
      setCorrectGuessCount(prev => prev + 1);
    }
  };

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
      updateCorrectGuessCount();
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
                placeholder="Enter your guess (Full Name)"
                disabled={gameWon || revealed}
                className={cn(
                  "w-full transition-all text-center",
                  (gameWon || revealed) && "bg-gray-100"
                )}
              />
              
              <div className="text-center text-sm text-gray-500">
                {correctGuessCount} people have already found out today!
              </div>

              {wrongAttempts >= 5 && !revealed && !gameWon && (
                <button
                  onClick={handleReveal}
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
      
      <div className="text-[#C8C8C9] text-sm mt-4 mb-16">
        Yesterday's picture was {previousDayImage}
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
