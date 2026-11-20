import { Countdown } from './Countdown';
import { Sparkles, Calendar, MapPin, ChevronDown } from 'lucide-react';

interface HeroProps {
  brideName: string;
  groomName: string;
  weddingDate: string;
}

export const Hero: React.FC<HeroProps> = ({
  brideName,
  groomName,
  weddingDate,
}) => {
  return (
    <section
      id="inicio"
      className="relative min-h-[95vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center overflow-hidden bg-gradient-to-b from-[#F5F2EB] via-[#FAF8F5] to-[#F5F2EB]"
    >
      {/* Delicate botanical & magical ambient background elements */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/20 via-emerald-100/30 to-amber-100/10 rounded-full blur-3xl pointer-events-none" />

      {/* Narnia Lantern Svg Icon with glowing aura */}
      <div className="relative mb-3 group cursor-default">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto flex items-center justify-center relative">
          <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-xl lantern-glow" />
          
          {/* Custom Stylized Victorian Lantern SVG */}
          <svg
            viewBox="0 0 64 64"
            className="w-10 h-10 sm:w-14 sm:h-14 text-amber-800 drop-shadow-md relative z-10"
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
        <p className="text-[10px] font-cinzel uppercase tracking-[0.25em] text-emerald-900/70 mt-1">
          « El Umbral hacia una Nueva Historia »
        </p>
      </div>

      {/* Main Couple Names */}
      <div className="max-w-3xl mx-auto space-y-1 mb-4">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-stone-500 font-cinzel">
          Nos Casamos
        </p>
        <h1 className="font-serif-title text-5xl sm:text-7xl md:text-8xl font-light text-emerald-950 tracking-tight leading-none">
          {brideName}
          <span className="block sm:inline font-script text-amber-700 text-4xl sm:text-6xl md:text-7xl mx-2 sm:mx-4 font-normal">
            &
          </span>
          {groomName}
        </h1>
        <p className="text-sm sm:text-lg font-serif-title italic text-stone-600 max-w-xl mx-auto pt-1">
          "A veces, abrir una puerta es el inicio de la mayor aventura de todas."
        </p>
      </div>

      {/* Couple Portrait Photo */}
      <div className="relative mb-6 group">
        <div className="w-36 h-48 sm:w-44 sm:h-56 mx-auto rounded-full overflow-hidden shadow-xl border-4 border-white ring-2 ring-amber-700/20 relative group-hover:scale-105 transition-transform duration-500">
          <img
            src="/media/foto-3.jpeg"
            alt={`${brideName} & ${groomName}`}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-0.5 rounded-full border border-amber-900/10 text-[10px] font-cinzel text-emerald-900 shadow-sm">
          Guatapé, Antioquia
        </div>
      </div>

      {/* Key Details Badge */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-medium text-stone-700 mb-6 font-cinzel">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-amber-900/10 shadow-sm">
          <Calendar className="w-4 h-4 text-amber-700" />
          <span>Domingo, 31 de Enero de 2027</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-amber-900/10 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>5:00 P.M.</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full border border-amber-900/10 shadow-sm">
          <MapPin className="w-4 h-4 text-emerald-800" />
          <span>Copacabana · Medellín</span>
        </div>
      </div>

      {/* Countdown Timer */}
      <div className="w-full mb-8">
        <Countdown targetDate={weddingDate} />
      </div>

      {/* Call to Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <a
          href="#rsvp"
          className="w-full sm:w-auto px-8 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-amber-50 font-cinzel text-xs sm:text-sm tracking-widest uppercase rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Confirmar Mi Asistencia
        </a>
        <a
          href="#evento"
          className="w-full sm:w-auto px-7 py-3.5 bg-white/80 hover:bg-white text-stone-800 font-cinzel text-xs sm:text-sm tracking-widest uppercase rounded-full border border-amber-900/15 shadow-sm hover:shadow transition-all duration-300"
        >
          Ver Itinerario & Mapa
        </a>
      </div>

      {/* Scroll indicator */}
      <a
        href="#historia"
        className="mt-10 text-stone-400 hover:text-emerald-900 transition-colors animate-bounce p-2"
        aria-label="Desplazar hacia abajo"
      >
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
};
