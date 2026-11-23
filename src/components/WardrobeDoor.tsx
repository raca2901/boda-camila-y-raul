import React, { useState } from 'react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import type { Guest } from '../types/wedding';
import { NarniaLamppostSvg } from './NarniaOrnaments';

interface WardrobeDoorProps {
  onOpenComplete: () => void;
  onStartMusic: () => void;
  guest?: Guest | null;
}

export const WardrobeDoor: React.FC<WardrobeDoorProps> = ({
  onOpenComplete,
  onStartMusic,
  guest,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasStartedTransition, setHasStartedTransition] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    onStartMusic();
  };

  const handleAdvance = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasStartedTransition) return;
    setHasStartedTransition(true);
    setTimeout(() => {
      onOpenComplete();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden p-4 select-none transition-opacity duration-700 ${
        hasStartedTransition ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #1a1109 0%, #0b0a08 55%, #030706 100%)',
      }}
    >
      {/* Ambient Narnian twilight, golden lantern haze & drifting snow particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-800/15 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fde68a_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Guest Welcome Header Pill (fades smoothly as we step into the open wardrobe) */}
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
        {/* 3D Perspective Container for the Real Narnia Wardrobe — zooms into the open doorway */}
        <div
          className={`relative w-[320px] sm:w-[400px] md:w-[450px] aspect-[650/731] transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isOpen
              ? 'scale-[2.5] sm:scale-[2.15] md:scale-[1.95] cursor-default'
              : 'scale-100 cursor-pointer group'
          }`}
          onClick={!isOpen ? handleOpen : undefined}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            perspective: '1600px',
            transformOrigin: '51.69% 51.10%',
          }}
        >
          {/* 1. PORTAL INTERIOR (Strictly inside the real carved wooden doorway opening) */}
          <div
            className="absolute overflow-hidden z-10 flex flex-col items-center justify-center"
            style={{
              left: '37.69%',
              top: '20.66%',
              width: '28.00%',
              height: '60.88%',
              containerType: 'size',
              background:
                'radial-gradient(ellipse at 50% 28%, #1e424e 0%, #0d2229 48%, #040d10 100%)',
              boxShadow: isOpen
                ? '0 0 45px rgba(251, 191, 36, 0.5), inset 0 0 28px rgba(253, 230, 138, 0.35)'
                : 'none',
            }}
          >
            {/* Snowy Narnia Forest Backdrop inside the wardrobe */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-55 transition-opacity duration-1000"
              style={{
                backgroundImage: "url('/media/narnia-forest-lantern.jpg')",
              }}
            />

            {/* Twilight vignette + warm lantern light burst */}
            <div
              className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                background:
                  'radial-gradient(circle at 50% 18%, rgba(251,191,36,0.35) 0%, rgba(7,20,17,0.58) 45%, rgba(4,12,10,0.88) 100%)',
              }}
            />

            {/* Delicate falling snow flecks inside the doorway */}
            <div
              className="absolute inset-0 opacity-35 pointer-events-none bg-[radial-gradient(#fffbeb_1px,transparent_1px)] [background-size:14px_14px]"
              aria-hidden="true"
            />

            {/* WELCOME CONTENT & ENTER BUTTON — STRICTLY INSIDE THE WARDROBE */}
            <div
              className={`relative z-20 w-full h-full flex flex-col items-center justify-between text-center transition-all duration-1000 delay-500 ${
                isOpen
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-2 scale-95 pointer-events-none'
              }`}
              style={{
                padding: '7cqw 6.5cqw 7.5cqw',
              }}
            >
              {/* Top: Glowing Victorian Narnia Lamppost + Badge */}
              <div className="flex flex-col items-center" style={{ gap: '3cqw' }}>
                <div className="relative flex items-center justify-center">
                  <div
                    className="absolute rounded-full bg-amber-300/60 blur-md animate-pulse"
                    style={{ width: '20cqw', height: '20cqw' }}
                  />
                  <div
                    className="relative rounded-full bg-[#091c18]/90 border border-amber-300/70 flex items-center justify-center shadow-[0_0_16px_rgba(251,191,36,0.65)]"
                    style={{ width: '17cqw', height: '17cqw' }}
                  >
                    <NarniaLamppostSvg className="w-[70%] h-[70%] text-amber-300" />
                  </div>
                </div>

                <div
                  className="inline-flex items-center justify-center rounded-full bg-amber-400/15 border border-amber-300/45 text-amber-200 font-cinzel uppercase font-semibold tracking-wider backdrop-blur-xs"
                  style={{
                    fontSize: '3.6cqw',
                    padding: '1.6cqw 3.8cqw',
                    gap: '1.5cqw',
                  }}
                >
                  <Sparkles style={{ width: '3.8cqw', height: '3.8cqw' }} className="text-amber-300 shrink-0" />
                  <span>Has Cruzado el Ropero</span>
                </div>
              </div>

              {/* Middle: Parchment-illuminated Welcome Message */}
              <div
                className="w-full flex flex-col items-center rounded-lg border border-amber-300/30 bg-[#f6efe0]/95 shadow-[0_6px_20px_rgba(0,0,0,0.55)]"
                style={{
                  padding: '5.5cqw 4.8cqw',
                  gap: '3.2cqw',
                }}
              >
                <h2
                  className="font-serif-title text-emerald-950 font-semibold leading-[1.12]"
                  style={{ fontSize: '9.8cqw' }}
                >
                  Bienvenido al Reino de Nuestro Amor
                </h2>

                <div
                  className="bg-gradient-to-r from-transparent via-amber-700/45 to-transparent"
                  style={{ width: '48%', height: '0.5cqw' }}
                />

                <p
                  className="font-serif-title italic text-stone-700 leading-[1.35]"
                  style={{ fontSize: '5.5cqw' }}
                >
                  «Acompáñanos en la gran aventura de abrir las puertas hacia un nuevo capítulo de nuestra historia.»
                </p>

                <div
                  className="w-full border-y border-amber-900/15 font-cinzel uppercase text-emerald-900 font-semibold tracking-wider leading-[1.35]"
                  style={{
                    fontSize: '3.7cqw',
                    padding: '2.2cqw 1cqw',
                  }}
                >
                  Raúl Ernesto & María Camila
                  <span className="block text-amber-800" style={{ fontSize: '3.5cqw', marginTop: '0.6cqw' }}>
                    31 de Enero de 2027
                  </span>
                </div>

                {/* Button to Enter the Wedding — right inside the wardrobe */}
                <button
                  type="button"
                  onClick={handleAdvance}
                  className="w-full bg-emerald-950 hover:bg-emerald-900 active:scale-[0.98] text-amber-100 border border-amber-400/55 font-cinzel uppercase tracking-widest rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center group cursor-pointer"
                  style={{
                    fontSize: '4.1cqw',
                    padding: '3.8cqw 3cqw',
                    gap: '2cqw',
                  }}
                >
                  <span>Entrar a Nuestra Boda</span>
                  <ArrowRight
                    style={{ width: '4.5cqw', height: '4.5cqw' }}
                    className="text-amber-300 transition-transform group-hover:translate-x-0.5 shrink-0"
                  />
                </button>
              </div>

              {/* Subtle bottom guest tag inside portal */}
              <div
                className="font-cinzel uppercase tracking-widest text-amber-200/80 truncate max-w-full"
                style={{ fontSize: '3.4cqw' }}
              >
                {guest ? `Para: ${guest.name}` : 'Narnia · 31 · 01 · 2027'}
              </div>
            </div>
          </div>

          {/* 2. THE REAL NARNIA WARDROBE FRAME (Carved columns & crown mask portal edges cleanly) */}
          <img
            src="/media/narnia-frame.png"
            alt="Ropero Original de Narnia"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 drop-shadow-[0_24px_50px_rgba(0,0,0,0.95)]"
          />

          {/* 3. THE CENTER DOOR (Swings open in 3D to reveal the message inside) */}
          <div
            className={`absolute z-30 ${isOpen ? 'pointer-events-none' : ''}`}
            style={{
              left: '37.69%',
              top: '20.66%',
              width: '28.00%',
              height: '60.88%',
              transformOrigin: 'right center',
              transformStyle: 'preserve-3d',
              transform: isOpen ? 'rotateY(115deg)' : 'rotateY(0deg)',
              transition: 'transform 1.6s cubic-bezier(0.25, 1, 0.5, 1)',
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

      {/* 4. PRE-OPENING CTA (Disappears cleanly once opened so all focus is INSIDE the wardrobe) */}
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
          Abre las puertas mágicas para iniciar la melodía y cruzar hacia nuestra historia
        </p>
      </div>
    </div>
  );
};
