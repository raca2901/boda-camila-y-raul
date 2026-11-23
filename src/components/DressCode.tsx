import React from 'react';
import { Shirt, Check, AlertCircle } from 'lucide-react';
import { ChapterDivider, OrnateCorners } from './NarniaOrnaments';

interface DressCodeProps {
  title?: string;
  description?: string;
}

export const DressCode: React.FC<DressCodeProps> = () => {
  return (
    <section id="vestimenta" className="py-20 sm:py-24 px-4 narnia-parchment-deep relative overflow-hidden">
      {/* Subtle parchment vignette border */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(120,86,36,0.1)_100%)]" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <ChapterDivider label="Capítulo IV · Código de Vestimenta" theme="parchment" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/10 border border-amber-800/25 text-amber-950 text-xs font-cinzel uppercase tracking-widest mb-3">
          <Shirt className="w-3.5 h-3.5 text-amber-800" />
          <span>Etiqueta del Reino</span>
        </div>

        <h2 className="font-serif-title text-3xl sm:text-5xl font-medium text-emerald-950 mb-3">
          Tu Esencia & Comodidad
        </h2>

        {/* Texto exacto pedido por Camila */}
        <p className="text-stone-700 text-base sm:text-xl max-w-xl mx-auto font-serif-title italic leading-relaxed mb-12">
          "Queremos que ese día puedas lucir con tu esencia, y disfrutes de la comodidad de ser tú."
        </p>

        {/* Tarjeta de Pergamino Real: las dos peticiones importantes y la nueva foto de Cami vestida de blanco */}
        <div className="relative bg-[#fbf6ea]/95 backdrop-blur-sm rounded-2xl p-6 sm:p-10 border-2 border-amber-800/25 shadow-[0_14px_40px_rgba(68,46,16,0.12)] max-w-3xl mx-auto text-left">
          <OrnateCorners variant="dark-gold" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            {/* Nueva Foto de Cami vestida de blanco en marco dorado */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="p-2 rounded-2xl narnia-gilded-frame w-56 sm:w-64 group">
                <div className="relative w-full rounded-xl overflow-hidden aspect-[3/4] bg-stone-900">
                  <img
                    src="/media/cami-blanco-nuevo.jpg"
                    alt="María Camila vestida de blanco"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#071411]/95 via-[#071411]/55 to-transparent p-3.5 text-center">
                    <span className="text-[10px] font-cinzel uppercase tracking-[0.22em] text-amber-300 block font-semibold">
                      María Camila
                    </span>
                    <span className="text-[11px] text-amber-50/95 font-serif-title italic">
                      Blanco reservado para la novia
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dos peticiones importantes */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-cinzel uppercase tracking-[0.22em] text-amber-800 font-semibold block mb-1">
                  Decreto Real · Recomendaciones
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-medium text-emerald-950 leading-snug">
                  Solo tenemos dos peticiones importantes:
                </h3>
              </div>

              <div className="space-y-4">
                {/* Petición 1 */}
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#f3ebd8]/90 border border-amber-900/15 shadow-xs">
                  <div className="w-8 h-8 rounded-full bg-emerald-950 text-amber-300 flex items-center justify-center shrink-0 mt-0.5 border border-amber-400/40">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-cinzel uppercase font-semibold text-emerald-950 block mb-0.5 tracking-wider">
                      1. Coherencia con el contexto
                    </span>
                    <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed">
                      Sé coherente con el contexto, es un momento profundamente significativo y valioso.
                    </p>
                  </div>
                </div>

                {/* Petición 2 */}
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#7c1d24]/8 border border-[#881319]/25 shadow-xs">
                  <div className="w-8 h-8 rounded-full wax-seal text-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <AlertCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-cinzel uppercase font-semibold text-[#6e1218] block mb-0.5 tracking-wider">
                      2. El Color Blanco es Exclusivo de la Novia
                    </span>
                    <p className="text-xs sm:text-sm text-stone-800 font-light leading-relaxed">
                      El color blanco está reservado exclusivamente para Cami, de resto{' '}
                      <strong className="font-semibold text-emerald-950">
                        todos los colores que existen en la creación
                      </strong>{' '}
                      están habilitados para que puedas escoger cuál usar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
