import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import type { Guest } from '../types/wedding';
import { NarniaLamppostSvg } from './NarniaOrnaments';

interface WardrobeDoorProps {
  onOpenComplete: () => void;
  onStartMusic: () => void;
  guest?: Guest | null;
}

type DoorStage = 'closed' | 'opening' | 'entering' | 'fading';

export const WardrobeDoor: React.FC<WardrobeDoorProps> = ({
  onOpenComplete,
  onStartMusic,
  guest,
}) => {
  const [stage, setStage] = useState<DoorStage>('closed');
  const [isHovered, setIsHovered] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const handleOpen = () => {
    if (stage !== 'closed') return;
    setStage('opening');
    onStartMusic();

    // Fase 1 (0s - 2.4s): La puerta se abre, aparece "Bienvenido al Reino de Nuestro Amor" y te acercas al umbral
    // Fase 2 (2.4s - 4.1s): Te adentras profundamente por el interior del ropero hacia el bosque
    const enterTimer = window.setTimeout(() => {
      setStage('entering');
    }, 2400);

    // Fase 3 (3.7s - 4.5s): Suave desvanecimiento de luz dorada al cruzar el umbral
    const fadeTimer = window.setTimeout(() => {
      setStage('fading');
    }, 3700);

    // Fase 4 (4.5s): Entrada completa a la invitación
    const completeTimer = window.setTimeout(() => {
      onOpenComplete();
    }, 4500);

    timersRef.current.push(enterTimer, fadeTimer, completeTimer);
  };

  const isOpen = stage !== 'closed';
  const isEntering = stage === 'entering' || stage === 'fading';

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden p-4 select-none transition-opacity duration-800 ${
        stage === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #1a1109 0%, #0b0a08 55%, #030706 100%)',
      }}
    >
      {/* Ambient Narnian twilight & magical golden dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-800/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fde68a_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Warm golden portal veil as you pass fully inside the wardrobe */}
      <div
        className={`fixed inset-0 z-40 pointer-events-none transition-opacity duration-1000 ${
          isEntering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(254, 243, 199, 0.25) 0%, rgba(7, 20, 17, 0.65) 75%, rgba(5, 13, 11, 0.92) 100%)',
        }}
      />

      {/* Guest Welcome Header Pill (fades cleanly as the wardrobe opens) */}
      <div
        className={`relative z-30 mb-3 sm:mb-4 text-center transition-all duration-700 ${
          isOpen ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        {guest ? (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 backdrop-blur-md border border-amber-400/35 text-amber-100 text-xs font-cinzel shadow-lg">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>
              Invitación Exclusiva para: <strong className="text-amber-300">{guest.name}</strong>
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/70 backdrop-blur-md border border-amber-400/30 text-amber-200/95 text-xs font-cinzel shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Crónicas de Nuestra Boda · Raúl Ernesto & María Camila</span>
          </div>
        )}
      </div>

      {/* Main Wardrobe Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-full">
        {/* 3D Perspective Container — smoothly steps up and glides right INSIDE the open wardrobe */}
        <div
          className={`relative w-[320px] sm:w-[400px] md:w-[450px] aspect-[650/731] ${
            !isOpen ? 'cursor-pointer group' : 'cursor-default'
          }`}
          onClick={!isOpen ? handleOpen : undefined}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            perspective: '1600px',
            transformOrigin: '51.69% 51.10%',
            transform:
              stage === 'closed'
                ? 'scale(1)'
                : stage === 'opening'
                ? 'scale(1.65)'
                : 'scale(5.4)',
            transition:
              stage === 'opening'
                ? 'transform 2.2s cubic-bezier(0.22, 1, 0.36, 1)'
                : 'transform 1.85s cubic-bezier(0.45, 0, 0.2, 1)',
          }}
        >
          {/* 1. PORTAL INTERIOR (Glowing Snowy Narnia Forest + ONLY "Bienvenido al Reino de Nuestro Amor") */}
          <div
            className="absolute overflow-hidden z-10 flex flex-col items-center justify-center"
            style={{
              left: '37.69%',
              top: '20.66%',
              width: '28.00%',
              height: '60.88%',
              containerType: 'size',
              background:
                'radial-gradient(ellipse at 50% 35%, #1e424e 0%, #0b1e25 55%, #040d10 100%)',
              boxShadow: isOpen
                ? '0 0 55px rgba(251, 191, 36, 0.6), inset 0 0 32px rgba(253, 230, 138, 0.4)'
                : 'none',
            }}
          >
            {/* Snowy Narnia Forest Backdrop — subtly zooms forward for depth as you enter */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[3800ms] ease-out"
              style={{
                backgroundImage: "url('/media/narnia-forest-lantern.jpg')",
                transform: isEntering ? 'scale(1.25)' : isOpen ? 'scale(1.08)' : 'scale(1)',
                opacity: isOpen ? 0.82 : 0.4,
              }}
            />

            {/* Soft golden lantern atmosphere */}
            <div
              className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background:
                  'radial-gradient(circle at 50% 42%, rgba(251,191,36,0.28) 0%, rgba(7,20,17,0.45) 52%, rgba(4,12,10,0.82) 100%)',
              }}
            />

            {/* Delicate falling magical snow specks */}
            <div
              className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(#fffbeb_1px,transparent_1px)] [background-size:14px_14px]"
              aria-hidden="true"
            />

            {/* ONLY THE SINGLE PHRASE INSIDE THE WARDROBE */}
            <div
              className={`relative z-20 flex flex-col items-center justify-center text-center transition-all duration-1000 ${
                stage === 'opening'
                  ? 'opacity-100 translate-y-0 scale-100 delay-300'
                  : isEntering
                  ? 'opacity-95 scale-110'
                  : 'opacity-0 translate-y-2 scale-90 pointer-events-none'
              }`}
              style={{
                padding: '0 8cqw',
                gap: '4.5cqw',
              }}
            >
              {/* Subtle glowing Victorian Narnia Lamppost */}
              <div className="relative flex items-center justify-center">
                <div
                  className="absolute rounded-full bg-amber-300/65 blur-md animate-pulse"
                  style={{ width: '24cqw', height: '24cqw' }}
                />
                <NarniaLamppostSvg className="relative text-amber-200 drop-shadow-[0_0_10px_rgba(251,191,36,0.9)] w-[20cqw] h-[20cqw]" />
              </div>

              {/* Thin golden ornamental rule */}
              <div
                className="bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
                style={{ width: '55%', height: '0.6cqw' }}
              />

              {/* The Phrase: Bienvenido al Reino de Nuestro Amor */}
              <h2
                className="font-serif-title font-medium text-amber-50 leading-[1.18] tracking-wide"
                style={{
                  fontSize: '12.5cqw',
                  textShadow:
                    '0 2px 14px rgba(0, 0, 0, 0.95), 0 0 22px rgba(245, 158, 11, 0.7)',
                }}
              >
                Bienvenido al Reino de Nuestro Amor
              </h2>

              {/* Thin golden ornamental rule */}
              <div
                className="bg-gradient-to-r from-transparent via-amber-300/80 to-transparent"
                style={{ width: '55%', height: '0.6cqw' }}
              />
            </div>
          </div>

          {/* 2. THE REAL NARNIA WARDROBE FRAME */}
          <img
            src="/media/narnia-frame.png"
            alt="Ropero Original de Narnia"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 drop-shadow-[0_24px_50px_rgba(0,0,0,0.95)]"
          />

          {/* 3. THE CENTER DOOR (Swings open in 3D) */}
          <div
            className={`absolute z-30 ${isOpen ? 'pointer-events-none' : ''}`}
            style={{
              left: '37.69%',
              top: '20.66%',
              width: '28.00%',
              height: '60.88%',
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
              transform: isOpen ? 'rotateY(118deg)' : 'rotateY(0deg)',
              transition: 'transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            <img
              src="/media/narnia-door.png"
              alt="Puerta del Ropero de Narnia"
              className="w-full h-full object-fill drop-shadow-lg"
            />

            {/* Glowing Golden Seam down the keyhole edge when closed */}
            {!isOpen && (
              <div className="absolute top-0 bottom-0 left-0 w-[2.5px] bg-gradient-to-b from-transparent via-amber-300 to-transparent shadow-[0_0_14px_#fbbf24] animate-pulse pointer-events-none" />
            )}
          </div>
        </div>
      </div>

      {/* 4. PRE-OPENING CTA */}
      <div
        className={`relative z-30 mt-5 sm:mt-6 text-center transition-all duration-700 ${
          isOpen ? 'opacity-0 translate-y-6 pointer-events-none' : 'opacity-100 translate-y-0'
        }`}
      >
        <button
          onClick={handleOpen}
          className={`px-8 py-3.5 sm:py-4 rounded-full font-cinzel text-xs sm:text-sm uppercase tracking-[0.22em] transition-all duration-300 shadow-2xl flex items-center gap-3 mx-auto border border-amber-300/60 cursor-pointer ${
            isHovered
              ? 'bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 text-emerald-950 scale-105 shadow-[0_0_38px_rgba(245,158,11,0.75)]'
              : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-stone-950 shadow-[0_0_22px_rgba(217,119,6,0.5)] hover:brightness-110'
          }`}
        >
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '5s' }} />
          <span>Toca el Ropero para Abrirlo</span>
        </button>
        <p className="text-[11px] text-amber-200/70 font-light mt-2.5 tracking-wider">
          Abre las puertas mágicas para iniciar la melodía y adentrarte en nuestra historia
        </p>
      </div>
    </div>
  );
};
