import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update progress smoothly
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 160);

    // Simulate loading time
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 500);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #F3D1C8 0%, #FAB1AA 100%)'
        }}
      />

      {/* Corner floral decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Floral decoration bottom left"
          width={220}
          height={220}
          className="absolute bottom-0 left-0 w-32 sm:w-44 opacity-80"
          priority
        />
        <Image
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt="Floral decoration bottom right"
          width={220}
          height={220}
          className="absolute bottom-0 right-0 w-32 sm:w-44 opacity-80"
          style={{ transform: 'scaleX(-1)' }}
          priority
        />
      </div>

      <div className="relative flex flex-col items-center justify-center w-full px-8 sm:px-12 md:px-16">
        {/* Monogram Logo */}
        <div className="relative flex items-center justify-center mb-8 sm:mb-12">
          <div className="relative w-28 sm:w-40 h-28 sm:h-40">
            <Image
              src="/monogram/monogram.png"
              alt="Monogram"
              fill
              className="object-contain"
              priority
              style={{ filter: 'brightness(0) saturate(100%) invert(30%) sepia(25%) saturate(1200%) hue-rotate(320deg) brightness(95%) contrast(85%)' }}
            />
          </div>
        </div>

        {/* Content section */}
        <div className="text-center w-full max-w-sm sm:max-w-2xl mx-auto px-6 sm:px-8 md:px-12">
          {/* Couple names */}
          <p
            className="text-lg sm:text-2xl tracking-[0.15em] sm:tracking-[0.2em] mb-6 sm:mb-8"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 500, color: '#BC677C' }}
          >
            Denmark & Rizchelle
          </p>

          {/* Message */}
          <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
            <p
              className="text-xs sm:text-sm leading-relaxed sm:leading-loose tracking-wide italic"
              style={{ fontFamily: '"Cinzel", serif', fontWeight: 300, color: '#BC677C' }}
            >
              Behind the scenes, something beautiful is gently coming together—woven with love, dreams, and shared moments. This space is being shaped with care, patience, and heartfelt intention.
            </p>
            <p
              className="text-xs sm:text-sm leading-relaxed sm:leading-loose tracking-wide italic"
              style={{ fontFamily: '"Cinzel", serif', fontWeight: 300, color: '#BC677C' }}
            >
              Please hold on for just a moment as we reveal something special, made not just to be seen, but to be felt.
            </p>
          </div>

          {/* Progress bar */}
          <div className="relative w-full max-w-xs sm:max-w-sm h-0.5 mx-auto rounded-full overflow-hidden mb-3 sm:mb-4" style={{ backgroundColor: 'rgba(188, 103, 124, 0.2)' }}>
            <div 
              className="absolute inset-y-0 left-0 transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%`, backgroundColor: '#BC677C' }}
            />
          </div>
          
          {/* Progress percentage */}
          <p
            className="text-[9px] sm:text-[10px] tracking-[0.2em]"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 300, color: 'rgba(188, 103, 124, 0.7)' }}
          >
            {progress}%
          </p>
        </div>
      </div>
    </div>
  );
};