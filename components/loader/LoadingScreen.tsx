import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(onComplete, 1000); // Wait for fade out animation
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Layered soft palette background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#F7E6CA_0%,#FADDE0_35%,#E9D5C3_70%,#D3B9A2_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,#FADDE0_0%,transparent_55%)] opacity-70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#E0B4B1_0%,transparent_55%)] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,#D3B9A2_0%,transparent_60%)] opacity-55" />
        <div className="absolute inset-0 backdrop-blur-[1.5px]" />
      </div>

      <div className="relative flex flex-col items-center justify-center">
        <div className="relative flex items-center justify-center">
          {/* Glow halos */}
          <div className="absolute w-40 h-40 rounded-full bg-white/25 blur-3xl animate-pulse" />
          <div className="absolute w-28 h-28 rounded-full bg-[#E0B4B1]/30 blur-2xl animate-ping" />

          {/* Outer decorative rings */}
          <div className="absolute w-32 h-32 rounded-full border border-[#D2A4A4]/70 animate-ping" />
          <div className="absolute w-26 h-26 rounded-full border border-[#E0B4B1]/70 animate-[spin_7s_linear_infinite]" />
          <div className="absolute w-22 h-22 rounded-full border-t-2 border-b-2 border-[#D3B9A2]/80 animate-[spin_12s_linear_infinite_reverse]" />

          {/* Monogram */}
          <div className="flex flex-col items-center justify-center z-10">
            <span
            className="text-3xl tracking-[0.35em] text-white drop-shadow-md"
              style={{ fontFamily: '"Cinzel", serif', fontWeight: 700 }}
            >
              A & J
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p
            className="text-xs uppercase tracking-[0.3em] text-white/80 animate-pulse drop-shadow"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 700 }}
          >
            Loading Invitation
          </p>
        </div>
      </div>
    </div>
  );
};