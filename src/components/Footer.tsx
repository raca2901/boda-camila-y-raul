import { Heart } from 'lucide-react';
import { NarniaLamppostSvg } from './NarniaOrnaments';

interface FooterProps {
  brideName: string;
  groomName: string;
}

export const Footer: React.FC<FooterProps> = ({ brideName, groomName }) => {
  return (
    <footer className="py-20 px-4 bg-[#050e0c] text-amber-50 text-center relative overflow-hidden border-t border-amber-400/25">
      {/* Subtle twilight forest backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-bottom opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/media/narnia-forest-lantern.jpg')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#050e0c]/90 via-[#050e0c]/75 to-[#030807] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        {/* Small Aslan Crest + Lamppost Flourish */}
        <div className="flex items-center justify-center gap-4">
          <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
          <div className="w-16 h-16 rounded-full p-0.5 narnia-gilded-frame overflow-hidden shadow-[0_0_24px_rgba(212,175,55,0.28)]">
            <img
              src="/media/narnia-aslan-crest.jpg"
              alt="Escudo de Aslan"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
        </div>

        {/* Monogram */}
        <div className="font-serif-title text-4xl sm:text-5xl font-light tracking-widest text-amber-100">
          {groomName}{' '}
          <span className="font-script text-gold-foil text-5xl sm:text-6xl">&</span>{' '}
          {brideName}
        </div>

        <p className="text-xs sm:text-sm font-cinzel uppercase tracking-[0.3em] text-amber-300/80">
          31 · Enero · 2027 · Medellín, Colombia
        </p>

        <div className="flex items-center justify-center gap-2 text-amber-400/70">
          <NarniaLamppostSvg className="w-6 h-6" />
        </div>

        <p className="font-serif-title italic text-base sm:text-xl text-amber-100/90 max-w-lg mx-auto font-light leading-relaxed">
          "A veces, abrir una puerta es el inicio de la mayor aventura de todas."
        </p>

        <div className="pt-6 text-[11px] text-amber-200/45 font-cinzel flex items-center justify-center gap-1.5 tracking-wider">
          <span>Crónicas de Nuestra Boda · Hecho con amor</span>
          <Heart className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        </div>
      </div>
    </footer>
  );
};
