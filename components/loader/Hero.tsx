import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

const desktopImages: string[] = [
  '/desktop-background/couple (12).webp',
  '/desktop-background/couple (9).webp',
  '/desktop-background/couple (5).webp',
  '/desktop-background/couple (4).webp',
  '/desktop-background/couple (7).webp',
];

const mobileImages: string[] = [
  '/mobile-background/couple (9).webp',
  '/mobile-background/couple (18).webp',
  '/mobile-background/couple (20).webp',
  '/mobile-background/couple (23).webp',
  '/mobile-background/couple (5).webp',
];

export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(max-width: 768px)');
    const handleChange = () => setIsMobile(media.matches);
    handleChange();
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 5);
    }, 5500);
    return () => clearInterval(timer);
  }, [mounted]);

  const images = useMemo(() => (isMobile ? mobileImages : desktopImages), [isMobile]);

  return (
    <div className={`fixed inset-0 z-30 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      {/* Background Image Carousel */}
      <div className="absolute inset-0 z-0">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt="Couple"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === index ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        
        {/* Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(243, 209, 200, 0.7), rgba(250, 177, 170, 0.7))'
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        
        {/* Top Logo/Monogram */}
        <div className="mb-auto mt-8">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 flex items-center justify-center">
            {/* Monogram Image */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44">
              <Image
                src="/monogram/monogram.png"
                alt="Denmark & Rizchelle Monogram"
                fill
                className="object-contain"
                priority
                style={{ filter: 'brightness(0) saturate(100%) invert(45%) sepia(90%) saturate(2000%) hue-rotate(340deg) brightness(0.55) contrast(1.2)' }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-4 pb-14 sm:pb-16 md:pb-20">
          <h2
            className="text-6xl md:text-8xl transform -rotate-6"
            style={{
              fontFamily: '"Great Vibes", cursive',
              fontWeight: 400,
              color: '#8B3036',
            }}
          >
            You are
          </h2>
          
          <h1
            className="text-5xl md:text-7xl font-bold tracking-wider uppercase"
            style={{
              fontFamily: '"Cinzel", serif',
              fontWeight: 700,
              color: '#8B3036',
            }}
          >
            Invited!
          </h1>

          <button 
            onClick={() => {
              onOpen();
            }}
            className="px-10 py-4 font-serif text-sm tracking-[0.2em] uppercase rounded-sm border transition-all duration-300"
            style={{
              backgroundColor: '#657551',
              borderColor: '#657551',
              color: '#FFFFFF',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#556442';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#657551';
            }}
          >
            <span
              style={{ fontFamily: '"Cinzel", serif', fontWeight: 500, color: '#FFFFFF' }}
            >
              Open Invitation
            </span>
          </button>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};