import { useEffect, useRef } from 'react';

interface MusicPlayerProps {
  isPlaying: boolean;
  currentSongIndex: number;
  onSongEnd: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying,
  currentSongIndex,
  onSongEnd,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const songs = ['/media/cancion-1.mp3', '/media/cancion-2.mp3'];
  const currentSrc = songs[currentSongIndex % songs.length];

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(currentSrc);
      audioRef.current.loop = false;
    } else {
      audioRef.current.src = currentSrc;
    }

    const audio = audioRef.current;

    const handleEnded = () => {
      onSongEnd();
    };

    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn('Audio play request:', err);
      });
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isPlaying, currentSrc]);

  return null;
};
