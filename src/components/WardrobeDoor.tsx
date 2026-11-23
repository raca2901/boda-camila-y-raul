import React, { useState } from 'react';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';
import type { Guest } from '../types/wedding';

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

  const handleAdvance = () => {
    if (hasStartedTransition) return;
    setHasStartedTransition(true);
    setTimeout(() => {
      onOpenComplete();
    }, 600);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto overflow-x-hidden p-4 select-none transition-opacity duration-700 ${
        hasStartedTransition ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #1C110B 0%, #0D0704 60%, #030201 100%)',
      }}
    >
      {/* Ambient background particles & subtle Narnian twilight */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl" />
        {/* Subtle magical flakes */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fde68a_1px,transparent_1px)] [background-size:28px_28px]" />
      </div>

      {/* Guest Welcome Header Pill */}
      <div className="relative z-20 mb-3 sm:mb-4 text-center animate-in fade-in slide-in-from-top-4 duration-500">
        {guest ? (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/30 text-amber-100 text-xs font-cinzel shadow-lg">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>
              Invitación Exclusiva para: <strong>{guest.name}</strong>
            </span>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-300/20 text-amber-200/90 text-xs font-cinzel shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Boda de Raúl Ernesto & María Camila</span>
          </div>
        )}
      </div>

      {/* Main Wardrobe Stage */}
      <div className="relative z-10 flex flex-col items-center justify-center max-w-full">
        
        {/* 3D Perspective Container for the Real Wardrobe */}
        <div
          className="relative w-[310px] sm:w-[390px] md:w-[450px] lg:w-[480px] aspect-[650/731] cursor-pointer group"
          onClick={!isOpen ? handleOpen : undefined}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ perspective: '1600px' }}
        >
          
          {/* 1. PORTAL INTERIOR (Positioned directly behind the door cutout: 37.69% left, 20.66% top) */}
          <div
            className="absolute rounded-sm overflow-hidden z-0 flex flex-col items-center justify-center"
            style={{
              left: '37.69%',
              top: '20.66%',
              width: '28.00%',
              height: '60.88%',
              background: 'radial-gradient(ellipse at 50% 40%, #2A4858 0%, #102533 50%, #061017 100%)',
              boxShadow: isOpen ? '0 0 50px rgba(251, 191, 36, 0.6), inset 0 0 25px rgba(254, 240, 138, 0.4)' : 'none',
            }}
          >
            {/* Snowy Pine Trees & Twilight Ambience */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />

            {/* Glowing Narnia Street Lamp */}
            <div className={`relative z-20 flex flex-col items-center justify-center transition-all duration-1000 ${
              isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}>
              <div className="relative mb-2">
                <div className="absolute inset-0 bg-amber-300 rounded-full blur-xl opacity-75 animate-ping" />
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-amber-100/95 border-2 border-amber-400 flex items-center justify-center shadow-[0_0_35px_#f59e0b]">
                  {/* Street lamp vector */}
                  <svg
                    viewBox="0 0 64 64"
                    className="w-8 h-8 sm:w-9 sm:h-9 text-amber-950"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="32" cy="8" r="4" stroke="currentColor" />
                    <path d="M24 16 L40 16 L36 22 L28 22 Z" fill="#b45309" />
                    <path d="M22 22 L42 22 L38 42 L26 42 Z" fill="#fef3c7" stroke="#b45309" />
                    <circle cx="32" cy="32" r="4.5" fill="#f59e0b" />
                    <line x1="32" y1="42" x2="32" y2="58" strokeWidth="3" />
                    <line x1="24" y1="58" x2="40" y2="58" strokeWidth="3" />
                  </svg>
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-cinzel uppercase tracking-widest text-amber-200 font-bold drop-shadow-md text-center px-1">
                Narnia
              </span>
            </div>

            {/* Light burst through doorway */}
            <div
              className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/50 via-amber-400/20 to-transparent transition-opacity duration-1000 pointer-events-none ${
                isOpen ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>

          {/* 2. THE REAL NARNIA WARDROBE FRAME (Cutout image of Aslan's columns & carved pediment) */}
          <img
            src="/media/narnia-frame.png"
            alt="Ropero Original de Narnia"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]"
          />

          {/* 3. THE CENTER DOOR (With Crown, Aslan's Tree, and Rising Sun Carvings) */}
          <div
            className="absolute z-20"
            style={{
              left: '37.69%',
              top: '20.66%',
              width: '28.00%',
              height: '60.88%',
              transformOrigin: 'right center', // Hinges are on the right edge
              transformStyle: 'preserve-3d',
              transform: isOpen ? 'rotateY(112deg)' : 'rotateY(0deg)',
              transition: 'transform 1.8s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          >
            {/* Door Image with Real Carvings */}
            <img
              src="/media/narnia-door.png"
              alt="Puerta del Ropero de Narnia"
              className="w-full h-full object-fill drop-shadow-lg"
            />

            {/* Glowing Golden Seam down the keyhole side (when closed) */}
            {!isOpen && (
              <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-amber-300 to-transparent shadow-[0_0_12px_#fbbf24] animate-pulse pointer-events-none" />
            )}
          </div>

        </div>

      </div>

      {/* 4. POST-OPENING REVEAL & INVITATION TO ADVANCE (Without rush!) */}
      {!isOpen ? (
        /* Estado Pre-Apertura: Botón para abrir el ropero */
        <div className="relative z-20 mt-4 sm:mt-6 text-center animate-in fade-in slide-in-from-bottom-3 duration-500">
          <button
            onClick={handleOpen}
            className={`px-8 py-3.5 sm:py-4 rounded-full font-cinzel text-xs sm:text-sm uppercase tracking-[0.25em] transition-all duration-300 shadow-2xl flex items-center gap-3 mx-auto ${
              isHovered
                ? 'bg-amber-400 text-stone-950 scale-105 shadow-[0_0_35px_rgba(245,158,11,0.7)]'
                : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-stone-950 shadow-[0_0_20px_rgba(217,119,6,0.5)] hover:brightness-110'
            }`}
          >
            <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Toca el Ropero para Abrirlo</span>
            <span className="text-base">🌲</span>
          </button>
          <p className="text-[11px] text-amber-200/60 font-light mt-2 tracking-wider">
            Abre las puertas para iniciar la música y cruzar a nuestra historia
          </p>
        </div>
      ) : (
        /* Estado Abierto: Mensaje Romántico Completo y Botón para Avanzar (El usuario se toma todo el tiempo necesario) */
        <div className="relative z-20 mt-4 sm:mt-5 max-w-lg w-full text-center px-4 animate-in fade-in zoom-in-95 duration-700">
          
          <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-7 border border-amber-300/40 shadow-2xl space-y-3.5">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-cinzel uppercase tracking-widest font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Has Cruzado el Ropero</span>
            </div>

            <h3 className="font-serif-title text-2xl sm:text-3xl text-emerald-950 font-normal leading-tight">
              Bienvenido al Reino de Nuestro Amor
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 font-serif-title italic leading-relaxed px-2">
              «Acompáñanos en la gran aventura de abrir las puertas hacia un nuevo capítulo de nuestra historia.»
            </p>

            <div className="text-[11px] font-cinzel uppercase tracking-widest text-emerald-900/70 font-semibold border-y border-stone-100 py-1.5">
              Raúl Ernesto & María Camila · 31 de Enero de 2027
            </div>

            {/* Botón Claro y Destacado para Entrar cuando el Invitado Termine de Leer */}
            <div className="pt-2">
              <button
                onClick={handleAdvance}
                className="w-full py-3.5 sm:py-4 px-6 bg-emerald-950 hover:bg-emerald-900 text-amber-50 font-cinzel text-xs sm:text-sm uppercase tracking-widest rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group hover:scale-[1.02]"
              >
                <span>Entrar a Nuestra Boda</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-amber-400" />
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
