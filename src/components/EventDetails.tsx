import { MapPin, ExternalLink, CalendarPlus, Clock, Navigation } from 'lucide-react';
import type { WeddingConfig } from '../types/wedding';
import { ChapterDivider, OrnateCorners } from './NarniaOrnaments';

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
    <section id="evento" className="py-20 sm:py-24 px-4 narnia-parchment relative overflow-hidden">
      {/* Subtle Narnia Map background watermark */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.10] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url('/media/narnia-map.jpg')" }}
        aria-hidden="true"
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header — Edicto Real */}
        <div className="text-center mb-12">
          <ChapterDivider label="Capítulo III · Edicto Real" theme="parchment" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/10 border border-amber-800/25 text-amber-950 text-xs font-cinzel uppercase tracking-widest mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-800" />
            <span>Cuándo & Dónde</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-medium text-emerald-950">
            Nuestra Celebración
          </h2>

          <p className="text-stone-700 text-sm sm:text-base max-w-lg mx-auto mt-3 font-serif-title italic">
            Queremos compartir este día tan soñado junto a ti en un entorno campestre rodeado de naturaleza.
          </p>
        </div>

        {/* Tablillas Reales de Horario (Solo hora de llegada y cierre) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto mb-10">
          <div className="relative bg-[#fbf6ea]/95 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border-2 border-amber-800/25 shadow-[0_10px_28px_rgba(74,50,18,0.1)] text-center">
            <OrnateCorners variant="dark-gold" />
            <span className="text-[11px] font-cinzel uppercase tracking-[0.22em] text-amber-800 font-semibold block mb-1.5 relative z-10">
              Hora de Llegada
            </span>
            <div className="font-serif-title text-3xl sm:text-4xl font-semibold text-emerald-950 mb-1.5 relative z-10">
              5:00 P.M.
            </div>
            <p className="text-xs text-stone-600 font-light relative z-10">
              Recomendamos llegar puntual para iniciar juntos la ceremonia.
            </p>
          </div>

          <div className="relative bg-[#fbf6ea]/95 backdrop-blur-xs p-6 sm:p-7 rounded-2xl border-2 border-amber-800/25 shadow-[0_10px_28px_rgba(74,50,18,0.1)] text-center">
            <OrnateCorners variant="dark-gold" />
            <span className="text-[11px] font-cinzel uppercase tracking-[0.22em] text-emerald-900 font-semibold block mb-1.5 relative z-10">
              Celebración & Cierre
            </span>
            <div className="font-serif-title text-3xl sm:text-4xl font-semibold text-emerald-950 mb-1.5 relative z-10">
              Hasta la Madrugada
            </div>
            <p className="text-xs text-stone-600 font-light relative z-10">
              Festejaremos en la misma locación con banquete, música y alegría.
            </p>
          </div>
        </div>

        {/* Botón de Google Calendar */}
        <div className="text-center mb-12">
          <button
            onClick={handleAddToCalendar}
            className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-950 hover:bg-emerald-900 rounded-full border border-amber-400/50 text-xs uppercase font-cinzel tracking-[0.18em] text-amber-100 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4 text-amber-400" />
            <span>Agendar en Google Calendar</span>
          </button>
        </div>

        {/* Pergamino Principal de Ubicación con Foto de la Entrada */}
        <div className="relative bg-[#fbf6ea]/95 rounded-2xl p-6 sm:p-10 border-2 border-amber-800/25 shadow-[0_16px_45px_rgba(74,50,18,0.14)]">
          <OrnateCorners variant="dark-gold" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Foto de la Entrada Principal en marco dorado */}
            <div className="lg:col-span-5 relative group">
              <div className="p-1.5 rounded-2xl narnia-gilded-frame">
                <div className="relative rounded-xl overflow-hidden aspect-4/3 bg-stone-900">
                  <img
                    src="/venue-entrance.jpg"
                    alt="Entrada Principal de la Sede Campestre"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#071411]/90 backdrop-blur-md text-amber-100 border border-amber-400/40 px-3.5 py-1.5 rounded-full text-[11px] font-cinzel uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>Entrada Principal</span>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 text-center mt-2.5 italic font-serif-title">
                Foto de referencia para identificar el portón de acceso
              </p>
            </div>

            {/* Detalles de la Ubicación & Botones de Navegación */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <span className="text-xs font-cinzel uppercase tracking-[0.22em] text-amber-800 font-semibold block mb-1">
                  Lugar del Evento · Ceremonia & Recepción
                </span>
                <h3 className="font-serif-title text-3xl sm:text-4xl font-medium text-emerald-950">
                  Sede Campestre (Copacabana)
                </h3>
                <p className="text-sm text-stone-700 mt-2 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                  <span>
                    <strong>Vereda El Noral</strong>, Copacabana, Antioquia (a solo 25 minutos de Medellín).
                  </span>
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-light leading-relaxed">
                Tanto la ceremonia como la fiesta se celebrarán en esta hermosa locación campestre rodeada de árboles y aire puro. Dispondremos de parqueadero vigilado dentro de las instalaciones para tu total comodidad y tranquilidad.
              </p>

              {/* Botones de Navegación (Google Maps & Waze) */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={config.ceremonyMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-emerald-950 hover:bg-emerald-900 text-amber-100 border border-amber-400/40 text-xs font-cinzel uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Abrir en Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <a
                  href={wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-[#113a5c] hover:bg-[#174b75] text-amber-50 border border-sky-300/35 text-xs font-cinzel uppercase tracking-wider rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  <Navigation className="w-4 h-4 text-sky-300" />
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
