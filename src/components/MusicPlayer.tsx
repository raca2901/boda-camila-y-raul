import { useEffect, useRef } from 'react';

interface MusicPlayerProps {
  isPlaying: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isPlaying }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Canción exclusiva de Narnia ("Lucy Meets Mr. Tumnus")
  const narniaSongSrc = '/media/narnia-tumnus.mp3';

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(narniaSongSrc);
      audioRef.current.loop = true;
    }

    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn('Audio play request:', err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  return null;
};
