import React from 'react';
import { Sparkles, Shirt } from 'lucide-react';

interface DressCodeProps {
  title: string;
  description: string;
}

export const DressCode: React.FC<DressCodeProps> = ({ title, description }) => {
  const suggestedColors = [
    { name: 'Verde Bosque', hex: '#233827', label: 'Elegancia botánica' },
    { name: 'Champaña', hex: '#E7D7C1', label: 'Luz y calidez' },
    { name: 'Rosa Empolvado', hex: '#D8A49B', label: 'Romanticismo floral' },
    { name: 'Terracota Suave', hex: '#C27D60', label: 'Tierra y vida' },
    { name: 'Azul Noche', hex: '#1E293B', label: 'Noche estrellada' },
  ];

  return (
    <section id="vestimenta" className="py-20 px-4 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-cinzel uppercase tracking-widest mb-3">
          <Shirt className="w-3.5 h-3.5" />
          <span>Código de Vestimenta</span>
        </div>
        
        <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-emerald-950 mb-4">
          {title}
        </h2>
        
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed mb-8">
          {description}
        </p>

        {/* Suggestion Swatches */}
        <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm max-w-2xl mx-auto">
          <p className="text-xs font-cinzel uppercase tracking-widest text-emerald-900 mb-6">
            Paleta de Colores Inspirada en Narnia & Jardines
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {suggestedColors.map((color) => (
              <div key={color.name} className="flex flex-col items-center group">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-md border-2 border-white ring-1 ring-stone-200 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs font-medium text-stone-700 mt-2">
                  {color.name}
                </span>
                <span className="text-[10px] text-stone-400 font-light">
                  {color.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-center gap-2 text-xs text-amber-900/80 bg-amber-50/60 py-3 px-4 rounded-xl">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Nota con amor:</strong> El color blanco y marfil está reservado exclusivamente para la novia.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
