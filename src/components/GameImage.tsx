
import React from 'react';
import { cn } from '@/lib/utils';
import { ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface GameImageProps {
  imageUrls: Array<{
    url: string;
    source: string;
  }>;
  altText: string;
  gameWon: boolean;
  revealed: boolean;
}

const GameImage: React.FC<GameImageProps> = ({ imageUrls, altText, gameWon, revealed }) => {
  const showArrows = imageUrls.length > 1;
  const showSources = gameWon || revealed;
  
  return (
    <div className="space-y-4">
      <Carousel className="w-full relative group">
        <CarouselContent>
          {imageUrls.map((imageData, index) => (
            <CarouselItem key={index}>
              <div className="flex flex-col items-center gap-2">
                <img 
                  src={imageData.url} 
                  alt={`${altText} ${index + 1}`}
                  className={cn(
                    "w-11/12 object-contain transition-all duration-300",
                    gameWon ? "filter-none" : "filter brightness-[0.97] contrast-[1.03]"
                  )}
                />
                {showSources && (
                  <a
                    href={imageData.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-500 hover:text-blue-600 transition-colors text-sm"
                  >
                    Source <ExternalLink className="h-4 w-4" />
                  </a>
                )}
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
    </div>
  );
};

export default GameImage;
