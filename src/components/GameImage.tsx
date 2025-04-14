
import React from 'react';
import { cn } from '@/lib/utils';

interface GameImageProps {
  imageUrl: string;
  altText: string;
  gameWon: boolean;
}

const GameImage: React.FC<GameImageProps> = ({ imageUrl, altText, gameWon }) => {
  return (
    <div className="flex justify-center">
      <img 
        src={imageUrl} 
        alt={altText}
        className={cn(
          "w-11/12 object-contain transition-all duration-300",
          gameWon ? "filter-none" : "filter brightness-[0.97] contrast-[1.03]"
        )}
      />
    </div>
  );
};

export default GameImage;

