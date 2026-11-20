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
import { INITIAL_GUESTS, INITIAL_WEDDING_CONFIG } from './data/initialGuests';
import type { Guest, WeddingConfig } from './types/wedding';
import {
  isConfigured,
  fetchGuestsFromDb,
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

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

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

  // Handle guest RSVP update
  const handleUpdateGuest = async (updated: Guest): Promise<boolean> => {
    if (isConfigured) {
      const ok = await updateGuestRsvpInDb(updated);
      if (ok) {
        setGuests((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
        return true;
      }
    }

    // Local state fallback
    setGuests((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
    return true;
  };

  // Handle adding new guest
  const handleAddGuest = async (newGuest: Omit<Guest, 'id'>): Promise<boolean> => {
    if (isConfigured) {
      const inserted = await insertGuestInDb(newGuest);
      if (inserted) {
        setGuests((prev) => [...prev, inserted]);
        return true;
      }
    }

    // Local fallback
    const localGuest: Guest = {
      ...newGuest,
      id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      updatedAt: new Date().toISOString(),
    };
    setGuests((prev) => [...prev, localGuest]);
    return true;
  };

  // Handle deleting guest
  const handleDeleteGuest = async (id: string): Promise<boolean> => {
    if (isConfigured) {
      await deleteGuestInDb(id);
    }
    setGuests((prev) => prev.filter((g) => g.id !== id));
    return true;
  };

  const handleNextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % 2);
    if (!isPlayingMusic) setIsPlayingMusic(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-800 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={() => setIsPlayingMusic(!isPlayingMusic)}
        currentSongIndex={currentSongIndex}
        onNextSong={handleNextSong}
      />

      {/* Hero with Countdown & Couple Portrait */}
      <Hero
        brideName={config.brideName}
        groomName={config.groomName}
        weddingDate={config.weddingDate}
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

      {/* RSVP Module */}
      <RsvpSection
        guests={guests}
        onUpdateGuest={handleUpdateGuest}
      />

      {/* Footer */}
      <Footer
        brideName={config.brideName}
        groomName={config.groomName}
      />

      {/* Admin Panel Modal (PIN: 2027) */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        guests={guests}
        onAddGuest={handleAddGuest}
        onDeleteGuest={handleDeleteGuest}
        onRefreshFromDb={refreshGuests}
      />

      {/* Real Audio Player with songs */}
      <MusicPlayer
        isPlaying={isPlayingMusic}
        currentSongIndex={currentSongIndex}
        onSongEnd={handleNextSong}
      />

    </div>
  );
}

export default App;
