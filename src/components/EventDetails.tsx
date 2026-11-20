import { Church, GlassWater, Utensils, Music, MapPin, ExternalLink, CalendarPlus, Clock, Navigation } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';

interface EventDetailsProps {
  config: WeddingConfig;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ config }) => {
  const wazeUrl = 'https://waze.com/ul?ll=6.3665924,-75.5034103&navigate=yes';

  const scheduleItems = [
    {
      time: '5:00 P.M.',
      title: 'Ceremonia Nupcial',
      desc: 'El momento sagrado donde pronunciamos nuestros votos y sellamos nuestra unión.',
      icon: Church,
    },
    {
      time: '6:30 P.M.',
      title: 'Cóctel de Bienvenida & Fotos',
      desc: 'Brindemos juntos al atardecer y capturemos los primeros recuerdos del día.',
      icon: GlassWater,
    },
    {
      time: '7:30 P.M.',
      title: 'Cena & Brindis',
      desc: 'Un banquete especial preparado con amor para celebrar nuestra felicidad.',
      icon: Utensils,
    },
    {
      time: '9:00 P.M.',
      title: 'La Fiesta & Celebración',
      desc: '¡Música, baile y alegría para celebrar hasta que el cuerpo aguante!',
      icon: Music,
    },
  ];

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Boda de ${config.brideName} & ${config.groomName}`);
    const details = encodeURIComponent(`¡Acompáñanos a celebrar nuestra boda! Lugar: ${config.ceremonyVenue}, ${config.ceremonyAddress}`);
    const location = encodeURIComponent(`${config.ceremonyVenue}, ${config.ceremonyAddress}`);
    const dates = '20270131T220000Z/20270201T080000Z';
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;

    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <section id="evento" className="py-20 px-4 bg-[#F5F2EB]/60 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-cinzel uppercase tracking-widest mb-3">
            <Clock className="w-3.5 h-3.5" />
            <span>Itinerario & Ubicación</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-emerald-950">
            Los Momentos de Nuestro Día
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto mt-3 font-light">
            Queremos que disfrutes cada instante de este día tan soñado junto a nosotros.
          </p>
          <div className="mt-5">
            <button
              onClick={handleAddToCalendar}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full border border-amber-900/15 text-xs uppercase font-cinzel tracking-wider text-emerald-900 hover:bg-emerald-900 hover:text-white transition-all shadow-sm"
            >
              <CalendarPlus className="w-4 h-4 text-amber-700" />
              <span>Agendar en Google Calendar</span>
            </button>
          </div>
        </div>

        {/* Schedule Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {scheduleItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-amber-900/10 shadow-sm hover:border-amber-700/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-900 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-emerald-800" />
                  </div>
                  <span className="font-serif-title text-2xl font-semibold text-amber-800 block mb-1">
                    {item.time}
                  </span>
                  <h3 className="font-serif-title text-lg font-medium text-emerald-950 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-cinzel text-stone-400">
                  <span>Momento 0{index + 1}</span>
                  <span className="text-amber-600">✦</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Venue Showcase Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Venue Photo & Visual Identification */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-900/10 aspect-4/3">
                <img
                  src="/venue-entrance.jpg"
                  alt="Entrada Principal de la Sede Campestre"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-950/80 backdrop-blur-md text-amber-50 px-3 py-1 rounded-full text-[11px] font-cinzel uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Entrada Principal</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 text-center mt-2 italic font-light">
                Foto de referencia para identificar el portón de acceso
              </p>
            </div>

            {/* Venue Details & Navigation Buttons */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-cinzel uppercase tracking-widest text-amber-700 block mb-1">
                  Lugar del Evento · Ceremonia & Recepción
                </span>
                <h3 className="font-serif-title text-3xl sm:text-4xl font-normal text-emerald-950">
                  Sede Campestre (Copacabana)
                </h3>
                <p className="text-sm text-stone-600 mt-2 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                  <span>
                    <strong>Vereda El Noral</strong>, Copacabana, Antioquia (a 25 min de Medellín).
                  </span>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                Tanto la ceremonia como la fiesta se celebrarán en esta hermosa locación campestre rodeada de árboles y naturaleza. Dispondremos de parqueadero vigilado dentro de las instalaciones para tu total comodidad.
              </p>

              {/* Navigation Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={config.ceremonyMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-emerald-900 hover:bg-emerald-800 text-amber-50 text-xs font-cinzel uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Abrir en Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-sky-600 hover:bg-sky-500 text-white text-xs font-cinzel uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Navegar con Waze</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
