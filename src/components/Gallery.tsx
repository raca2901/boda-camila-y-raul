import { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

export const Gallery: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const galleryItems = [
    {
      src: '/media/foto-4.jpeg',
      title: 'Abrazo Inolvidable',
      subtitle: 'Piedra del Peñol',
      aspect: 'aspect-3/4',
    },
    {
      src: '/media/foto-2.jpeg',
      title: 'Frente al Embalse',
      subtitle: 'Mirando hacia nuestro futuro',
      aspect: 'aspect-3/4',
    },
    {
      src: '/media/foto-1.jpeg',
      title: 'Caminando Juntos',
      subtitle: 'Creando recuerdos para siempre',
      aspect: 'aspect-3/4',
    },
    {
      src: '/media/foto-3.jpeg',
      title: 'Cómplices de Vida',
      subtitle: 'Miradas que dicen todo',
      aspect: 'aspect-3/4',
    },
    {
      src: '/media/foto-5.jpeg',
      title: 'Amor en Cada Instante',
      subtitle: 'Camila & Raúl',
      aspect: 'aspect-3/4',
    },
  ];

  return (
    <section id="galeria" className="py-20 px-4 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* Header con el texto exacto pedido por Camila */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-cinzel uppercase tracking-widest mb-3">
            <Camera className="w-3.5 h-3.5 text-amber-700" />
            <span>Nuestros Recuerdos</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-normal text-emerald-950 max-w-3xl mx-auto leading-tight">
            Amamos hacernos fotos y videos y queremos compartir algunos de ellos contigo
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto mt-4 font-light">
            Guardamos muchos recuerdos de lugares, en la tierra que nos acogió: <strong>Antioquia</strong>.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-12">
          {galleryItems.map((item, idx) => (
            <div
              key={item.src}
              onClick={() => setSelectedMedia(item.src)}
              className={`group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-amber-900/10 ${
                idx === 0 ? 'col-span-2 md:col-span-1 row-span-1 md:row-span-1' : ''
              }`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-72 sm:h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-amber-50">
                <span className="text-[10px] font-cinzel uppercase tracking-wider text-amber-300">
                  {item.subtitle}
                </span>
                <h3 className="font-serif-title text-xl font-normal">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Video Especial */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-900/10 shadow-md">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-md bg-stone-900 aspect-video relative group">
              <video
                src="/media/video-1.mp4"
                controls
                playsInline
                className="w-full h-full object-cover"
                poster="/media/foto-2.jpeg"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 text-[11px] font-cinzel uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Video Especial</span>
              </div>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-normal text-emerald-950 leading-snug">
                Ese fue el lugar donde Rau le pidió a Cami que fuera su esposa
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                Un instante inolvidable en nuestras vidas, el inicio del camino hacia el altar y el comienzo de nuestra mayor aventura.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
          onClick={() => setSelectedMedia(null)}
        >
          <div className="relative max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={selectedMedia}
              alt="Momento ampliado"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
};
