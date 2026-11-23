import { Heart } from 'lucide-react';

interface FooterProps {
  brideName: string;
  groomName: string;
}

export const Footer: React.FC<FooterProps> = ({ brideName, groomName }) => {
  return (
    <footer className="py-16 px-4 bg-emerald-950 text-amber-50 text-center relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        
        {/* Monogram */}
        <div className="font-serif-title text-4xl sm:text-5xl font-light tracking-widest text-amber-100">
          {groomName} <span className="font-script text-amber-400 text-5xl sm:text-6xl">&</span> {brideName}
        </div>

        <p className="text-xs sm:text-sm font-cinzel uppercase tracking-[0.3em] text-amber-200/70">
          31 · Enero · 2027 · Medellín, Colombia
        </p>

        <div className="w-16 h-[1px] bg-amber-400/30 mx-auto" />

        <p className="font-serif-title italic text-base sm:text-lg text-amber-100/90 max-w-lg mx-auto font-light leading-relaxed">
          "A veces, abrir una puerta es el inicio de la mayor aventura de todas."
        </p>

        <div className="pt-6 text-[11px] text-amber-200/40 font-cinzel flex items-center justify-center gap-1.5">
          <span>Hecho con amor para nuestra boda</span>
          <Heart className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
        </div>

      </div>
    </footer>
  );
};
