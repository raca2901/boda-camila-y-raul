import { Countdown } from './Countdown';
import { ChevronDown, Heart, Users } from 'lucide-react';
import type { Guest } from '../types/wedding';
import { NarniaLamppostSvg } from './NarniaOrnaments';

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
      className="relative min-h-[96vh] flex flex-col items-center justify-center pt-24 pb-16 px-4 text-center overflow-hidden bg-[#071411] text-amber-50"
    >
      {/* Fondo Cinematográfico del Bosque Nocturno de Narnia y el Farol */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 pointer-events-none"
        style={{ backgroundImage: "url('/media/narnia-forest-lantern.jpg')" }}
        aria-hidden="true"
      />

      {/* Capas de profundidad, niebla esmeralda y resplandor dorado del farol */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 24%, rgba(212,175,55,0.20) 0%, rgba(7,20,17,0.72) 48%, rgba(5,13,11,0.96) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Sutil polvo estelar dorado */}
      <div
        className="absolute inset-0 opacity-20 bg-[radial-gradient(#fde68a_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Distintivo de Invitado VIP */}
      {guest && (
        <div className="mb-5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#091c18]/85 backdrop-blur-md border border-amber-400/40 shadow-lg text-xs font-cinzel text-amber-100 relative z-10 animate-in fade-in slide-in-from-top-2 duration-300">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
          <span>
            Invitación Exclusiva para: <strong className="text-amber-300">{guest.name}</strong>
          </span>
          <span className="text-amber-400/35">|</span>
          <span className="text-amber-300 font-semibold inline-flex items-center gap-1">
            <Users className="w-3 h-3" />
            {guest.passes} {guest.passes === 1 ? 'pase' : 'pases'}
          </span>
        </div>
      )}

      {/* Emblema Real de Aslan & Farol del Umbral */}
      <div className="relative mb-4 z-10 max-w-xl mx-auto flex flex-col items-center">
        <div className="relative mb-3 flex items-center justify-center">
          <div className="absolute -inset-3 bg-amber-400/25 rounded-full blur-2xl lantern-glow" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 narnia-gilded-frame overflow-hidden">
            <img
              src="/media/narnia-aslan-crest.jpg"
              alt="Escudo Real de Aslan"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Texto exacto pedido por Camila */}
        <p className="text-xs sm:text-sm font-cinzel text-amber-200/90 px-4 leading-relaxed tracking-[0.16em] uppercase">
          Acompáñanos en la gran aventura de abrir las puertas hacia un nuevo capítulo de nuestra historia
        </p>
      </div>

      {/* Nombres Principales de los Novios */}
      <div className="max-w-3xl mx-auto space-y-2.5 mb-7 z-10">
        <div className="flex items-center justify-center gap-3">
          <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-r from-transparent to-amber-400/70" />
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-amber-300 font-cinzel">
            Las Crónicas de Nuestra Boda
          </p>
          <span className="h-[1px] w-10 sm:w-16 bg-gradient-to-l from-transparent to-amber-400/70" />
        </div>

        <h1 className="font-serif-title text-4xl sm:text-6xl md:text-7xl font-light text-amber-50 tracking-tight leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
          Raúl Ernesto
          <span className="block sm:inline font-script text-gold-foil text-5xl sm:text-6xl md:text-7xl mx-2 sm:mx-4 font-normal">
            &
          </span>
          María Camila
        </h1>

        <p className="text-xs sm:text-base font-cinzel tracking-[0.26em] text-amber-300/90 uppercase">
          31 · Enero · 2027 · Copacabana, Antioquia
        </p>

        <p className="text-sm sm:text-lg font-serif-title italic text-amber-100/80 max-w-lg mx-auto pt-1 font-light">
          "A veces, abrir una puerta es el inicio de la mayor aventura de todas."
        </p>
      </div>

      {/* Foto Inicial de la Pareja con Marco Dorado Estilo Cair Paravel */}
      <div className="relative mb-8 z-10 group">
        <div className="absolute -inset-4 bg-amber-500/15 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative w-52 h-64 sm:w-60 sm:h-76 mx-auto rounded-2xl p-2 narnia-gilded-frame transition-transform duration-500 group-hover:scale-[1.02]">
          <div className="w-full h-full rounded-xl overflow-hidden bg-[#050d0b] relative border border-amber-200/35">
            <img
              src="/media/foto-5.jpeg"
              alt="Raúl Ernesto & María Camila"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-amber-200/30 rounded-xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Cuenta Regresiva Tallada en Oro */}
      <div className="w-full max-w-xl mx-auto mb-7 z-10">
        <div className="flex items-center justify-center gap-2 mb-2 text-amber-300/80">
          <NarniaLamppostSvg className="w-5 h-5" />
          <span className="text-[11px] font-cinzel uppercase tracking-[0.25em]">
            Faltan para el Gran Día
          </span>
        </div>
        <Countdown targetDate={weddingDate} />
      </div>

      {/* Indicador de Desplazamiento */}
      <div className="z-10 flex flex-col items-center gap-1 text-amber-200/75 hover:text-amber-300 transition-colors pt-1">
        <span className="text-[11px] font-cinzel uppercase tracking-[0.24em]">
          Conoce nuestra travesía
        </span>
        <a
          href="#historia"
          className="p-1.5 animate-bounce text-amber-400"
          aria-label="Desplazar hacia la historia"
        >
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
