import { useEffect, useRef } from 'react';

interface MusicPlayerProps {
  isPlaying: boolean;
  onAutoPlayStarted?: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying, onAutoPlayStarted }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Canción de Narnia ("The Wardrobe" - Harry Gregson-Williams)
  const narniaSongSrc = '/media/narnia-wardrobe.mp3';

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(narniaSongSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.65;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn('Autoplay prevented by browser, waiting for first interaction:', err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Listener para reproducir automáticamente al primer toque/clic/scroll del usuario
  useEffect(() => {
    if (isPlaying) return;

    const startAudioOnInteraction = () => {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            if (onAutoPlayStarted) onAutoPlayStarted();
          })
          .catch(() => {});
      }
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', startAudioOnInteraction);
      window.removeEventListener('touchstart', startAudioOnInteraction);
      window.removeEventListener('scroll', startAudioOnInteraction);
      window.removeEventListener('keydown', startAudioOnInteraction);
    };

    window.addEventListener('click', startAudioOnInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', startAudioOnInteraction, { once: true, passive: true });
    window.addEventListener('scroll', startAudioOnInteraction, { once: true, passive: true });
    window.addEventListener('keydown', startAudioOnInteraction, { once: true, passive: true });

    return cleanupListeners;
  }, [isPlaying, onAutoPlayStarted]);

  return null;
};
