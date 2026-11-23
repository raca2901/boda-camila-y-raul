import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
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
  const [isHovered, setIsHovered] = useState(false);

  const handleOpen = () => {
    if (isOpen) return;
    setIsOpen(true);
    onStartMusic();

    // Smooth transition into the wedding invitation after doors open
    setTimeout(() => {
      onOpenComplete();
    }, 1800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 select-none ${
        isOpen ? 'pointer-events-none' : ''
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #1F1510 0%, #0D0806 70%, #050302 100%)',
      }}
    >
      {/* Ambient background particles / warm dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-700/10 rounded-full blur-3xl" />
        {/* Subtle magical flakes */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fde68a_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      {/* Guest Welcome Header Pill */}
      <div className="relative z-20 mb-4 sm:mb-6 text-center px-4 animate-in fade-in slide-in-from-top-4 duration-700">
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

      {/* 3D Wardrobe Stage */}
      <div
        className="relative z-10 w-[300px] sm:w-[380px] md:w-[420px] h-[500px] sm:h-[580px] md:h-[620px] cursor-pointer group"
        onClick={handleOpen}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: '1400px' }}
      >
        {/* The Wardrobe Outer Frame / Cabinet */}
        <div className="relative w-full h-full rounded-t-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(217,119,6,0.15)] border-t-8 border-x-8 border-[#2E180E] bg-[#1A0D07] overflow-hidden flex flex-col">
          
          {/* Top Decorative Carved Pediment & Monogram */}
          <div className="h-14 sm:h-16 bg-gradient-to-b from-[#3D2013] via-[#2A150C] to-[#1F0F08] border-b-4 border-[#120804] flex items-center justify-center relative shadow-md">
            {/* Victorian Carved Flourish Crest */}
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 sm:w-12 bg-amber-500/40" />
              <div className="text-center">
                <span className="font-serif-title text-amber-200 font-semibold text-lg sm:text-xl tracking-widest block drop-shadow-md">
                  R & C
                </span>
                <span className="text-[9px] font-cinzel tracking-[0.25em] text-amber-400/60 uppercase block">
                  31 · 01 · 2027
                </span>
              </div>
              <span className="h-[1px] w-8 sm:w-12 bg-amber-500/40" />
            </div>
            {/* Top crown molding highlight */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
          </div>

          {/* Wardrobe Interior (Revealed when doors swing open) */}
          <div className="relative flex-1 bg-gradient-to-b from-[#0F1E29] via-[#162D3D] to-[#0A141C] overflow-hidden flex flex-col items-center justify-center">
            
            {/* Magical Light Rays */}
            <div
              className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-200/50 via-amber-400/20 to-transparent transition-opacity duration-1000 ${
                isOpen ? 'opacity-100 animate-pulse' : 'opacity-0'
              }`}
            />

            {/* Glowing Narnia Street Lamp */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-6">
              <div className="relative mb-3">
                <div className="absolute inset-0 bg-amber-300 rounded-full blur-2xl opacity-60 animate-ping" />
                <div className="relative w-16 h-16 rounded-full bg-amber-100/90 border border-amber-300 flex items-center justify-center shadow-[0_0_35px_#f59e0b]">
                  {/* Street lamp icon */}
                  <svg
                    viewBox="0 0 64 64"
                    className="w-10 h-10 text-amber-900"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="32" cy="8" r="4" stroke="currentColor" />
                    <path d="M24 16 L40 16 L36 22 L28 22 Z" fill="#b45309" />
                    <path d="M22 22 L42 22 L38 42 L26 42 Z" fill="#fef3c7" stroke="#b45309" />
                    <circle cx="32" cy="32" r="4" fill="#f59e0b" />
                    <line x1="32" y1="42" x2="32" y2="58" strokeWidth="3" />
                    <line x1="24" y1="58" x2="40" y2="58" strokeWidth="3" />
                  </svg>
                </div>
              </div>

              <h4 className="font-serif-title text-xl sm:text-2xl text-amber-100 font-normal leading-snug drop-shadow-md">
                Bienvenido al Reino de Nuestro Amor
              </h4>
              <p className="text-xs text-amber-200/80 font-cinzel tracking-wider mt-1">
                Entrando a la Boda de Raúl & Camila...
              </p>
            </div>

            {/* Winter pine silhouette background in wardrobe */}
            <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black/80 to-transparent opacity-60 pointer-events-none" />
          </div>

          {/* DOORS CONTAINER (Overlaid on top with 3D Origin) */}
          <div className="absolute inset-x-0 bottom-0 top-14 sm:top-16 flex z-30 pointer-events-none">
            
            {/* LEFT DOOR */}
            <div
              className="w-1/2 h-full relative"
              style={{
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                transform: isOpen ? 'rotateY(-118deg)' : 'rotateY(0deg)',
                transition: 'transform 1.6s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {/* Door Wood Panel */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#3D2013] via-[#4A2818] to-[#361B10] border-r border-[#1F0E07] shadow-inner p-3 flex flex-col justify-between">
                
                {/* 3 Carved Wooden Moldings */}
                <div className="h-1/3 rounded-xl border-2 border-[#5C321E]/60 bg-[#2E180E]/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-lg border border-amber-900/30" />
                </div>
                <div className="h-1/3 my-2 rounded-xl border-2 border-[#5C321E]/60 bg-[#2E180E]/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-lg border border-amber-900/30" />
                </div>
                <div className="h-1/3 rounded-xl border-2 border-[#5C321E]/60 bg-[#2E180E]/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-lg border border-amber-900/30" />
                </div>

                {/* Left Brass Antique Handle */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                  <div className="w-3.5 h-14 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#996515] shadow-lg border border-[#8C6D1F] flex flex-col items-center justify-around py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#59420B]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#59420B]" />
                  </div>
                </div>

                {/* Wood Grain Texture Overlay */}
                <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#000_0px,#000_2px,transparent_2px,transparent_8px)] pointer-events-none" />
              </div>
            </div>

            {/* RIGHT DOOR */}
            <div
              className="w-1/2 h-full relative"
              style={{
                transformOrigin: 'right center',
                transformStyle: 'preserve-3d',
                transform: isOpen ? 'rotateY(118deg)' : 'rotateY(0deg)',
                transition: 'transform 1.6s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {/* Door Wood Panel */}
              <div className="absolute inset-0 bg-gradient-to-l from-[#3D2013] via-[#4A2818] to-[#361B10] border-l border-[#1F0E07] shadow-inner p-3 flex flex-col justify-between">
                
                {/* 3 Carved Wooden Moldings */}
                <div className="h-1/3 rounded-xl border-2 border-[#5C321E]/60 bg-[#2E180E]/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-lg border border-amber-900/30" />
                </div>
                <div className="h-1/3 my-2 rounded-xl border-2 border-[#5C321E]/60 bg-[#2E180E]/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-lg border border-amber-900/30" />
                </div>
                <div className="h-1/3 rounded-xl border-2 border-[#5C321E]/60 bg-[#2E180E]/70 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center p-2">
                  <div className="w-full h-full rounded-lg border border-amber-900/30" />
                </div>

                {/* Right Brass Antique Handle & Keyhole */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <div className="w-3.5 h-14 rounded-full bg-gradient-to-r from-[#996515] via-[#F3E5AB] to-[#D4AF37] shadow-lg border border-[#8C6D1F] flex flex-col items-center justify-around py-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#59420B]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#59420B]" />
                  </div>
                  {/* Keyhole */}
                  <div className="w-2.5 h-5 bg-[#120703] rounded-full border border-amber-600/40 flex items-center justify-center shadow-inner">
                    <div className="w-1 h-2 bg-[#D4AF37] rounded-xs" />
                  </div>
                </div>

                {/* Wood Grain Texture Overlay */}
                <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(-45deg,#000_0px,#000_2px,transparent_2px,transparent_8px)] pointer-events-none" />
              </div>
            </div>

            {/* Glowing Seam Down the Center between doors (when closed) */}
            {!isOpen && (
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-transparent via-amber-300 to-transparent shadow-[0_0_12px_#fbbf24] animate-pulse pointer-events-none" />
            )}

          </div>

          {/* Bottom Cabinet Plinth / Feet */}
          <div className="h-4 bg-[#140804] border-t-2 border-[#2E180E]" />

        </div>

      </div>

      {/* Action CTA Button */}
      <div className="relative z-20 mt-6 sm:mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <button
          onClick={handleOpen}
          disabled={isOpen}
          className={`px-8 py-3.5 sm:py-4 rounded-full font-cinzel text-xs sm:text-sm uppercase tracking-[0.25em] transition-all duration-300 shadow-2xl flex items-center gap-3 mx-auto ${
            isOpen
              ? 'bg-amber-400/30 text-amber-200 scale-95 opacity-50 cursor-default'
              : isHovered
              ? 'bg-amber-400 text-stone-950 scale-105 shadow-[0_0_30px_rgba(245,158,11,0.6)]'
              : 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-stone-950 shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:brightness-110'
          }`}
        >
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '4s' }} />
          <span>
            {isOpen ? 'Abriendo el Ropero...' : 'Abre el Ropero para Entrar'}
          </span>
          <span className="text-base">🌲</span>
        </button>

        <p className="text-[11px] text-amber-200/50 font-light mt-3 tracking-wider">
          Toca el ropero o el botón para cruzar las puertas hacia Narnia
        </p>
      </div>

    </div>
  );
};
