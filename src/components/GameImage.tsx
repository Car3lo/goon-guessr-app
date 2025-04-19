
import React from 'react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GameImageProps {
  imageUrls: string[];
  altText: string;
  gameWon: boolean;
}

const GameImage: React.FC<GameImageProps> = ({ imageUrls, altText, gameWon }) => {
  const showArrows = imageUrls.length > 1;
  
  return (
    <Carousel className="w-full relative group">
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
      {showArrows && (
        <>
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity duration-200">
            <CarouselPrevious className="bg-transparent hover:bg-transparent border-none">
              <ChevronLeft className="h-8 w-8 text-gray-600" />
            </CarouselPrevious>
          </div>
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity duration-200">
            <CarouselNext className="bg-transparent hover:bg-transparent border-none">
              <ChevronRight className="h-8 w-8 text-gray-600" />
            </CarouselNext>
          </div>
        </>
      )}
    </Carousel>
  );
};

export default GameImage;
