import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, Heart, Users, Utensils } from 'lucide-react';
import type { Guest, DietaryPreference, RsvpStatus } from '../types/wedding';
import { ChapterDivider, OrnateCorners } from './NarniaOrnaments';

interface RsvpSectionProps {
  currentGuest: Guest;
  onUpdateGuest: (updatedGuest: Guest) => Promise<boolean>;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  currentGuest,
  onUpdateGuest,
}) => {
  const [status, setStatus] = useState<RsvpStatus>(
    currentGuest.status === 'pending' ? 'confirmed' : currentGuest.status
  );
  const [confirmedPasses, setConfirmedPasses] = useState<number>(
    currentGuest.confirmedPasses > 0 ? currentGuest.confirmedPasses : currentGuest.passes
  );
  const [dietaryPref, setDietaryPref] = useState<DietaryPreference>(
    currentGuest.dietaryPreference || 'standard'
  );
  const [dietaryNotes, setDietaryNotes] = useState(currentGuest.dietaryNotes || '');
  const [notes, setNotes] = useState(currentGuest.notes || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(currentGuest.status !== 'pending');
  const [isEditing, setIsEditing] = useState(false);

  // Sync state if currentGuest prop updates
  useEffect(() => {
    setStatus(currentGuest.status === 'pending' ? 'confirmed' : currentGuest.status);
    setConfirmedPasses(currentGuest.confirmedPasses > 0 ? currentGuest.confirmedPasses : currentGuest.passes);
    setDietaryPref(currentGuest.dietaryPreference || 'standard');
    setDietaryNotes(currentGuest.dietaryNotes || '');
    setNotes(currentGuest.notes || '');
    setHasSubmitted(currentGuest.status !== 'pending');
    setIsEditing(false);
  }, [currentGuest]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const updated: Guest = {
      ...currentGuest,
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
      setIsEditing(false);
      if (status === 'confirmed') {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f5dc8c', '#064e3b', '#881319', '#fef3c7'],
        });
      }
    }
  };

  return (
    <section id="rsvp" className="py-24 px-4 narnia-parchment relative overflow-hidden">
      {/* Subtle antique Narnia map background watermark */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.11] mix-blend-multiply pointer-events-none"
        style={{ backgroundImage: "url('/media/narnia-map.jpg')" }}
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <ChapterDivider label="Capítulo VI · Sello Real" theme="parchment" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-900/10 text-amber-950 text-xs font-cinzel uppercase tracking-widest mb-3 border border-amber-800/25">
            <Sparkles className="w-3.5 h-3.5 text-amber-800" />
            <span>Confirmación de Asistencia</span>
          </div>

          <h2 className="font-serif-title text-3xl sm:text-5xl font-medium text-emerald-950">
            ¿Nos Acompañas?
          </h2>

          <p className="text-stone-700 text-xs sm:text-sm max-w-lg mx-auto mt-2.5 font-light leading-relaxed">
            Tu presencia hará inolvidable este gran día. Por favor confirma tu asistencia antes del{' '}
            <strong className="font-semibold text-emerald-950">15 de Diciembre de 2026</strong>.
          </p>
        </div>

        {/* Royal Wax-Sealed Parchment Invitation Card */}
        <div className="relative bg-[#fbf6ea]/95 backdrop-blur-md p-6 sm:p-10 pt-12 sm:pt-14 rounded-2xl border-2 border-amber-800/30 shadow-[0_20px_55px_rgba(68,46,16,0.18)]">
          <OrnateCorners variant="dark-gold" />

          {/* Crimson Royal Wax Seal Medallion crowning the invitation */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full wax-seal border-2 border-amber-300/60 flex items-center justify-center z-20">
            <span className="font-cinzel-decorative text-xs text-amber-200 font-bold tracking-wider">
              R&C
            </span>
          </div>

          <div className="relative z-10">
            {/* Guest Personal Greeting Badge */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-amber-900/15 gap-3">
              <div>
                <span className="text-[11px] font-cinzel uppercase tracking-[0.22em] text-amber-800 block font-semibold">
                  Carta Real · Invitación Personalizada
                </span>
                <h3 className="font-serif-title text-2xl sm:text-3xl font-semibold text-emerald-950">
                  {currentGuest.name}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-stone-600">
                  <Users className="w-3.5 h-3.5 text-amber-800" />
                  <span>
                    Pases reservados:{' '}
                    <strong className="text-emerald-950">{currentGuest.passes} persona(s)</strong>
                  </span>
                </div>
              </div>

              {hasSubmitted && !isEditing && (
                <span
                  className={`px-3.5 py-1.5 rounded-full text-xs font-cinzel uppercase font-semibold ${
                    currentGuest.status === 'confirmed'
                      ? 'bg-emerald-950 text-amber-200 border border-amber-400/50'
                      : 'bg-[#7c1d24]/15 text-[#6e1218] border border-[#881319]/30'
                  }`}
                >
                  {currentGuest.status === 'confirmed' ? '✓ Asistencia Confirmada' : '✕ No Asistirá'}
                </span>
              )}
            </div>

            {hasSubmitted && !isEditing ? (
              /* Confirmation Summary View */
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950 text-amber-300 border-2 border-amber-400/50 flex items-center justify-center mx-auto mb-2 shadow-lg">
                  {currentGuest.status === 'confirmed' ? (
                    <CheckCircle2 className="w-9 h-9 text-amber-300" />
                  ) : (
                    <XCircle className="w-9 h-9 text-rose-300" />
                  )}
                </div>

                <h4 className="font-serif-title text-2xl sm:text-3xl font-medium text-emerald-950">
                  {currentGuest.status === 'confirmed'
                    ? '¡Gracias por Confirmar!'
                    : 'Sentimos que no puedas acompañarnos'}
                </h4>

                <p className="text-xs sm:text-sm text-stone-700 max-w-md mx-auto font-light leading-relaxed">
                  {currentGuest.status === 'confirmed'
                    ? `Hemos registrado tu asistencia para ${currentGuest.confirmedPasses || currentGuest.passes} persona(s). ¡Estamos contando los días para celebrar este momento inolvidable juntos!`
                    : 'Agradecemos con el corazón que nos hayas avisado. Aunque no puedas asistir físicamente, te tendremos presente en este día tan especial.'}
                </p>

                {currentGuest.dietaryPreference && currentGuest.dietaryPreference !== 'standard' && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#f3ebd8] rounded-xl text-xs text-amber-950 border border-amber-800/25">
                    <Utensils className="w-3.5 h-3.5 text-amber-800" />
                    <span>
                      Preferencia de Menú: <strong>{currentGuest.dietaryPreference}</strong>{' '}
                      {currentGuest.dietaryNotes && `(${currentGuest.dietaryNotes})`}
                    </span>
                  </div>
                )}

                {currentGuest.notes && (
                  <div className="bg-[#f3ebd8] p-4 rounded-xl border border-amber-900/20 max-w-md mx-auto text-left">
                    <span className="text-[10px] font-cinzel uppercase text-amber-900/70 block mb-1">
                      Tu dedicatoria a los novios:
                    </span>
                    <p className="italic text-sm text-stone-800 font-serif-title">
                      "{currentGuest.notes}"
                    </p>
                  </div>
                )}

                <div className="pt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2.5 bg-[#f3ebd8] hover:bg-amber-900/15 text-emerald-950 border border-amber-900/25 text-xs font-cinzel uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 text-[#881319]" />
                    <span>Modificar mi Respuesta</span>
                  </button>
                </div>
              </div>
            ) : (
              /* RSVP Response Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Attendance Choice */}
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-950 mb-3 font-semibold">
                    ¿Confirmas tu asistencia a nuestra boda?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setStatus('confirmed')}
                      className={`p-4 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                        status === 'confirmed'
                          ? 'border-emerald-900 bg-emerald-950 text-amber-100 shadow-md'
                          : 'border-amber-900/20 hover:border-amber-800/45 text-stone-700 bg-[#f3ebd8]/70'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-6 h-6 ${status === 'confirmed' ? 'text-amber-300' : 'text-stone-400'}`}
                      />
                      <span className="text-xs font-semibold uppercase font-cinzel tracking-wider">
                        Sí, asistiré con alegría
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStatus('declined')}
                      className={`p-4 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 cursor-pointer ${
                        status === 'declined'
                          ? 'border-[#881319] bg-[#881319] text-amber-50 shadow-md'
                          : 'border-amber-900/20 hover:border-amber-800/45 text-stone-700 bg-[#f3ebd8]/70'
                      }`}
                    >
                      <XCircle
                        className={`w-6 h-6 ${status === 'declined' ? 'text-amber-200' : 'text-stone-400'}`}
                      />
                      <span className="text-xs font-semibold uppercase font-cinzel tracking-wider">
                        No podré asistir
                      </span>
                    </button>
                  </div>
                </div>

                {/* If Confirmed: Choose Number of Attendees */}
                {status === 'confirmed' && (
                  <>
                    <div>
                      <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-950 mb-2 font-semibold">
                        ¿Cuántas personas asistirán? (Máximo reservado: {currentGuest.passes})
                      </label>
                      <div className="flex items-center gap-2">
                        {Array.from({ length: currentGuest.passes }, (_, i) => i + 1).map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setConfirmedPasses(num)}
                            className={`flex-1 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                              confirmedPasses === num
                                ? 'bg-emerald-950 text-amber-200 border-amber-500/60 shadow-md'
                                : 'bg-[#f3ebd8]/75 text-stone-700 border-amber-900/20 hover:bg-amber-900/10'
                            }`}
                          >
                            {num} {num === 1 ? 'persona' : 'personas'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Dietary Preferences */}
                    <div>
                      <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-950 mb-2 font-semibold">
                        Preferencia de Menú o Alergias:
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
                            className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                              dietaryPref === pref.id
                                ? 'bg-amber-800 text-amber-50 border-amber-900 font-semibold shadow-xs'
                                : 'bg-[#f3ebd8]/75 text-stone-700 border-amber-900/20 hover:bg-amber-900/10'
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
                        placeholder="¿Alguna alergia alimentaria específica? (ej. frutos secos, mariscos...)"
                        className="w-full px-4 py-2.5 bg-[#f3ebd8]/80 border border-amber-900/25 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-amber-700/50 focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {/* Heartfelt Note / Dedication */}
                <div>
                  <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-950 mb-2 font-semibold">
                    Dedicatoria o mensaje para los novios (opcional):
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Escríbeles unas palabras con tus mejores deseos para esta nueva etapa..."
                    className="w-full px-4 py-3 bg-[#f3ebd8]/80 border border-amber-900/25 rounded-xl text-xs text-stone-800 focus:ring-2 focus:ring-amber-700/50 focus:outline-none resize-none"
                  />
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center gap-3">
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="w-1/3 py-3.5 bg-[#f3ebd8] hover:bg-amber-900/15 text-stone-700 border border-amber-900/20 font-cinzel text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
                    >
                      Cancelar
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-emerald-950 hover:bg-emerald-900 text-amber-100 border border-amber-400/50 font-cinzel text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? 'Sellando confirmación...' : 'Confirmar Mi Asistencia'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
