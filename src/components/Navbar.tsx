import { useState } from 'react';
import { Lock, Music, VolumeX, Menu, X, LogOut } from 'lucide-react';
import type { Guest } from '../types/wedding';

interface NavbarProps {
  onOpenAdmin: () => void;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  currentGuest?: Guest | null;
  onExitGuest?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAdmin,
  isPlayingMusic,
  onToggleMusic,
  currentGuest,
  onExitGuest,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Nuestra Travesía', href: '#historia' },
    { label: 'Recuerdos', href: '#galeria' },
    { label: 'Cuándo & Dónde', href: '#evento' },
    { label: 'Vestimenta', href: '#vestimenta' },
    { label: 'Lluvia de Sobres', href: '#regalos' },
    { label: 'Confirmar Asistencia', href: '#rsvp', isCta: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-amber-900/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Monogram / Brand (Raúl Ernesto & María Camila) */}
        <a href="#inicio" className="flex items-center gap-2 group">
          <span className="font-serif-title text-2xl sm:text-3xl font-normal tracking-widest text-emerald-950 group-hover:text-amber-800 transition-colors">
            R <span className="font-script text-amber-700 text-3xl font-light">&</span> C
          </span>
          <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-emerald-900/60 pl-2 border-l border-emerald-900/20 font-cinzel">
            31 · 01 · 2027
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-5 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 ${
                link.isCta
                  ? 'bg-emerald-900 text-amber-50 px-4 py-2 rounded-full hover:bg-emerald-800 shadow-sm hover:shadow transition-all font-cinzel text-xs tracking-wider'
                  : 'text-stone-700 hover:text-amber-800'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Action buttons (Music Player, Guest Pill & Admin) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Music Control Pill - Narnia */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Pausar melodía de Narnia' : 'Reproducir melodía de Narnia'}
            className="flex items-center gap-1.5 bg-amber-50/90 border border-amber-200/90 rounded-full px-3 py-1 text-xs text-amber-900 hover:bg-amber-100 transition-all shadow-sm"
          >
            {isPlayingMusic ? (
              <span className="relative flex items-center justify-center">
                <Music className="w-4 h-4 text-amber-700 animate-pulse" />
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
              </span>
            ) : (
              <VolumeX className="w-4 h-4 text-stone-500" />
            )}
            <span className="text-[11px] font-cinzel uppercase font-semibold text-amber-800">
              {isPlayingMusic ? 'Narnia 🌲' : 'Música'}
            </span>
          </button>

          {/* Guest exit button (if viewing private invite) */}
          {currentGuest && onExitGuest && (
            <button
              onClick={onExitGuest}
              title="Cerrar sesión de esta invitación privada"
              className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] text-stone-500 hover:text-rose-700 hover:bg-rose-50 border border-stone-200 transition-all font-cinzel"
            >
              <LogOut className="w-3 h-3" />
              <span>Bloquear</span>
            </button>
          )}

          {/* Admin Access Button (Novios) */}
          <button
            onClick={onOpenAdmin}
            title="Panel de Administración (Novios)"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-stone-600 hover:text-emerald-900 bg-stone-100 hover:bg-amber-100/60 border border-stone-200 transition-all"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">Novios</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden text-stone-700 hover:text-emerald-950"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-amber-900/10 px-6 py-6 shadow-xl space-y-4 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base ${
                link.isCta
                  ? 'text-center bg-emerald-900 text-amber-50 py-3 rounded-xl font-cinzel text-sm mt-3'
                  : 'text-stone-700 hover:text-amber-800'
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
              className="w-full text-center text-xs py-2 text-stone-500 hover:text-rose-700 font-cinzel"
            >
              Cerrar Invitación Privada
            </button>
          )}
        </div>
      )}
    </nav>
  );
};
