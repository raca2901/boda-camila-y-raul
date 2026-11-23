import React, { useState } from 'react';
import { Lock, Sparkles, Heart, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import type { Guest } from '../types/wedding';
import { OrnateCorners } from './NarniaOrnaments';

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

    let extracted = inputValue.trim();
    if (extracted.includes('?')) {
      try {
        const urlObj = new URL(extracted, window.location.origin);
        const idParam =
          urlObj.searchParams.get('id') ||
          urlObj.searchParams.get('invitado') ||
          urlObj.searchParams.get('token') ||
          urlObj.searchParams.get('code');
        if (idParam) {
          extracted = idParam;
        }
      } catch {
        // Fallback to raw string
      }
    }

    const success = onUnlockWithCode(extracted);
    if (!success) {
      setLocalError(
        'No encontramos una invitación con ese enlace o código. Por favor verifica el mensaje que te compartieron Camila y Raúl.'
      );
    } else {
      setLocalError(null);
    }
  };

  return (
    <div className="min-h-screen narnia-night text-amber-50 flex flex-col justify-between relative overflow-hidden font-sans selection:bg-amber-200 selection:text-emerald-950">
      {/* Subtle snowy forest backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
        style={{ backgroundImage: "url('/media/narnia-forest-lantern.jpg')" }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#071411]/85 via-[#071411]/70 to-[#040b09]/95 pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Header */}
      <header className="relative z-10 w-full px-6 py-6 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border border-amber-400/50 bg-[#091c18]/90 backdrop-blur-sm flex items-center justify-center shadow-md">
            <span className="font-cinzel-decorative font-semibold text-amber-300 text-xs tracking-widest">
              R&C
            </span>
          </div>
          <div>
            <span className="font-cinzel text-xs uppercase tracking-widest text-amber-100 block font-semibold">
              Raúl Ernesto & María Camila
            </span>
            <span className="text-[10px] text-amber-300/70 font-light block">
              31 de Enero de 2027
            </span>
          </div>
        </div>

        <button
          onClick={onOpenAdmin}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/15 hover:bg-amber-400 hover:text-emerald-950 text-amber-100 border border-amber-400/40 text-xs font-cinzel uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <KeyRound className="w-3.5 h-3.5" />
          <span>Panel Novios</span>
        </button>
      </header>

      {/* Main Illuminated Lock Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="relative w-full max-w-lg bg-[#fbf6ea]/95 text-stone-800 backdrop-blur-md rounded-2xl p-6 sm:p-10 border-2 border-amber-500/45 shadow-[0_24px_70px_rgba(0,0,0,0.75)] text-center space-y-6">
          <OrnateCorners variant="dark-gold" />

          <div className="relative z-10 space-y-6">
            {/* Aslan Seal & Lock Emblem */}
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute -inset-2 bg-amber-400/30 rounded-full blur-lg animate-pulse" />
              <div className="relative w-20 h-20 rounded-full p-1 narnia-gilded-frame overflow-hidden">
                <img
                  src="/media/narnia-aslan-crest.jpg"
                  alt="Escudo Real"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full wax-seal border border-amber-300/60 text-amber-200 flex items-center justify-center shadow-md">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-900/10 text-amber-950 text-[11px] font-cinzel uppercase tracking-widest border border-amber-800/25">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                <span>Invitación Exclusiva & Privada</span>
              </div>
              <h1 className="font-serif-title text-3xl sm:text-4xl font-medium text-emerald-950 leading-tight">
                Boda de Raúl Ernesto & María Camila
              </h1>
              <p className="text-xs sm:text-sm text-stone-600 font-light max-w-md mx-auto leading-relaxed pt-1">
                Esta celebración es íntima y privada. Para acceder a los detalles del evento y confirmar tu asistencia, ingresa con tu enlace personal con código UUID o introdúcelo a continuación.
              </p>
            </div>

            {/* Access Code / Link Input Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div className="relative text-left">
                <label className="block text-[11px] font-cinzel uppercase tracking-wider text-emerald-950 font-semibold mb-1.5">
                  Código o Enlace de Invitación:
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    if (localError) setLocalError(null);
                  }}
                  placeholder="Pega tu enlace o introduce tu código / UUID..."
                  className="w-full px-4 py-3.5 bg-[#f3ebd8] border border-amber-900/25 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-900 transition-all text-stone-800 font-mono"
                />
              </div>

              {localError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 text-xs text-left leading-relaxed">
                  {localError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-950 hover:bg-emerald-900 text-amber-100 border border-amber-400/50 font-cinzel text-xs uppercase tracking-[0.2em] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Abrir Mi Invitación</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-amber-300" />
              </button>
            </form>

            {/* Quick Demo Access Pills */}
            {sampleGuests.length > 0 && (
              <div className="pt-4 border-t border-amber-900/15 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-cinzel uppercase tracking-wider text-stone-500 font-semibold">
                    Acceso rápido de demostración:
                  </span>
                  <span className="text-[10px] text-amber-800 font-light">Haz clic para ver</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sampleGuests.slice(0, 4).map((guest) => (
                    <button
                      key={guest.id}
                      type="button"
                      onClick={() => onSelectSampleGuest(guest)}
                      className="text-[11px] px-3 py-1.5 rounded-xl bg-[#f3ebd8] hover:bg-emerald-950 hover:text-amber-100 text-stone-700 border border-amber-900/20 transition-all font-sans cursor-pointer"
                    >
                      ✨ {guest.name} ({guest.passes} pases)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Couple Access Reminder */}
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="text-xs text-stone-500 hover:text-emerald-950 transition-colors inline-flex items-center gap-1 font-light cursor-pointer"
              >
                <Heart className="w-3 h-3 text-[#881319]" />
                <span>¿Eres Camila o Raúl? Abre el panel de administración aquí</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs text-amber-200/55 font-cinzel tracking-wider">
        Raúl Ernesto & María Camila · 31 de Enero de 2027 · Copacabana, Antioquia
      </footer>
    </div>
  );
};
