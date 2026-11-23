import { Countdown } from './Countdown';
import { ChevronDown, Heart, Users } from 'lucide-react';
import type { Guest } from '../types/wedding';

interface HeroProps {
  weddingDate: string;
  guest?: Guest;
}

export const Hero: React.FC<HeroProps> = ({
  weddingDate,
  guest,
}) => {
  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center overflow-hidden bg-[#FAF8F5]"
    >
      {/* Nuevo Fondo Romántico & Narniano con aura mágica */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Resplandores etéreos */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-amber-200/25 via-emerald-100/35 to-rose-100/25 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-10 left-10 w-80 h-80 bg-[#84b6f4]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f99aaa]/15 rounded-full blur-3xl" />
        
        {/* Patrón sutil botánico de fondo */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#064e3b_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Distintivo de Invitado VIP si está presente */}
      {guest && (
        <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-amber-300 shadow-sm text-xs font-cinzel text-emerald-950 relative z-10 animate-in fade-in slide-in-from-top-2 duration-300">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>
            Invitación Exclusiva para: <strong>{guest.name}</strong>
          </span>
          <span className="text-stone-300">|</span>
          <span className="text-amber-800 font-semibold inline-flex items-center gap-1">
            <Users className="w-3 h-3" />
            {guest.passes} {guest.passes === 1 ? 'pase' : 'pases'}
          </span>
        </div>
      )}

      {/* Farol Narniano y Mensaje del Umbral */}
      <div className="relative mb-4 group cursor-default z-10 max-w-xl mx-auto">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto flex items-center justify-center relative mb-2">
          <div className="absolute inset-0 bg-amber-400/35 rounded-full blur-xl lantern-glow" />
          
          {/* Farol victoriano estilizado */}
          <svg
            viewBox="0 0 64 64"
            className="w-10 h-10 sm:w-12 sm:h-12 text-amber-800 drop-shadow-md relative z-10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="32" cy="7" r="4" stroke="currentColor" />
            <path d="M25 15 L32 11 L39 15 L32 18 Z" fill="currentColor" fillOpacity="0.2" />
            <path d="M21 21 L32 15 L43 21 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M23 21 L26 43 L38 43 L41 21 Z" />
            <line x1="32" y1="21" x2="32" y2="43" stroke="currentColor" strokeDasharray="1 2" />
            <circle cx="32" cy="32" r="3.5" fill="#f59e0b" stroke="#d97706" className="animate-pulse" />
            <path d="M24 43 L40 43 L36 49 L28 49 Z" fill="currentColor" fillOpacity="0.2" />
            <path d="M32 49 L32 60" strokeWidth="2.5" />
            <path d="M27 60 L37 60" strokeWidth="2" />
            <path d="M29 53 Q32 50 35 53 Q33 57 30 55" stroke="#059669" strokeWidth="1.2" fill="none" />
          </svg>
        </div>
        
        {/* Texto exacto pedido por Camila */}
        <p className="text-xs sm:text-sm font-cinzel text-emerald-950/80 px-4 leading-relaxed tracking-wider">
          Acompáñanos en la gran aventura de abrir las puertas hacia un nuevo capítulo de nuestra historia
        </p>
      </div>

      {/* Nombres Principales de los Novios */}
      <div className="max-w-3xl mx-auto space-y-2 mb-6 z-10">
        <p className="text-xs uppercase tracking-[0.3em] text-stone-500 font-cinzel">
          Nuestra Boda
        </p>
        <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-light text-emerald-950 tracking-tight leading-tight">
          Raúl Ernesto
          <span className="block sm:inline font-script text-amber-700 text-4xl sm:text-6xl md:text-7xl mx-2 sm:mx-4 font-normal">
            &
          </span>
          María Camila
        </h1>
        <p className="text-xs sm:text-base font-serif-title italic text-stone-600 max-w-lg mx-auto pt-1 font-light">
          "A veces, abrir una puerta es el inicio de la mayor aventura de todas."
        </p>
      </div>

      {/* Foto Inicial de la Pareja con Nuevo Marco Narniano */}
      <div className="relative mb-8 z-10 group">
        <div className="relative w-48 h-60 sm:w-56 sm:h-72 mx-auto rounded-3xl p-1.5 bg-gradient-to-tr from-amber-300 via-emerald-800 to-amber-200 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]">
          <div className="w-full h-full rounded-[22px] overflow-hidden bg-stone-100 relative">
            <img
              src="/media/foto-5.jpeg"
              alt="Raúl Ernesto & María Camila"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>
      </div>

      {/* Cuenta Regresiva */}
      <div className="w-full max-w-xl mx-auto mb-8 z-10">
        <Countdown targetDate={weddingDate} />
      </div>

      {/* Indicador de Desplazamiento */}
      <div className="z-10 flex flex-col items-center gap-1 text-stone-500 hover:text-emerald-950 transition-colors pt-2">
        <span className="text-[11px] font-cinzel uppercase tracking-widest text-stone-400">
          Conoce nuestra travesía
        </span>
        <a
          href="#historia"
          className="p-1 animate-bounce text-amber-800"
          aria-label="Desplazar hacia la historia"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>

    </section>
  );
};
