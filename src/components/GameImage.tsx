
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
    <Carousel className="w-full relative group" setApi={api => {}}>
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
              <div className="bg-transparent hover:bg-transparent border-none" onClick={() => emblaApi?.scrollPrev()}>
                <ChevronLeft className="h-8 w-8 text-gray-600" />
              </div>
            </div>
          )}
          {canScrollNext && (
            <div className="absolute -right-12 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100 transition-opacity duration-200">
              <div className="bg-transparent hover:bg-transparent border-none" onClick={() => emblaApi?.scrollNext()}>
                <ChevronRight className="h-8 w-8 text-gray-600" />
              </div>
            </div>
          )}
        </>
      )}
    </Carousel>
  );
};

export default GameImage;
