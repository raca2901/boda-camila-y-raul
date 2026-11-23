import { useState } from 'react';
import { Lock, Music, VolumeX, Menu, X, LogOut } from 'lucide-react';
import type { Guest } from '../types/wedding';

interface NavbarProps {
  onOpenAdmin: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  currentGuest?: Guest | null;
  onExitGuest?: () => void;
  onReopenWardrobe?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  isPlayingMusic,
  onToggleMusic,
  currentGuest,
  onExitGuest,
  onReopenWardrobe,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Travesía', href: '#historia' },
    { label: 'Recuerdos', href: '#galeria' },
    { label: 'Celebración', href: '#evento' },
    { label: 'Vestimenta', href: '#vestimenta' },
    { label: 'Sobres', href: '#regalos' },
    { label: 'Confirmar', href: '#rsvp', isCta: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#071411]/92 backdrop-blur-md border-b border-amber-400/25 shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        {/* Monogram / Brand */}
        <a href="#inicio" className="flex items-center gap-2.5 group shrink-0 whitespace-nowrap">
          <span className="font-cinzel-decorative text-lg sm:text-2xl font-normal tracking-widest text-amber-100 group-hover:text-amber-300 transition-colors whitespace-nowrap">
            R <span className="font-script text-gold-foil text-2xl sm:text-3xl font-light">&</span> C
          </span>
          <span className="hidden xl:inline-block text-[11px] uppercase tracking-[0.2em] text-amber-300/75 pl-2.5 border-l border-amber-400/30 font-cinzel whitespace-nowrap">
            31 · 01 · 2027
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-[11px] xl:text-xs font-cinzel tracking-wider uppercase shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-all duration-200 whitespace-nowrap ${
                link.isCta
                  ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-emerald-950 font-semibold px-3.5 py-2 rounded-full hover:brightness-110 shadow-[0_0_16px_rgba(212,175,55,0.35)]'
                  : 'text-amber-100/80 hover:text-amber-300'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action buttons (Wardrobe, Music Player, Lock & Admin) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Reopen Wardrobe Button */}
          {onReopenWardrobe && (
            <button
              onClick={onReopenWardrobe}
              title="Volver a abrir el ropero de Narnia"
              className="flex items-center gap-1 bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 rounded-full px-2.5 py-1.5 text-amber-200 transition-all font-cinzel text-[11px] whitespace-nowrap cursor-pointer"
            >
              <span>🚪</span>
              <span className="hidden sm:inline">Ropero</span>
            </button>
          )}

          {/* Music Control Pill */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Pausar melodía de Narnia' : 'Reproducir melodía de Narnia'}
            className="flex items-center gap-1.5 bg-amber-400/15 border border-amber-300/40 rounded-full px-2.5 sm:px-3 py-1.5 text-xs text-amber-200 hover:bg-amber-400/25 transition-all shadow-sm whitespace-nowrap cursor-pointer"
          >
            {isPlayingMusic ? (
              <span className="relative flex items-center justify-center">
                <Music className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
              </span>
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-amber-200/60" />
            )}
            <span className="text-[11px] font-cinzel uppercase font-semibold text-amber-200">
              {isPlayingMusic ? 'Narnia' : 'Música'}
            </span>
          </button>

          {/* Guest exit button */}
          {currentGuest && onExitGuest && (
            <button
              onClick={onExitGuest}
              title="Cerrar sesión de esta invitación privada"
              className="hidden xl:flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[11px] text-amber-200/70 hover:text-rose-300 hover:bg-rose-950/50 border border-amber-400/25 transition-all font-cinzel whitespace-nowrap cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span>Salir</span>
            </button>
          )}

          {/* Admin Access Button (Novios) */}
          <button
            onClick={onOpenAdmin}
            title="Panel de Administración (Novios)"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs text-amber-100 hover:text-emerald-950 bg-emerald-900/70 hover:bg-amber-400 border border-amber-400/35 transition-all whitespace-nowrap cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-cinzel text-[11px] uppercase">Novios</span>
          </button>

          {/* Mobile/Tablet hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 lg:hidden text-amber-200 hover:text-amber-300 cursor-pointer"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071411]/98 border-b border-amber-400/30 px-6 py-6 shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 font-cinzel text-sm uppercase tracking-wider ${
                link.isCta
                  ? 'text-center bg-gradient-to-r from-amber-500 to-amber-400 text-emerald-950 font-semibold py-3 rounded-xl mt-3'
                  : 'text-amber-100/90 hover:text-amber-300'
              }`}
            >
              {link.label}
            </a>
          ))}
          {currentGuest && onExitGuest && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onExitGuest();
              }}
              className="w-full text-center text-xs py-2 text-amber-200/60 hover:text-rose-300 font-cinzel uppercase"
            >
              Cerrar Invitación Privada
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
