
import React from 'react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

interface GameImageProps {
  imageUrls: string[];
  altText: string;
  gameWon: boolean;
}

const GameImage: React.FC<GameImageProps> = ({ imageUrls, altText, gameWon }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  
  // Only show arrows if there's more than one image
  const showArrows = imageUrls.length > 1;
  
  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", onSelect);
    // Initialize states
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);
  
  return (
    <Carousel className="w-full relative group">
      <CarouselContent ref={emblaRef}>
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
          {canScrollPrev && (
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity duration-200">
              <button 
                className="bg-transparent hover:bg-transparent border-none cursor-pointer" 
                onClick={() => emblaApi?.scrollPrev()}
                type="button"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-8 w-8 text-gray-600" />
              </button>
            </div>
          )}
          {canScrollNext && (
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity duration-200">
              <button 
                className="bg-transparent hover:bg-transparent border-none cursor-pointer" 
                onClick={() => emblaApi?.scrollNext()}
                type="button"
                aria-label="Next image"
              >
                <ChevronRight className="h-8 w-8 text-gray-600" />
              </button>
            </div>
          )}
        </>
      )}
    </Carousel>
  );
};

export default GameImage;
