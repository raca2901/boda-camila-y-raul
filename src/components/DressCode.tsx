import React from 'react';
import { Shirt, Sparkles, Check, AlertCircle } from 'lucide-react';

interface DressCodeProps {
  title?: string;
  description?: string;
}

export const DressCode: React.FC<DressCodeProps> = () => {
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
    { hex: '#2c3e50', name: 'Azul Noche' },
  ];

  return (
    <section id="vestimenta" className="py-20 px-4 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto text-center">
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-cinzel uppercase tracking-widest mb-3">
          <Shirt className="w-3.5 h-3.5 text-amber-700" />
          <span>Código de Vestimenta</span>
        </div>
        
        <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-emerald-950 mb-3">
          Tu Esencia & Comodidad
        </h2>
        
        {/* Texto exacto pedido por Camila */}
        <p className="text-stone-600 text-base sm:text-lg max-w-xl mx-auto font-serif-title italic leading-relaxed mb-12">
          "Queremos que ese día puedas lucir con tu esencia, y disfrutes de la comodidad de ser tú."
        </p>

        {/* Las dos peticiones importantes y la foto de Cami vestida de blanco */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-amber-900/10 shadow-lg max-w-3xl mx-auto mb-10 text-left">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Foto de Cami vestida de blanco */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-48 sm:w-56 rounded-3xl overflow-hidden shadow-xl border-4 border-white ring-2 ring-amber-300/60 aspect-9/16 group">
                <img
                  src="/media/cami-blanco.jpeg"
                  alt="Camila vestida de blanco"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/30 to-transparent p-3 text-center">
                  <span className="text-[10px] font-cinzel uppercase tracking-widest text-amber-200 block font-semibold">
                    María Camila
                  </span>
                  <span className="text-[10px] text-white/90 font-light">
                    Reservado el Blanco
                  </span>
                </div>
              </div>
            </div>

            {/* Dos peticiones importantes */}
            <div className="md:col-span-7 space-y-6">
              
              <div>
                <span className="text-xs font-cinzel uppercase tracking-widest text-amber-700 font-semibold block mb-1">
                  Recomendaciones Especiales
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-normal text-emerald-950">
                  Solo tenemos dos peticiones importantes:
                </h3>
              </div>

              <div className="space-y-4">
                {/* Petición 1 */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-stone-50 border border-stone-200/80">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4 text-emerald-700" />
                  </div>
                  <div>
                    <span className="text-xs font-cinzel uppercase font-semibold text-emerald-950 block mb-0.5">
                      1. Coherencia con el contexto
                    </span>
                    <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                      Sé coherente con el contexto, es un momento profundamente significativo y valioso.
                    </p>
                  </div>
                </div>

                {/* Petición 2 */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <div className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4 text-amber-800" />
                  </div>
                  <div>
                    <span className="text-xs font-cinzel uppercase font-semibold text-amber-950 block mb-0.5">
                      2. El Color Blanco es Exclusivo de la Novia
                    </span>
                    <p className="text-xs sm:text-sm text-amber-900 font-light leading-relaxed">
                      El color blanco está reservado exclusivamente para Cami, de resto <strong>todos los colores que existen en la creación</strong> están habilitados para que puedas escoger cuál usar.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Paletas de Colores de Inspiración (Armonía Floral & Costera) */}
        <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm max-w-3xl mx-auto space-y-6">
          
          <div className="text-center">
            <span className="text-xs font-cinzel uppercase tracking-widest text-stone-500 font-semibold block">
              Inspiración de Tonos para el Evento
            </span>
            <p className="text-xs text-stone-500 font-light mt-0.5">
              Si deseas inspirarte en los tonos de la decoración floral y costera de nuestra boda:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            
            {/* Gama Floral & Rosas */}
            <div className="space-y-3">
              <span className="text-[11px] font-cinzel uppercase tracking-wider text-pink-900 font-semibold block text-center">
                Gama Floral & Rosas
              </span>
              <div className="flex justify-center gap-2">
                {rosePalette.map((color) => (
                  <div key={color.hex} className="flex flex-col items-center group">
                    <div
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl shadow-xs border border-stone-200/80 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                    <span className="text-[9px] font-mono text-stone-400 mt-1">
                      {color.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gama Costera & Azules */}
            <div className="space-y-3">
              <span className="text-[11px] font-cinzel uppercase tracking-wider text-sky-950 font-semibold block text-center">
                Gama Costera & Azules
              </span>
              <div className="flex justify-center gap-2">
                {bluePalette.map((color) => (
                  <div key={color.hex} className="flex flex-col items-center group">
                    <div
                      className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl shadow-xs border border-stone-200/80 transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                    <span className="text-[9px] font-mono text-stone-400 mt-1">
                      {color.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-center gap-2 text-xs text-stone-500 font-light">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>¡Elige el color que más te haga sonreír y prepárate para celebrar!</span>
          </div>

        </div>

      </div>
    </section>
  );
};
