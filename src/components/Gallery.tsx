import { useState } from 'react';
import { Camera, Sparkles, X } from 'lucide-react';
import { ChapterDivider, OrnateCorners } from './NarniaOrnaments';

export const Gallery: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const galleryItems = [
    {
      src: '/media/foto-4.jpeg',
      title: 'Abrazo Inolvidable',
      subtitle: 'Piedra del Peñol',
      roman: 'I',
    },
    {
      src: '/media/foto-2.jpeg',
      title: 'Frente al Embalse',
      subtitle: 'Mirando hacia nuestro futuro',
      roman: 'II',
    },
    {
      src: '/media/foto-1.jpeg',
      title: 'Caminando Juntos',
      subtitle: 'Creando recuerdos para siempre',
      roman: 'III',
    },
    {
      src: '/media/foto-3.jpeg',
      title: 'Cómplices de Vida',
      subtitle: 'Miradas que dicen todo',
      roman: 'IV',
    },
    {
      src: '/media/foto-5.jpeg',
      title: 'Amor en Cada Instante',
      subtitle: 'Raúl & Camila',
      roman: 'V',
    },
  ];

  return (
    <section id="galeria" className="py-20 sm:py-24 px-4 narnia-night text-amber-50 relative overflow-hidden">
      {/* Atmospheric candlelight glow & subtle starfield */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-12 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fde68a_1px,transparent_1px)] [background-size:36px_36px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header — Galería Real de Cair Paravel */}
        <div className="text-center mb-14">
          <ChapterDivider label="Capítulo II · Galería de Cair Paravel" theme="dark" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-200 text-xs font-cinzel uppercase tracking-widest mb-4">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            <span>Nuestros Recuerdos</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-light text-amber-50 max-w-3xl mx-auto leading-tight">
            Amamos hacernos fotos y videos y queremos compartir algunos de ellos contigo
          </h2>
          <p className="text-amber-100/75 text-sm sm:text-base max-w-xl mx-auto mt-4 font-light">
            Guardamos muchos recuerdos de lugares, en la tierra que nos acogió:{' '}
            <strong className="text-amber-300 font-medium">Antioquia</strong>.
          </p>
        </div>

        {/* Gilded Cair Paravel Portrait Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-7 mb-14">
          {galleryItems.map((item, idx) => (
            <div
              key={item.src}
              onClick={() => setSelectedMedia(item.src)}
              className={`group relative p-1.5 sm:p-2 rounded-2xl narnia-gilded-frame cursor-pointer transition-all duration-500 hover:-translate-y-1.5 ${
                idx === 0 ? 'col-span-2 md:col-span-1' : ''
              }`}
            >
              <div className="relative rounded-xl overflow-hidden bg-[#050d0b] border border-amber-200/20">
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-72 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle permanent brass vignette + hover reveal */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050d0b]/95 via-[#050d0b]/25 to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5 text-amber-50">
                  <span className="text-[10px] font-cinzel uppercase tracking-[0.22em] text-amber-300">
                    Retrato {item.roman} · {item.subtitle}
                  </span>
                  <h3 className="font-serif-title text-lg sm:text-xl font-normal text-amber-50 mt-0.5">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Video Especial de la Propuesta — Nuevo Video Actualizado */}
        <div className="relative bg-[#0c1e19]/90 backdrop-blur-md rounded-2xl p-6 sm:p-9 border border-amber-400/35 shadow-[0_24px_60px_rgba(0,0,0,0.65)]">
          <OrnateCorners variant="gold" />

          <div className="flex flex-col md:flex-row items-center gap-7 relative z-10">
            <div className="w-full md:w-1/2 p-1.5 rounded-2xl narnia-gilded-frame">
              <div className="rounded-xl overflow-hidden bg-black aspect-video relative">
                <video
                  src="/media/video-propuesta.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover bg-black"
                />
              </div>
            </div>

            <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/15 border border-amber-300/35 text-amber-200 text-[11px] font-cinzel uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Video de la Propuesta</span>
              </div>

              <h3 className="font-serif-title text-2xl sm:text-3xl font-normal text-amber-50 leading-snug">
                Ese fue el lugar donde Rau le pidió a Cami que fuera su esposa
              </h3>

              <div className="w-16 h-[1px] bg-amber-400/40 mx-auto md:mx-0" />

              <p className="text-xs sm:text-sm text-amber-100/75 font-light leading-relaxed">
                Un instante inolvidable en nuestras vidas, el inicio del camino hacia el altar y el comienzo de nuestra mayor aventura.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setSelectedMedia(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedMedia(null)}
            className="absolute top-5 right-5 p-2.5 rounded-full bg-amber-400/15 border border-amber-300/40 text-amber-100 hover:bg-amber-400/25 transition-colors"
            aria-label="Cerrar vista ampliada"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-3xl max-h-[90vh] p-2 rounded-2xl narnia-gilded-frame">
            <img
              src={selectedMedia}
              alt="Momento ampliado"
              className="max-w-full max-h-[82vh] object-contain rounded-xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
