
import React from 'react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface GameImageProps {
  imageUrls: string[];
  altText: string;
  gameWon: boolean;
}

const GameImage: React.FC<GameImageProps> = ({ imageUrls, altText, gameWon }) => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {imageUrls.map((url, index) => (
          <CarouselItem key={index}>
            <div className="flex justify-center">
              <img 
                src={url} 
                alt={`${altText} ${index + 1}`}
                className={cn(
                  "w-11/12 object-contain transition-all duration-300",
                  gameWon ? "filter-none" : "filter brightness-[0.97] contrast-[1.03]"
                )}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default GameImage;
