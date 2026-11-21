import { useState, useEffect } from 'react';
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
import { INITIAL_GUESTS, INITIAL_WEDDING_CONFIG } from './data/initialGuests';
import type { Guest, WeddingConfig } from './types/wedding';
import {
  isConfigured,
  fetchGuestsFromDb,
  fetchGuestByUuidOrCode,
  updateGuestRsvpInDb,
  insertGuestInDb,
  deleteGuestInDb,
} from './lib/supabase';

export function App() {
  const [config] = useState<WeddingConfig>(INITIAL_WEDDING_CONFIG);
  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem('wedding_local_guests');
    return saved ? JSON.parse(saved) : INITIAL_GUESTS;
  });

  const [currentGuest, setCurrentGuest] = useState<Guest | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [gateError, setGateError] = useState<string | null>(null);

  // Load guests from Supabase if connected
  const refreshGuests = async () => {
    if (isConfigured) {
      const dbGuests = await fetchGuestsFromDb();
      if (dbGuests && dbGuests.length > 0) {
        setGuests(dbGuests);
        return;
      }
    }
  };

  useEffect(() => {
    refreshGuests();
  }, []);

  // Sync to local storage for offline / preview resilience
  useEffect(() => {
    localStorage.setItem('wedding_local_guests', JSON.stringify(guests));
  }, [guests]);

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

      // Look in local guests list first
      const foundLocal = guests.find(
        (g) =>
          g.id.toLowerCase() === cleanParam.toLowerCase() ||
          g.code.toLowerCase() === cleanParam.toLowerCase()
      );

      if (foundLocal) {
        setCurrentGuest(foundLocal);
        sessionStorage.setItem('wedding_current_guest_id', foundLocal.id);
        return;
      }

      // If not in local, check Supabase if connected
      if (isConfigured) {
        const foundDb = await fetchGuestByUuidOrCode(cleanParam);
        if (foundDb) {
          setCurrentGuest(foundDb);
          sessionStorage.setItem('wedding_current_guest_id', foundDb.id);
          setGuests((prev) => {
            if (prev.some((g) => g.id === foundDb.id)) return prev;
            return [...prev, foundDb];
          });
          return;
        }
      }

      setGateError('No encontramos una invitación con ese identificador. Por favor verifica tu enlace.');
    };

    checkUrlForGuest();
  }, [guests]);

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
        setGuests((prev) => [...prev, inserted]);
        return true;
      }
    }

    // Local fallback
    setGuests((prev) => [...prev, newGuest]);
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
    sessionStorage.setItem('wedding_current_guest_id', guest.id);
    window.history.replaceState({}, '', `?id=${encodeURIComponent(guest.id)}`);
    setGateError(null);
  };

  // Exit guest mode (lock screen)
  const handleExitGuest = () => {
    setCurrentGuest(null);
    sessionStorage.removeItem('wedding_current_guest_id');
    window.history.replaceState({}, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* If no valid guest UUID provided, show Private Gate Screen */}
      {!currentGuest ? (
        <PrivateGate
          onUnlockWithCode={handleUnlockWithCode}
          sampleGuests={guests}
          onSelectSampleGuest={handleSelectSampleGuest}
          onOpenAdmin={() => setIsAdminOpen(true)}
          errorMessage={gateError}
        />
      ) : (
        /* Full Private Wedding Invitation Unlocked for the Guest */
        <>
          {/* Navigation with personalized guest indicator */}
          <Navbar
            onOpenAdmin={() => setIsAdminOpen(true)}
            isPlayingMusic={isPlayingMusic}
            onToggleMusic={() => setIsPlayingMusic(!isPlayingMusic)}
            currentGuest={currentGuest}
            onExitGuest={handleExitGuest}
          />

          {/* Hero with VIP Guest Greeting, Countdown & Couple Portrait */}
          <Hero
            brideName={config.brideName}
            groomName={config.groomName}
            weddingDate={config.weddingDate}
            guest={currentGuest}
          />

          {/* Story (Los Palmitos, Cartagena, Medellín) */}
          <Story />

          {/* Gallery of Moments & Video */}
          <Gallery />

          {/* Event Details (Ceremony, Reception, Maps & Photo) */}
          <EventDetails config={config} />

          {/* Dress Code & Palette */}
          <DressCode
            title={config.dressCodeTitle}
            description={config.dressCodeDescription}
          />

          {/* Gifts & Bank details */}
          <Gifts bankInfo={config.bankAccountInfo} />

          {/* RSVP Module (Bound directly to current guest) */}
          <RsvpSection
            currentGuest={currentGuest}
            onUpdateGuest={handleUpdateGuest}
          />

          {/* Footer */}
          <Footer
            brideName={config.brideName}
            groomName={config.groomName}
          />
        </>
      )}

      {/* Admin Panel Modal for Camila & Raúl (PIN: 2027) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        guests={guests}
        onAddGuest={handleAddGuest}
        onDeleteGuest={handleDeleteGuest}
        onRefreshFromDb={refreshGuests}
      />

      {/* Narnia Song Audio Player */}
      <MusicPlayer isPlaying={isPlayingMusic} />

    </div>
  );
}

export default App;
