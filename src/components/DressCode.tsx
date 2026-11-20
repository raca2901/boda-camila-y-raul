import { Sparkles, Shirt } from 'lucide-react';

interface DressCodeProps {
  title: string;
  description: string;
}

export const DressCode: React.FC<DressCodeProps> = ({ title, description }) => {
  const rosePalette = [
    { hex: '#e57d90', name: 'Rosa Vintage' },
    { hex: '#f1889b', name: 'Rosa Floral' },
    { hex: '#f99aaa', name: 'Rosa Pastel' },
    { hex: '#fdb4bf', name: 'Rosa Empolvado' },
    { hex: '#ffcdd4', name: 'Rosa Blush' },
  ];

  const bluePalette = [
    { hex: '#005187', name: 'Azul Zafiro' },
    { hex: '#4d82bc', name: 'Azul Océano' },
    { hex: '#84b6f4', name: 'Azul Celeste' },
    { hex: '#c4dafa', name: 'Azul Brisa' },
    { hex: '#fcffff', name: 'Blanco Nieve' },
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
        
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed mb-10">
          {description}
        </p>

        {/* Official Palettes Container */}
        <div className="bg-white/90 backdrop-blur-sm p-6 sm:p-10 rounded-3xl border border-amber-900/10 shadow-md max-w-3xl mx-auto space-y-8">
          
          {/* Palette 1: Rosas Florales */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-[1px] w-8 bg-pink-300" />
              <p className="text-xs font-cinzel uppercase tracking-widest text-pink-900 font-semibold">
                Gama Floral & Rosas
              </p>
              <span className="h-[1px] w-8 bg-pink-300" />
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {rosePalette.map((color) => (
                <div key={color.hex} className="flex flex-col items-center group">
                  <div
                    className="w-11 h-11 sm:w-16 sm:h-16 rounded-2xl shadow-sm border border-stone-200/80 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[10px] sm:text-xs font-mono text-stone-500 mt-2 font-medium">
                    {color.hex}
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-stone-600 font-light hidden sm:inline">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full h-[1px] bg-stone-100" />

          {/* Palette 2: Azules Océano */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="h-[1px] w-8 bg-sky-300" />
              <p className="text-xs font-cinzel uppercase tracking-widest text-sky-950 font-semibold">
                Gama Costera & Azules
              </p>
              <span className="h-[1px] w-8 bg-sky-300" />
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {bluePalette.map((color) => (
                <div key={color.hex} className="flex flex-col items-center group">
                  <div
                    className="w-11 h-11 sm:w-16 sm:h-16 rounded-2xl shadow-sm border border-stone-200/80 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-[10px] sm:text-xs font-mono text-stone-500 mt-2 font-medium">
                    {color.hex}
                  </span>
                  <span className="text-[9px] sm:text-[11px] text-stone-600 font-light hidden sm:inline">
                    {color.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bride reservation note */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-center gap-2 text-xs text-amber-900/90 bg-amber-50/70 py-3 px-4 rounded-2xl">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Nota con cariño:</strong> El color blanco y marfil está reservado exclusivamente para la novia.
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
