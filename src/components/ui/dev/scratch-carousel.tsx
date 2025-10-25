import React, { useCallback, useEffect, useRef, useState } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type AirbnbCarouselProps = {
  images: { src: string; alt?: string }[];
  className?: string;
  rounded?: string; // Tailwind rounding class, e.g. 'rounded-2xl'
  shadow?: string; // Tailwind shadow class
  maxVisibleDots?: number;
};

export default function AirbnbCarousel({
  images,
  className,
  rounded = "rounded-2xl",
  shadow = "shadow-card",
  maxVisibleDots = 5,
}: AirbnbCarouselProps) {
  const total = images.length;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef(0);
  const startTranslate = useRef(0);
  const startIndexRef = useRef(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rafRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [translate, setTranslate] = useState(0); // pixels
  const [isDragging, setIsDragging] = useState(false);
  const slideWidthRef = useRef(0);

  const updateSlideWidth = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    slideWidthRef.current = el.clientWidth;
    // ensure translate aligns to current index
    setTranslate(-index * slideWidthRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  useEffect(() => {
    updateSlideWidth();
    const onResize = () => {
      updateSlideWidth();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateSlideWidth]);

  // clamp helper
  const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

  // ensure translate matches index when index changes (animate)
  useEffect(() => {
    const target = -index * (slideWidthRef.current || 0);
    // animate using CSS transition (slower for smoother feel)
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = "transform 320ms cubic-bezier(.22,.9,.3,1)";
    setTranslate(target);
    // clear transition after complete
    const id = window.setTimeout(() => {
      if (track) track.style.transition = "";
    }, 340);
    return () => window.clearTimeout(id);
  }, [index]);

  // apply translate to DOM
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // use transform directly for smoother moving
    track.style.transform = `translate3d(${translate}px, 0, 0)`;
  }, [translate]);

  const onPointerDown = (e: React.PointerEvent) => {
    const container = containerRef.current;
    if (!container) return;

    (e.target as Element).setPointerCapture(e.pointerId);
    startX.current = e.clientX;
    startTranslate.current = translate;
    startIndexRef.current = index;
    setIsDragging(true);

    // prevent CSS transition while dragging
    const track = trackRef.current;
    if (track) track.style.transition = "";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - startX.current;
    // reduce sensitivity so slides don't move too fast
    const sensitivity = 0.6;
    let tentative = startTranslate.current + dx * sensitivity;

    const maxTranslate = 0;
    const minTranslate = -((total - 1) * (slideWidthRef.current || 0));

    // apply gentle resistance when dragging beyond bounds
    if (tentative > maxTranslate) {
      tentative = maxTranslate + (tentative - maxTranslate) * 0.25;
    } else if (tentative < minTranslate) {
      tentative = minTranslate + (tentative - minTranslate) * 0.25;
    }

    setTranslate(tentative);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // ignore
    }
    setIsDragging(false);

    const w = slideWidthRef.current || 1;
    const moved = translate - startTranslate.current; // pixels moved relative to start
    const threshold = w * 0.5; // snap if moved more than 50%

    let newIndex = startIndexRef.current;
    if (moved <= -threshold) {
      newIndex = clamp(startIndexRef.current + 1, 0, total - 1);
    } else if (moved >= threshold) {
      newIndex = clamp(startIndexRef.current - 1, 0, total - 1);
    } else {
      newIndex = clamp(startIndexRef.current, 0, total - 1);
    }

    setIndex(newIndex);
  };

  const prev = () => setIndex((s) => Math.max(0, s - 1));
  const next = () => setIndex((s) => Math.min(total - 1, s + 1));
  const goTo = (i: number) => setIndex(clamp(i, 0, total - 1));

  // compute visible dot window centered around active
  const maxDots = Math.max(1, Math.floor(maxVisibleDots));
  const half = Math.floor(maxDots / 2);
  let start = Math.max(0, index - half);
  start = Math.min(start, Math.max(0, total - maxDots));
  const end = Math.min(total, start + maxDots);
  const visibleIndices = Array.from({ length: end - start }, (_, i) => i + start);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="overflow-hidden"
        style={{ touchAction: "pan-y" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div ref={trackRef} className="flex">
          {images.map((img, i) => (
            <div key={i} className="min-w-0 shrink-0 grow-0 basis-full">
              <div className={cn("relative aspect-[4/3] w-full overflow-hidden bg-muted", rounded, shadow)}>
                <img
                  src={img.src}
                  alt={img.alt ?? `Slide ${i + 1}`}
                  className="h-full w-full object-cover"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
                <button
                  aria-label="Save"
                  className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-gray-700 shadow-card backdrop-blur hover:bg-white"
                >
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="Previous image"
        onClick={prev}
        disabled={index === 0}
        className={cn(
          "absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-800 shadow-card transition disabled:opacity-50",
          rounded,
        )}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next image"
        onClick={next}
        disabled={index === total - 1}
        className={cn(
          "absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white text-gray-800 shadow-card transition disabled:opacity-50",
          rounded,
        )}
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="pointer-events-auto absolute inset-x-0 bottom-2 z-10 flex items-center justify-center gap-2">
        {visibleIndices.map((idx) => {
          const active = idx === index;
          return (
            <button
              key={idx}
              aria-label={`Go to slide ${idx + 1}`}
              onClick={() => goTo(idx)}
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
