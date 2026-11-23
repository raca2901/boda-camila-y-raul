import React, { useState } from 'react';
import { Lock, Sparkles, Heart, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import type { Guest } from '../types/wedding';

interface PrivateGateProps {
  onUnlockWithCode: (inputCode: string) => boolean;
  sampleGuests: Guest[];
  onSelectSampleGuest: (guest: Guest) => void;
  onOpenAdmin: () => void;
  errorMessage?: string | null;
}

export const PrivateGate: React.FC<PrivateGateProps> = ({
  onUnlockWithCode,
  sampleGuests,
  onSelectSampleGuest,
  onOpenAdmin,
  errorMessage,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [localError, setLocalError] = useState<string | null>(errorMessage || null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Check if user pasted a full URL, extract id or invitado param if present
    let extracted = inputValue.trim();
    if (extracted.includes('?')) {
      try {
        const urlObj = new URL(extracted, window.location.origin);
        const idParam = urlObj.searchParams.get('id') || urlObj.searchParams.get('invitado') || urlObj.searchParams.get('token') || urlObj.searchParams.get('code');
        if (idParam) {
          extracted = idParam;
        }
      } catch {
        // Fallback to raw string
      }
    }

    const success = onUnlockWithCode(extracted);
    if (!success) {
      setLocalError('No encontramos una invitación con ese enlace o código. Por favor verifica el mensaje que te compartieron Camila y Raúl.');
    } else {
      setLocalError(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Decorative background glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f99aaa]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#84b6f4]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-50/60 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 w-full px-6 py-6 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-amber-800/20 bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-xs">
            <span className="font-serif-title font-semibold text-emerald-950 text-sm tracking-widest">
              R&C
            </span>
          </div>
          <div>
            <span className="font-cinzel text-xs uppercase tracking-widest text-emerald-950 block font-semibold">
              Raúl Ernesto & María Camila
            </span>
            <span className="text-[10px] text-stone-400 font-light block">
              31 de Enero de 2027
            </span>
          </div>
        </div>

        <button
          onClick={onOpenAdmin}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-emerald-950 hover:text-amber-50 text-emerald-950 border border-emerald-900/15 text-xs font-cinzel uppercase tracking-wider transition-all shadow-xs"
        >
          <KeyRound className="w-3.5 h-3.5 text-amber-600" />
          <span>Panel Novios</span>
        </button>
      </header>

      {/* Main Lock Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 border border-amber-900/10 shadow-2xl text-center space-y-6">
          
          {/* Animated Lock Icon & Monogram */}
          <div className="relative mx-auto w-20 h-20">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#e57d90]/30 to-[#84b6f4]/30 rounded-full blur-md animate-pulse" />
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-b from-amber-50 to-white border border-amber-200/80 flex items-center justify-center shadow-md">
              <Lock className="w-8 h-8 text-emerald-950 stroke-[1.5]" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-emerald-950 flex items-center justify-center shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-[11px] font-cinzel uppercase tracking-widest border border-amber-200/60">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Invitación Exclusiva & Privada</span>
            </div>
            <h1 className="font-serif-title text-3xl sm:text-4xl font-normal text-emerald-950 leading-tight">
              Boda de Raúl Ernesto & María Camila
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 font-light max-w-md mx-auto leading-relaxed pt-1">
              Esta celebración es íntima y privada. Para acceder a los detalles del evento y confirmar tu asistencia, ingresa con tu enlace personal con código UUID o introdúcelo a continuación.
            </p>
          </div>

          {/* Access Code / Link Input Form */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-2">
            <div className="relative text-left">
              <label className="block text-[11px] font-cinzel uppercase tracking-wider text-stone-600 mb-1.5">
                Código o Enlace de Invitación:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (localError) setLocalError(null);
                  }}
                  placeholder="Pega tu enlace o introduce tu código / UUID..."
                  className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-800 transition-all text-stone-800 font-mono"
                />
              </div>
            </div>

            {localError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs text-left leading-relaxed">
                {localError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-950 hover:bg-emerald-900 text-amber-50 font-cinzel text-xs uppercase tracking-widest rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <span>Abrir Mi Invitación</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Quick Demo Access Pills */}
          {sampleGuests.length > 0 && (
            <div className="pt-4 border-t border-stone-100 text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-cinzel uppercase tracking-wider text-stone-400 font-semibold">
                  Acceso rápido de demostración:
                </span>
                <span className="text-[10px] text-amber-700 font-light">
                  Haz clic para ver
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sampleGuests.slice(0, 4).map((guest) => (
                  <button
                    key={guest.id}
                    type="button"
                    onClick={() => onSelectSampleGuest(guest)}
                    className="text-[11px] px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-100 hover:border-amber-300 text-stone-700 border border-stone-200 transition-all font-sans"
                  >
                    ✨ {guest.name} ({guest.passes} pases)
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Couple Access Reminder */}
          <div className="pt-2">
            <button
              type="button"
              onClick={onOpenAdmin}
              className="text-xs text-stone-400 hover:text-emerald-950 transition-colors inline-flex items-center gap-1 font-light"
            >
              <Heart className="w-3 h-3 text-rose-400" />
              <span>¿Eres Camila o Raúl? Abre el panel de administración aquí</span>
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-stone-400 font-light">
        Raúl Ernesto & María Camila · 31 de Enero de 2027 · Copacabana, Antioquia
      </footer>

    </div>
  );
};
