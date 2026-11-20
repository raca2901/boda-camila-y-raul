import { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Search, Sparkles } from 'lucide-react';
import type { Guest, DietaryPreference, RsvpStatus } from '../types/wedding';

interface RsvpSectionProps {
  guests: Guest[];
  onUpdateGuest: (updatedGuest: Guest) => Promise<boolean>;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  guests,
  onUpdateGuest,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [status, setStatus] = useState<RsvpStatus>('confirmed');
  const [confirmedPasses, setConfirmedPasses] = useState<number>(1);
  const [dietaryPref, setDietaryPref] = useState<DietaryPreference>('standard');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Filter guests based on query (code or name)
  const filteredGuests = searchQuery.trim().length >= 2
    ? guests.filter(
        (g) =>
          g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSelectGuest = (guest: Guest) => {
    setSelectedGuest(guest);
    setStatus(guest.status === 'pending' ? 'confirmed' : guest.status);
    setConfirmedPasses(guest.confirmedPasses || guest.passes);
    setDietaryPref(guest.dietaryPreference || 'standard');
    setDietaryNotes(guest.dietaryNotes || '');
    setNotes(guest.notes || '');
    setHasSubmitted(guest.status !== 'pending');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuest) return;

    setIsSubmitting(true);
    const updated: Guest = {
      ...selectedGuest,
      status,
      confirmedPasses: status === 'confirmed' ? confirmedPasses : 0,
      dietaryPreference: dietaryPref,
      dietaryNotes,
      notes,
      updatedAt: new Date().toISOString(),
    };

    const success = await onUpdateGuest(updated);
    setIsSubmitting(false);

    if (success) {
      setHasSubmitted(true);
      if (status === 'confirmed') {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#059669', '#d97706', '#f59e0b', '#fde68a'],
        });
      }
    }
  };

  const handleReset = () => {
    setSelectedGuest(null);
    setSearchQuery('');
    setHasSubmitted(false);
  };

  return (
    <section id="rsvp" className="py-24 px-4 bg-[#FAF8F5] relative overflow-hidden">
      
      {/* Background glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-950 text-xs font-cinzel uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Confirmación de Asistencia</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-emerald-950">
            ¿Nos Acompañas?
          </h2>
          <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto mt-3 font-light leading-relaxed">
            Tu presencia hará inolvidable este momento. Por favor confirma tu asistencia antes del <strong>15 de Diciembre de 2026</strong>.
          </p>
        </div>

        {/* STEP 1: Search Guest */}
        {!selectedGuest && (
          <div className="bg-white/90 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-amber-900/10 shadow-lg">
            <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-900 mb-2">
              Busca tu nombre o código de invitación:
            </label>
            
            <div className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ej. Familia Pérez, Gómez o tu nombre..."
                className="w-full px-4 py-3.5 pl-11 bg-stone-50 border border-stone-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-800 text-sm"
              />
              <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            {/* Quick Demo Shortcuts */}
            <div className="mb-6">
              <span className="text-[11px] text-stone-400 block mb-2 font-cinzel uppercase">
                Invitados de muestra (clic para probar):
              </span>
              <div className="flex flex-wrap gap-2">
                {guests.slice(0, 4).map((g) => (
                  <button
                    key={g.id}
                    onClick={() => handleSelectGuest(g)}
                    className="text-xs px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60 transition-colors"
                  >
                    {g.name} ({g.passes} pases)
                  </button>
                ))}
              </div>
            </div>

            {/* Search results dropdown */}
            {searchQuery.trim().length >= 2 && (
              <div className="border-t border-stone-100 pt-4 space-y-2">
                {filteredGuests.length > 0 ? (
                  filteredGuests.map((guest) => (
                    <div
                      key={guest.id}
                      onClick={() => handleSelectGuest(guest)}
                      className="p-3.5 rounded-2xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 cursor-pointer flex items-center justify-between transition-all"
                    >
                      <div>
                        <span className="font-medium text-stone-800 text-sm block">
                          {guest.name}
                        </span>
                        <span className="text-xs text-stone-500 font-light">
                          {guest.passes} {guest.passes === 1 ? 'pase reservado' : 'pases reservados'}
                        </span>
                      </div>
                      <span className="text-xs font-cinzel text-emerald-900 uppercase tracking-wider font-semibold">
                        Seleccionar →
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-stone-500 text-sm">
                    No encontramos una invitación con ese nombre. <br />
                    <span className="text-xs text-stone-400">Verifica cómo está escrito o comunícate directamente con los novios.</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* STEP 2: Selected Guest Confirmation Form */}
        {selectedGuest && (
          <div className="bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-amber-900/10 shadow-xl">
            
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-100">
              <div>
                <span className="text-xs font-cinzel uppercase tracking-widest text-amber-700 block">
                  Invitación Especial
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-medium text-emerald-950">
                  {selectedGuest.name}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Pases reservados para ti: <strong>{selectedGuest.passes} persona(s)</strong>
                </p>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-stone-400 hover:text-stone-700 underline font-cinzel"
              >
                Cambiar de invitado
              </button>
            </div>

            {hasSubmitted ? (
              /* Already confirmed view */
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2">
                  {status === 'confirmed' ? (
                    <CheckCircle2 className="w-10 h-10 text-emerald-700" />
                  ) : (
                    <XCircle className="w-10 h-10 text-stone-500" />
                  )}
                </div>
                
                <h4 className="font-serif-title text-2xl sm:text-3xl font-normal text-emerald-950">
                  {status === 'confirmed' ? '¡Gracias por Confirmar!' : 'Sentimos que no puedas acompañarnos'}
                </h4>
                
                <p className="text-sm text-stone-600 max-w-md mx-auto font-light leading-relaxed">
                  {status === 'confirmed'
                    ? `Hemos registrado tu asistencia para ${confirmedPasses} persona(s). ¡Estamos ansiosos de celebrar este día inolvidable juntos!`
                    : 'Agradecemos de todo corazón que nos hayas avisado. Estarás con nosotros en pensamiento y corazón.'}
                </p>

                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => setHasSubmitted(false)}
                    className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-cinzel uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Modificar Respuesta
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 bg-emerald-900 hover:bg-emerald-800 text-amber-50 text-xs font-cinzel uppercase tracking-wider rounded-xl transition-colors"
                  >
                    Buscar Otro Invitado
                  </button>
                </div>
              </div>
            ) : (
              /* Confirmation Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Attendance choice */}
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-950 mb-3">
                    ¿Confirmas tu asistencia?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setStatus('confirmed')}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                        status === 'confirmed'
                          ? 'border-emerald-700 bg-emerald-50 text-emerald-900 ring-2 ring-emerald-700/20'
                          : 'border-stone-200 hover:border-stone-300 text-stone-600'
                      }`}
                    >
                      <CheckCircle2 className={`w-6 h-6 ${status === 'confirmed' ? 'text-emerald-700' : 'text-stone-400'}`} />
                      <span className="text-xs font-semibold uppercase font-cinzel tracking-wider">
                        Sí, asistiré con alegría
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStatus('declined')}
                      className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                        status === 'declined'
                          ? 'border-stone-700 bg-stone-100 text-stone-900 ring-2 ring-stone-700/20'
                          : 'border-stone-200 hover:border-stone-300 text-stone-600'
                      }`}
                    >
                      <XCircle className={`w-6 h-6 ${status === 'declined' ? 'text-stone-700' : 'text-stone-400'}`} />
                      <span className="text-xs font-semibold uppercase font-cinzel tracking-wider">
                        No podré asistir
                      </span>
                    </button>
                  </div>
                </div>

                {/* If Confirmed: Choose number of attendees */}
                {status === 'confirmed' && (
                  <>
                    <div>
                      <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-950 mb-2">
                        ¿Cuántas personas asistirán? (Máx. {selectedGuest.passes})
                      </label>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: selectedGuest.passes }, (_, i) => i + 1).map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setConfirmedPasses(num)}
                            className={`flex-1 py-3 rounded-xl border text-sm font-semibold transition-all ${
                              confirmedPasses === num
                                ? 'bg-emerald-900 text-white border-emerald-900 shadow-sm'
                                : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                            }`}
                          >
                            {num} {num === 1 ? 'persona' : 'personas'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dietary Preferences */}
                    <div>
                      <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-950 mb-2">
                        Preferencia de menú o alergias:
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2">
                        {[
                          { id: 'standard', label: 'Estándar' },
                          { id: 'vegetarian', label: 'Vegetariano' },
                          { id: 'vegan', label: 'Vegano' },
                          { id: 'gluten_free', label: 'Sin Gluten' },
                        ].map((pref) => (
                          <button
                            key={pref.id}
                            type="button"
                            onClick={() => setDietaryPref(pref.id as DietaryPreference)}
                            className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                              dietaryPref === pref.id
                                ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold'
                                : 'bg-stone-50 text-stone-600 border-stone-200'
                            }`}
                          >
                            {pref.label}
                          </button>
                        ))}
                      </div>
                      <input
                        type="text"
                        value={dietaryNotes}
                        onChange={(e) => setDietaryNotes(e.target.value)}
                        placeholder="¿Alguna alergia alimentaria específica? (opcional)"
                        className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {/* Message to the couple */}
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-950 mb-2">
                    Dedicatoria o mensaje para los novios (opcional):
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Escríbeles un mensaje de amor o bendiciones..."
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-emerald-900 hover:bg-emerald-800 text-amber-50 font-cinzel text-xs uppercase tracking-widest rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Guardando respuesta...' : 'Enviar Mi Confirmación'}
                </button>
              </form>
            )}

          </div>
        )}

      </div>
    </section>
  );
};
