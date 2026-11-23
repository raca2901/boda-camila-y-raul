import { MapPin, ExternalLink, CalendarPlus, Clock, Navigation } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';

interface EventDetailsProps {
  config: WeddingConfig;
}

export const EventDetails: React.FC<EventDetailsProps> = ({ config }) => {
  const wazeUrl = 'https://waze.com/ul?ll=6.3665924,-75.5034103&navigate=yes';

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Boda de ${config.groomName} & ${config.brideName}`);
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
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 text-amber-900 text-xs font-cinzel uppercase tracking-widest mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>Cuándo & Dónde</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-emerald-950">
            Nuestra Celebración
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto mt-3 font-light">
            Queremos compartir este día tan soñado junto a ti en un entorno campestre rodeado de naturaleza.
          </p>
        </div>

        {/* Card Resumen de Horarios (Solo hora de llegada/inicio y finalización) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
          
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-amber-900/10 shadow-sm text-center">
            <span className="text-[11px] font-cinzel uppercase tracking-widest text-amber-700 font-semibold block mb-1">
              Hora de Llegada
            </span>
            <div className="font-serif-title text-3xl sm:text-4xl font-medium text-emerald-950 mb-1">
              5:00 P.M.
            </div>
            <p className="text-xs text-stone-500 font-light">
              Recomendamos llegar puntual para iniciar juntos la ceremonia.
            </p>
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-amber-900/10 shadow-sm text-center">
            <span className="text-[11px] font-cinzel uppercase tracking-widest text-emerald-800 font-semibold block mb-1">
              Celebración & Cierre
            </span>
            <div className="font-serif-title text-3xl sm:text-4xl font-medium text-emerald-950 mb-1">
              Hasta la Madrugada
            </div>
            <p className="text-xs text-stone-500 font-light">
              Festejaremos en la misma locación con banquete, música y alegría.
            </p>
          </div>

        </div>

        {/* Botón de Google Calendar */}
        <div className="text-center mb-12">
          <button
            onClick={handleAddToCalendar}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-amber-900/15 text-xs uppercase font-cinzel tracking-wider text-emerald-900 hover:bg-emerald-900 hover:text-white transition-all shadow-sm"
          >
            <CalendarPlus className="w-4 h-4 text-amber-700" />
            <span>Agendar en Google Calendar</span>
          </button>
        </div>

        {/* Main Venue Showcase Card con Foto de la Entrada Principal y Mapas */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-900/10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Foto de la Entrada Principal */}
            <div className="lg:col-span-5 relative group">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-amber-900/10 aspect-4/3">
                <img
                  src="/venue-entrance.jpg"
                  alt="Entrada Principal de la Sede Campestre"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-950/85 backdrop-blur-md text-amber-50 px-3.5 py-1.5 rounded-full text-[11px] font-cinzel uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Entrada Principal</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-400 text-center mt-2 italic font-light">
                Foto de referencia para identificar el portón de acceso
              </p>
            </div>

            {/* Detalles de la Ubicación & Botones de Navegación */}
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
                    <strong>Vereda El Noral</strong>, Copacabana, Antioquia (a solo 25 minutos de Medellín).
                  </span>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                Tanto la ceremonia como la fiesta se celebrarán en esta hermosa locación campestre rodeada de árboles y aire puro. Dispondremos de parqueadero vigilado dentro de las instalaciones para tu total comodidad y tranquilidad.
              </p>

              {/* Botones de Navegación (Google Maps & Waze) */}
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
