import React from 'react';
import { Compass, Waves, Sun, Flower2, HeartHandshake } from 'lucide-react';
import { ChapterDivider, OrnateCorners } from './NarniaOrnaments';

export const Story: React.FC = () => {
  const milestones = [
    {
      roman: 'I',
      tag: 'El Inicio de Cami',
      place: 'Los Palmitos, Sucre',
      coords: '9° 22′ N · Tierras del Sol',
      icon: Sun,
      description:
        'En medio de poemas, libros y flores creció Camila, y vivió los primeros 16 años de su vida en su pueblo natal, llena de sueños y fe.',
    },
    {
      roman: 'II',
      tag: 'El Inicio de Rau',
      place: 'Cartagena de Indias',
      coords: '10° 23′ N · Costa Amurallada',
      icon: Waves,
      description:
        'En la ciudad amurallada, llena de historias y atardeceres dorados nació Raúl, y ahí vivió los primeros 4 años de su vida.',
    },
    {
      roman: 'III',
      tag: 'El Encuentro',
      place: 'Medellín, Antioquia',
      coords: '6° 15′ N · Valle de la Primavera',
      icon: Flower2,
      description:
        'Y finalmente los caminos de Cami y Rau se juntaron en la ciudad de la eterna primavera, se conocieron hace 10 años, y lo que comenzó como una genuina amistad, hoy florece en los campos del amor.',
    },
    {
      roman: 'IV',
      tag: 'El Sí, Acepto',
      place: '31 de Enero de 2027',
      coords: 'Cair Paravel · Nuestro Nuevo Reino',
      icon: HeartHandshake,
      description:
        'Y como si cruzáramos el ropero hacia el mundo Narniano que Cami tanto ama, hemos programado el 31 de enero como el día para unir nuestras vidas delante de Dios y de nuestros seres amados.',
    },
  ];

  return (
    <section id="historia" className="py-20 sm:py-24 px-4 narnia-parchment relative overflow-hidden">
      {/* Vintage Narnia Cartographic Map Watermark Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.16] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url('/media/narnia-map.jpg')" }}
        aria-hidden="true"
      />

      {/* Warm antique edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(120,86,36,0.14)_100%)]"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Illuminated Chronicle Chapter Header */}
        <div className="text-center mb-14">
          <ChapterDivider label="Capítulo I · Las Crónicas" theme="parchment" />

          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-900/10 border border-amber-800/30 text-amber-900 mb-3 shadow-xs">
            <Compass className="w-6 h-6" />
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-medium text-emerald-950">
            Conoce Nuestra Travesía
          </h2>

          <p className="text-base sm:text-xl text-stone-700 max-w-xl mx-auto mt-3 font-serif-title italic">
            "Nacimos en la calidez de la costa y nos encontramos en la ciudad primaveral."
          </p>
        </div>

        {/* Cartographic Chronicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {milestones.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.tag}
                className="group relative bg-[#fbf6ea]/92 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border-2 border-amber-900/20 shadow-[0_10px_30px_rgba(74,50,18,0.1)] hover:shadow-[0_14px_38px_rgba(74,50,18,0.18)] hover:border-amber-700/45 transition-all duration-300 flex flex-col justify-between"
              >
                <OrnateCorners variant="dark-gold" />

                {/* Subtle Roman Numeral Watermark */}
                <span className="absolute top-5 right-7 font-cinzel-decorative text-4xl font-bold text-amber-900/12 pointer-events-none group-hover:text-amber-700/22 transition-colors">
                  {item.roman}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-emerald-950 text-amber-300 border border-amber-400/50 flex items-center justify-center group-hover:bg-amber-800 group-hover:text-amber-50 transition-colors shadow-sm shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-cinzel uppercase tracking-[0.22em] text-amber-800 block font-semibold">
                        {item.tag}
                      </span>
                      <h3 className="font-serif-title text-2xl font-semibold text-emerald-950 leading-tight">
                        {item.place}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-stone-700 font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="relative z-10 pt-5 mt-5 border-t border-amber-900/15 flex items-center justify-between text-[11px] text-amber-900/70 font-cinzel tracking-wider">
                  <span>{item.coords}</span>
                  <span className="text-amber-700">✦</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
