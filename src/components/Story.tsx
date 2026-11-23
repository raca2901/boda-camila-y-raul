import React from 'react';
import { Compass, Waves, Sun, Flower2, HeartHandshake } from 'lucide-react';

export const Story: React.FC = () => {
  const milestones = [
    {
      tag: 'El Inicio de Cami',
      place: 'Los Palmitos, Sucre',
      icon: Sun,
      description:
        'En medio de poemas, libros y flores creció Camila, y vivió los primeros 16 años de su vida en su pueblo natal, llena de sueños y fe.',
    },
    {
      tag: 'El Inicio de Rau',
      place: 'Cartagena de Indias',
      icon: Waves,
      description:
        'En la ciudad amurallada, llena de historias y atardeceres dorados nació Raúl, y ahí vivió los primeros 4 años de su vida.',
    },
    {
      tag: 'El Encuentro',
      place: 'Medellín, Antioquia',
      icon: Flower2,
      description:
        'Y finalmente los caminos de Cami y Rau se juntaron en la ciudad de la eterna primavera, se conocieron hace 10 años, y lo que comenzó como una genuina amistad, hoy florece en los campos del amor.',
    },
    {
      tag: 'El Sí, Acepto',
      place: '31 de Enero de 2027',
      icon: HeartHandshake,
      description:
        'Y como si cruzáramos el ropero hacia el mundo Narniano que Cami tanto ama, hemos programado el 31 de enero como el día para unir nuestras vidas delante de Dios y de nuestros seres amados.',
    },
  ];

  return (
    <section id="historia" className="py-20 px-4 bg-[#FAF8F5] relative overflow-hidden">
      {/* Decorative leaf/flower divider */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-[1px] w-12 bg-amber-800/20" />
          <Compass className="w-5 h-5 text-amber-700" />
          <span className="h-[1px] w-12 bg-amber-800/20" />
        </div>
        <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-emerald-950">
          Conoce Nuestra Travesía
        </h2>
        <p className="text-sm sm:text-lg text-stone-600 max-w-xl mx-auto mt-3 font-serif-title italic">
          "Nacimos en la calidez de la costa y nos encontramos en la ciudad primaveral."
        </p>
      </div>

      {/* Timeline Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {milestones.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.tag}
              className="group relative bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm hover:shadow-md hover:border-amber-700/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle number watermark */}
              <span className="absolute top-4 right-6 font-serif-title text-5xl font-light text-stone-200/60 pointer-events-none group-hover:text-amber-100/80 transition-colors">
                0{index + 1}
              </span>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100/70 text-amber-800 flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-amber-50 transition-colors shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-cinzel uppercase tracking-widest text-emerald-900/80 block font-semibold">
                      {item.tag}
                    </span>
                    <h3 className="font-serif-title text-xl sm:text-2xl font-medium text-emerald-950">
                      {item.place}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-stone-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-amber-900/5 flex items-center justify-between text-xs text-stone-400 font-cinzel">
                <span>Capítulo 0{index + 1}</span>
                <span className="text-amber-700">✦</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
