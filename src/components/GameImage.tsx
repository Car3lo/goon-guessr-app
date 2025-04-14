
import React from 'react';
import { cn } from '@/lib/utils';

interface GameImageProps {
  imageUrl: string;
  altText: string;
  gameWon: boolean;
}

const GameImage: React.FC<GameImageProps> = ({ imageUrl, altText, gameWon }) => {
  return (
    <div className="relative overflow-hidden rounded-lg">
      <img 
        src={imageUrl} 
        alt={altText}
        className={cn(
          "w-full object-contain max-h-[60vh] transition-all duration-300",
          gameWon ? "filter-none" : "filter brightness-[0.97] contrast-[1.03]"
        )}
      />
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/10 to-transparent",
        gameWon && "bg-gradient-to-t from-green-500/10 to-transparent"
      )} />
    </div>
  );
};

export default GameImage;
