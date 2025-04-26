import React from 'react';
import { Card } from "@/components/ui/card";
import GameImage from "@/components/GameImage";
import WordBlanks from "@/components/WordBlanks";
import GameHeader from "@/components/GameHeader";
import GameStats from "@/components/GameStats";
import GameFooter from "@/components/GameFooter";

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
  finalTime?: string;
  currentImageIndex: number;
  onNextImage: () => void;
  onPrevImage: () => void;
  beforeRevealImages: string[];
  afterRevealImages: string[];
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
  inputRef,
  finalTime = "",
  currentImageIndex,
  onNextImage,
  onPrevImage,
  beforeRevealImages,
  afterRevealImages
}) => {
  const handleTwitterShare = () => {
    const tweetText = `I gooned to ${correctWord} in ${finalTime} seconds!\n#goonguessr\n`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, '_blank');
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white p-6 shadow-md rounded-xl">
      <div className="space-y-6">
        <GameHeader />
        
        <GameImage 
          imageUrls={revealed ? afterRevealImages : beforeRevealImages}
          currentImageIndex={currentImageIndex}
          onNextImage={onNextImage}
          onPrevImage={onPrevImage}
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
          
          <GameStats 
            timerRunning={timerRunning}
            onTimerUpdate={onTimerUpdate}
            gameWon={gameWon}
            revealed={revealed}
            finalTime={finalTime}
            guess={guess}
            onGuessChange={onGuessChange}
            onKeyDown={onKeyDown}
            inputRef={inputRef}
            disabled={gameWon || revealed}
          />
          
          {wrongAttempts >= 5 && !revealed && !gameWon && (
            <button
              onClick={onReveal}
              className="w-full mt-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors"
            >
              STOP EDGING
            </button>
          )}
        </div>

        <GameFooter 
          gameWon={gameWon}
          revealed={revealed}
          onTwitterShare={handleTwitterShare}
        />
      </div>
    </Card>
  );
};

export default GameContainer;
