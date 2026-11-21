import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, Sparkles, Heart, Users, Utensils } from 'lucide-react';
import type { Guest, DietaryPreference, RsvpStatus } from '../types/wedding';

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
          colors: ['#005187', '#4d82bc', '#e57d90', '#f1889b', '#f59e0b'],
        });
      }
    }
  };

  return (
    <section id="rsvp" className="py-24 px-4 bg-[#FAF8F5] relative overflow-hidden">
      
      {/* Background glow decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-[#f99aaa]/20 to-[#84b6f4]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-950 text-xs font-cinzel uppercase tracking-widest mb-3 border border-emerald-200/50">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Confirmación de Asistencia</span>
          </div>
          <h2 className="font-serif-title text-3xl sm:text-5xl font-normal text-emerald-950">
            ¿Nos Acompañas?
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-lg mx-auto mt-2 font-light leading-relaxed">
            Tu presencia hará inolvidable este gran día. Por favor confirma tu asistencia antes del <strong>15 de Diciembre de 2026</strong>.
          </p>
        </div>

        {/* Private Guest Card */}
        <div className="bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-amber-900/10 shadow-xl">
          
          {/* Guest Personal Greeting Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-stone-100 gap-3">
            <div>
              <span className="text-[11px] font-cinzel uppercase tracking-widest text-amber-700 block font-semibold">
                Invitación Personalizada
              </span>
              <h3 className="font-serif-title text-2xl sm:text-3xl font-medium text-emerald-950">
                {currentGuest.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
                <Users className="w-3.5 h-3.5 text-emerald-800" />
                <span>
                  Pases reservados: <strong className="text-stone-800">{currentGuest.passes} persona(s)</strong>
                </span>
              </div>
            </div>

            {hasSubmitted && !isEditing && (
              <span className={`px-3 py-1 rounded-full text-xs font-cinzel uppercase font-semibold ${
                currentGuest.status === 'confirmed'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-rose-100 text-rose-900 border border-rose-300'
              }`}>
                {currentGuest.status === 'confirmed' ? '✓ Asistencia Confirmada' : '✕ No Asistirá'}
              </span>
            )}
          </div>

          {hasSubmitted && !isEditing ? (
            /* Confirmation Summary View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-2 shadow-inner">
                {currentGuest.status === 'confirmed' ? (
                  <CheckCircle2 className="w-10 h-10 text-emerald-700" />
                ) : (
                  <XCircle className="w-10 h-10 text-rose-600" />
                )}
              </div>
              
              <h4 className="font-serif-title text-2xl sm:text-3xl font-normal text-emerald-950">
                {currentGuest.status === 'confirmed' ? '¡Gracias por Confirmar!' : 'Sentimos que no puedas acompañarnos'}
              </h4>
              
              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto font-light leading-relaxed">
                {currentGuest.status === 'confirmed'
                  ? `Hemos registrado tu asistencia para ${currentGuest.confirmedPasses || currentGuest.passes} persona(s). ¡Estamos contando los días para celebrar este momento inolvidable juntos!`
                  : 'Agradecemos con el corazón que nos hayas avisado. Aunque no puedas asistir físicamente, te tendremos presente en este día tan especial.'}
              </p>

              {currentGuest.dietaryPreference && currentGuest.dietaryPreference !== 'standard' && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-xl text-xs text-amber-900 border border-amber-200">
                  <Utensils className="w-3.5 h-3.5 text-amber-700" />
                  <span>Preferencia de Menú: <strong>{currentGuest.dietaryPreference}</strong> {currentGuest.dietaryNotes && `(${currentGuest.dietaryNotes})`}</span>
                </div>
              )}

              {currentGuest.notes && (
                <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 max-w-md mx-auto text-left">
                  <span className="text-[10px] font-cinzel uppercase text-stone-400 block mb-1">
                    Tu dedicatoria a los novios:
                  </span>
                  <p className="italic text-xs text-stone-700 font-serif">
                    "{currentGuest.notes}"
                  </p>
                </div>
              )}

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-cinzel uppercase tracking-wider rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-500" />
                  <span>Modificar mi Respuesta</span>
                </button>
              </div>
            </div>
          ) : (
            /* RSVP Response Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Attendance Choice */}
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-950 mb-3">
                  ¿Confirmas tu asistencia a nuestra boda?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setStatus('confirmed')}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      status === 'confirmed'
                        ? 'border-emerald-700 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-700/20 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600 bg-stone-50/40'
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
                        ? 'border-rose-400 bg-rose-50/80 text-rose-950 ring-2 ring-rose-400/20 shadow-xs'
                        : 'border-stone-200 hover:border-stone-300 text-stone-600 bg-stone-50/40'
                    }`}
                  >
                    <XCircle className={`w-6 h-6 ${status === 'declined' ? 'text-rose-600' : 'text-stone-400'}`} />
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
                    <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-950 mb-2">
                      ¿Cuántas personas asistirán? (Máximo reservado: {currentGuest.passes})
                    </label>
                    <div className="flex items-center gap-2">
                      {Array.from({ length: currentGuest.passes }, (_, i) => i + 1).map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setConfirmedPasses(num)}
                          className={`flex-1 py-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all ${
                            confirmedPasses === num
                              ? 'bg-emerald-950 text-amber-50 border-emerald-950 shadow-md ring-2 ring-emerald-950/20'
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
                          className={`py-2 px-3 rounded-xl text-xs font-medium border transition-all ${
                            dietaryPref === pref.id
                              ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold shadow-xs'
                              : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
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
                      className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none"
                    />
                  </div>
                </>
              )}

              {/* Heartfelt Note / Dedication to Camila & Raúl */}
              <div>
                <label className="block text-xs font-cinzel uppercase tracking-widest text-emerald-950 mb-2">
                  Dedicatoria o mensaje para los novios (opcional):
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Escríbeles unas palabras con tus mejores deseos para esta nueva etapa..."
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-xs focus:ring-1 focus:ring-emerald-800 focus:outline-none resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center gap-3">
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="w-1/3 py-3.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-cinzel text-xs uppercase tracking-wider rounded-2xl transition-colors"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-4 bg-emerald-950 hover:bg-emerald-900 text-amber-50 font-cinzel text-xs uppercase tracking-widest rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Guardando confirmación...' : 'Confirmar Mi Asistencia'}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
