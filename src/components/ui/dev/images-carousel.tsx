import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type AirbnbCarouselProps = {
  images: { src: string; alt?: string }[];
  className?: string;
  rounded?: string; // Tailwind rounding class, e.g. 'rounded-2xl'
  shadow?: string; // Tailwind shadow class
};

export default function AirbnbCarousel({ images, className, rounded = "rounded-2xl", shadow = "shadow-card" }: AirbnbCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start", dragFree: false, skipSnaps: false, containScroll: "trimSnaps" });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback((api: UseEmblaCarouselType[1]) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();
  const scrollTo = (idx: number) => emblaApi?.scrollTo(idx);

  return (
    <div className={cn("relative", className)}>
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex touch-pan-y select-none">
          {images.map((img, i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 basis-full">
              <div className={cn("relative aspect-[4/3] w-full overflow-hidden bg-muted", rounded, shadow)}>
                <img
                  src={img.src}
                  alt={img.alt ?? `Slide ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading={i > 1 ? "lazy" : "eager"}
                />
                {/* gradient bottom overlay for dots */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
                {/* Heart */}
                <button aria-label="Save" className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gray-700 shadow-card backdrop-blur hover:bg-white">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        aria-label="Previous image"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={cn(
          "absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-800 shadow-card transition disabled:opacity-50",
          rounded
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next image"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={cn(
          "absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-800 shadow-card transition disabled:opacity-50",
          rounded
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-2 z-10 flex items-center justify-center gap-2">
        {images.map((_, i) => {
          const active = i === selectedIndex;
          return (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full bg-white/90 transition-all duration-300",
                active ? "w-6" : "w-1.5 opacity-80",
              )}
            />
          );
        })}
      </div>
    </div>
  );
}
