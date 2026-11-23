import { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Story } from './components/Story';
import { Gallery } from './components/Gallery';
import { EventDetails } from './components/EventDetails';
import { DressCode } from './components/DressCode';
import { Gifts } from './components/Gifts';
import { RsvpSection } from './components/RsvpSection';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { MusicPlayer } from './components/MusicPlayer';
import { PrivateGate } from './components/PrivateGate';
import { WardrobeDoor } from './components/WardrobeDoor';
import { SectionTransitionBand } from './components/NarniaOrnaments';
import { INITIAL_GUESTS, INITIAL_WEDDING_CONFIG } from './data/initialGuests';
import type { Guest, WeddingConfig } from './types/wedding';
import {
  isConfigured,
  supabase,
  fetchGuestsFromDb,
  fetchGuestByUuidOrCode,
  updateGuestRsvpInDb,
  insertGuestInDb,
  upsertGuestsInDb,
  deleteGuestInDb,
} from './lib/supabase';

const DEMO_GUEST_IDS = new Set(INITIAL_GUESTS.map((g) => g.id));
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function App() {
  const [config] = useState<WeddingConfig>(INITIAL_WEDDING_CONFIG);
  const [guests, setGuests] = useState<Guest[]>(() => {
    try {
      const saved = localStorage.getItem('wedding_local_guests');
      return saved ? JSON.parse(saved) : INITIAL_GUESTS;
    } catch {
      return INITIAL_GUESTS;
    }
  });
  const [hasLoadedCloud, setHasLoadedCloud] = useState(!isConfigured);

  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);
  const [isWardrobeOpen, setIsWardrobeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [gateError, setGateError] = useState<string | null>(null);

  // Load guests from Supabase (single source of truth across PC, mobile, and all guests)
  const refreshGuests = useCallback(async () => {
    if (!isConfigured) {
      setHasLoadedCloud(true);
      return;
    }

    const dbGuests = await fetchGuestsFromDb();
    if (dbGuests === null) {
      setHasLoadedCloud(true);
      return;
    }

    // One-time automatic migration: if this device had custom guests saved locally
    // before Supabase was connected, merge them safely into Supabase so nothing is lost.
    const alreadyMigrated = localStorage.getItem('wedding_supabase_migrated_v1') === 'true';
    if (!alreadyMigrated) {
      try {
        const rawLocal = localStorage.getItem('wedding_local_guests');
        if (rawLocal) {
          const parsedLocal: Guest[] = JSON.parse(rawLocal);
          const dbIds = new Set(dbGuests.map((g) => g.id));
          const customUnsynced = parsedLocal.filter(
            (g) => UUID_REGEX.test(g.id) && !DEMO_GUEST_IDS.has(g.id) && !dbIds.has(g.id)
          );

          if (customUnsynced.length > 0) {
            await upsertGuestsInDb(customUnsynced);
            const mergedGuests = await fetchGuestsFromDb();
            localStorage.setItem('wedding_supabase_migrated_v1', 'true');
            if (mergedGuests !== null) {
              setGuests(mergedGuests);
              setHasLoadedCloud(true);
              return;
            }
          }
        }
        localStorage.setItem('wedding_supabase_migrated_v1', 'true');
      } catch (err) {
        console.warn('Error migrating local guests:', err);
      }
    }

    setGuests(dbGuests);
    setHasLoadedCloud(true);
  }, []);

  useEffect(() => {
    refreshGuests();
  }, [refreshGuests]);

  // Also refresh when opening the Admin Panel so the count is always 100% up-to-date
  useEffect(() => {
    if (isAdminOpen && isConfigured) {
      refreshGuests();
    }
  }, [isAdminOpen, refreshGuests]);

  // Subscribe to Supabase Realtime so PC and mobile stay synchronized live
  useEffect(() => {
    if (!supabase) return;

    const channel = supabase
      .channel('guests-realtime-sync')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'guests' },
        () => {
          refreshGuests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refreshGuests]);

  // Keep local cache updated for fast reload resilience
  useEffect(() => {
    if (hasLoadedCloud) {
      localStorage.setItem('wedding_local_guests', JSON.stringify(guests));
    }
  }, [guests, hasLoadedCloud]);

  // Read URL query parameter for UUID (?id=... or ?invitado=... or ?token=...)
  useEffect(() => {
    const checkUrlForGuest = async () => {
      const params = new URLSearchParams(window.location.search);
      const guestParam =
        params.get('id') ||
        params.get('invitado') ||
        params.get('token') ||
        params.get('code') ||
        sessionStorage.getItem('wedding_current_guest_id');

      if (!guestParam) return;

      const cleanParam = guestParam.trim();

      // Check already-loaded guests list first
      const foundLocal = guests.find(
        (g) =>
          g.id.toLowerCase() === cleanParam.toLowerCase() ||
          g.code.toLowerCase() === cleanParam.toLowerCase()
      );

      if (foundLocal) {
        setCurrentGuest(foundLocal);
        setGateError(null);
        sessionStorage.setItem('wedding_current_guest_id', foundLocal.id);
        return;
      }

      // Query Supabase directly if not yet in state
      if (isConfigured) {
        const foundDb = await fetchGuestByUuidOrCode(cleanParam);
        if (foundDb) {
          setCurrentGuest(foundDb);
          setGateError(null);
          sessionStorage.setItem('wedding_current_guest_id', foundDb.id);
          setGuests((prev) => {
            if (prev.some((g) => g.id === foundDb.id)) return prev;
            return [...prev, foundDb];
          });
          return;
        }
      }

      if (hasLoadedCloud) {
        setGateError('No encontramos una invitación con ese identificador. Por favor verifica tu enlace.');
      }
    };

    checkUrlForGuest();
  }, [guests, hasLoadedCloud]);

  // Handle guest RSVP update
  const handleUpdateGuest = async (updated: Guest): Promise<boolean> => {
    if (isConfigured) {
      const ok = await updateGuestRsvpInDb(updated);
      if (ok) {
        setGuests((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
        setCurrentGuest(updated);
        return true;
      }
    }

    // Local state fallback
    setGuests((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    setCurrentGuest(updated);
    return true;
  };

  // Handle adding new guest
  const handleAddGuest = async (newGuest: Guest): Promise<boolean> => {
    if (isConfigured) {
      const inserted = await insertGuestInDb(newGuest);
      if (inserted) {
        setGuests((prev) =>
          prev.some((g) => g.id === inserted.id)
            ? prev.map((g) => (g.id === inserted.id ? inserted : g))
            : [...prev, inserted]
        );
        return true;
      }
    }

    // Local fallback
    setGuests((prev) =>
      prev.some((g) => g.id === newGuest.id) ? prev : [...prev, newGuest]
    );
    return true;
  };

  // Handle deleting guest
  const handleDeleteGuest = async (id: string): Promise<boolean> => {
    if (isConfigured) {
      await deleteGuestInDb(id);
    }
    setGuests((prev) => prev.filter((g) => g.id !== id));
    if (currentGuest?.id === id) {
      setCurrentGuest(null);
      sessionStorage.removeItem('wedding_current_guest_id');
    }
    return true;
  };

  // Unlock from Private Gate screen
  const handleUnlockWithCode = (inputVal: string): boolean => {
    const clean = inputVal.trim().toLowerCase();
    const found = guests.find(
      (g) => g.id.toLowerCase() === clean || g.code.toLowerCase() === clean
    );

    if (found) {
      setCurrentGuest(found);
      setIsPlayingMusic(true);
      sessionStorage.setItem('wedding_current_guest_id', found.id);
      window.history.replaceState({}, '', `?id=${encodeURIComponent(found.id)}`);
      setGateError(null);
      return true;
    }
    return false;
  };

  // Select demo sample guest
  const handleSelectSampleGuest = (guest: Guest) => {
    setCurrentGuest(guest);
    setIsPlayingMusic(true);
    sessionStorage.setItem('wedding_current_guest_id', guest.id);
    window.history.replaceState({}, '', `?id=${encodeURIComponent(guest.id)}`);
    setGateError(null);
  };

  // Exit guest mode (lock screen)
  const handleExitGuest = () => {
    setCurrentGuest(null);
    setIsWardrobeOpen(false);
    sessionStorage.removeItem('wedding_current_guest_id');
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-[#071411] text-stone-800 font-sans selection:bg-amber-200 selection:text-emerald-950">
      
      {/* 🌲 PORTAL DE NARNIA: Siempre inicia con el Ropero */}
      {!isWardrobeOpen && (
        <WardrobeDoor
          onOpenComplete={() => setIsWardrobeOpen(true)}
          onStartMusic={() => setIsPlayingMusic(true)}
          guest={currentGuest}
        />
      )}

      {/* Una vez abierto el ropero: Si no tiene enlace UUID válido, muestra la pantalla de acceso privado */}
      {isWardrobeOpen && !currentGuest && (
        <PrivateGate
          onUnlockWithCode={handleUnlockWithCode}
          sampleGuests={guests}
          onSelectSampleGuest={handleSelectSampleGuest}
          onOpenAdmin={() => setIsAdminOpen(true)}
          errorMessage={gateError}
        />
      )}

      {/* Una vez abierto el ropero: Si tiene enlace UUID válido, entra a la invitación completa */}
      {isWardrobeOpen && currentGuest && (
        <>
          {/* Navegación Real Oscura con Monograma Dorado */}
          <Navbar
            onOpenAdmin={() => setIsAdminOpen(true)}
            isPlayingMusic={isPlayingMusic}
            onToggleMusic={() => setIsPlayingMusic(!isPlayingMusic)}
            currentGuest={currentGuest}
            onExitGuest={handleExitGuest}
            onReopenWardrobe={() => setIsWardrobeOpen(false)}
          />

          {/* Hero Oscuro Cinematográfico: Bosque Nocturno, Escudo de Aslan y Cuenta Regresiva */}
          <Hero
            weddingDate={config.weddingDate}
            guest={currentGuest}
          />

          <SectionTransitionBand direction="dark-to-parchment" />

          {/* Historia en Pergamino Iluminado con Mapa Antiguo de Narnia */}
          <Story />

          <SectionTransitionBand direction="parchment-to-dark" />

          {/* Galería de Retratos Dorados de Cair Paravel & Nuevo Video de la Propuesta */}
          <Gallery />

          <SectionTransitionBand direction="dark-to-parchment" />

          {/* Edicto Real en Pergamino: Cuándo & Dónde */}
          <EventDetails config={config} />

          {/* Etiqueta Real en Pergamino: Vestimenta & Nueva Foto de Camila en Blanco */}
          <DressCode
            title={config.dressCodeTitle}
            description={config.dressCodeDescription}
          />

          <SectionTransitionBand direction="parchment-to-dark" />

          {/* Cofre Real de Cair Paravel: Lluvia de Sobres & Transferencia */}
          <Gifts bankInfo={config.bankAccountInfo} />

          <SectionTransitionBand direction="dark-to-parchment" />

          {/* Carta Real con Sello de Lacre: Confirmación de Asistencia (RSVP) */}
          <RsvpSection
            currentGuest={currentGuest}
            onUpdateGuest={handleUpdateGuest}
          />

          <SectionTransitionBand direction="parchment-to-dark" />

          {/* Pie de Página: Bosque Estrellado de Narnia */}
          <Footer
            brideName={config.brideName}
            groomName={config.groomName}
          />
        </>
      )}

      {/* Panel de Administración de los Novios (PIN: 2027) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        guests={guests}
        onAddGuest={handleAddGuest}
        onDeleteGuest={handleDeleteGuest}
        onRefreshFromDb={refreshGuests}
      />

      {/* Reproductor de la Melodía de Narnia (The Wardrobe) */}
      <MusicPlayer
        isPlaying={isPlayingMusic}
        onAutoPlayStarted={() => setIsPlayingMusic(true)}
      />

    </div>
  );
}

export default App;
