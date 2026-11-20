import React from 'react';
import { Compass, Waves, Sun, Flower2, HeartHandshake } from 'lucide-react';

export const Story: React.FC = () => {
  const milestones = [
    {
      title: 'Las Raíces de Camila',
      place: 'Los Palmitos, Sucre',
      icon: Sun,
      description:
        'Entre campos cálidos, brisas sabaneras y su amor por la naturaleza y las flores, creció Camila, con un corazón lleno de sueños y alegría.',
      tag: 'El Inicio de Ella',
    },
    {
      title: 'El Origen de Él',
      place: 'Cartagena de Indias',
      icon: Waves,
      description:
        'Cuna de historia, mar y atardeceres dorados frente al Caribe. Desde allí comenzó el viaje de una vida que estaba destinada a coincidir.',
      tag: 'El Inicio de Él',
    },
    {
      title: 'El Encuentro en Medellín',
      place: 'Medellín, Antioquia',
      icon: Flower2,
      description:
        'En la ciudad de la eterna primavera y los jardines en flor, dos caminos lejanos se cruzaron. Aquí construyeron su hogar, su complicidad y su amor.',
      tag: 'Nuestro Hogar',
    },
    {
      title: 'La Promesa Eterna',
      place: '31 de Enero de 2027',
      icon: HeartHandshake,
      description:
        'Como quien cruza el ropero hacia Narnia, decidimos dar el paso hacia nuestra mayor aventura: prometernos amor para toda la vida ante Dios y nuestros seres amados.',
      tag: 'El Sí, Acepto',
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
        <p className="text-xs uppercase tracking-[0.25em] text-stone-500 font-cinzel">
          Nuestra Travesía
        </p>
        <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-emerald-950 mt-1">
          De la Costa y la Sabana a la Ciudad de las Flores
        </h2>
        <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto mt-4 font-light leading-relaxed">
          Dos almas nacidas en tierras distintas que encontraron su propio hogar en Medellín, y ahora sellan su historia en una sola promesa.
        </p>
      </div>

      {/* Timeline Cards */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {milestones.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group relative bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-amber-900/10 shadow-sm hover:shadow-md hover:border-amber-700/30 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle number watermark */}
              <span className="absolute top-4 right-6 font-serif-title text-5xl font-light text-stone-200/60 pointer-events-none group-hover:text-amber-100/80 transition-colors">
                0{index + 1}
              </span>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-100/70 text-amber-800 flex items-center justify-center group-hover:bg-emerald-900 group-hover:text-amber-50 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-cinzel uppercase tracking-widest text-emerald-900/70 block">
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
                <span>Capítulo {index + 1}</span>
                <span className="text-amber-700">✦</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
