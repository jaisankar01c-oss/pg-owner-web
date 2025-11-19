import React, { useEffect, useRef, useState } from 'react';
import { breakpoints } from '../common/utils/responsive';

type Props = {
  images: string[];
  autoMs?: number;
  className?: string;
  heightClass?: string;
  bordered?: boolean;
};

function calcSlides(): number {
  if (typeof window === 'undefined') return 1;
  const w = window.innerWidth;
  if (w >= breakpoints.lg) return 3; // show 3 on desktop
  if (w >= breakpoints.md) return 2; // 2 on tablets
  return 1; // 1 on mobile
}

export default function Carousel({ images, autoMs = 3500, className = '', heightClass = 'h-72 sm:h-80 lg:h-[60vh]', bordered = true }: Props) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState(calcSlides());
  const count = images.length;
  const maxIndex = Math.max(0, count - slides);

  useEffect(() => {
    const onResize = () => setSlides(calcSlides());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % (maxIndex + 1));
    }, autoMs);
    return () => clearInterval(id);
  }, [maxIndex, autoMs]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const single = el.clientWidth / slides;
    const x = single * index;
    el.scrollTo({ left: x, behavior: 'smooth' });
  }, [index, slides]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + (maxIndex + 1)) % (maxIndex + 1));
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % (maxIndex + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [maxIndex]);

  useEffect(() => {
    // Ensure index is valid when slides count changes
    if (index > maxIndex) setIndex(0);
  }, [maxIndex]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={viewportRef}
        className={`overflow-hidden rounded-2xl ${bordered ? 'border border-input' : ''} ${heightClass}`}
      >
        <div className="flex snap-x snap-mandatory scroll-smooth carousel" style={{ ["--slides" as any]: String(slides) }}>
          {images.map((src, i) => {
            const centerIndex = index + Math.floor(slides / 2);
            const isCenter = i === centerIndex;
            return (
              <div key={src} className="slide snap-start p-3 sm:p-4 flex items-center justify-center">
                <img
                  src={src}
                  alt={`Slide ${i + 1}`}
                  className={`h-full w-auto max-w-[85%] object-contain rounded-2xl shadow-md transition-transform duration-300 ${isCenter ? 'scale-100' : 'scale-[.97]'}`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-x-0 -bottom-3 flex items-center justify-center gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full transition-all ${i === index ? 'bg-primary w-6' : 'bg-gray300'}`}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-white/0 via-white/0 to-white/0" />

      <div className="hidden sm:flex absolute inset-y-0 left-0 right-0 items-center justify-between px-2">
        <button aria-label="Previous" onClick={() => setIndex((i) => (i - 1 + (maxIndex + 1)) % (maxIndex + 1))} className="rounded-full bg-white/80 border border-input p-2 hover:bg-white text-tertiary shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button aria-label="Next" onClick={() => setIndex((i) => (i + 1) % (maxIndex + 1))} className="rounded-full bg-white/80 border border-input p-2 hover:bg-white text-tertiary shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        </button>
      </div>
    </div>
  );
}
