import React, { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(targetDate) - +new Date();
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto px-2 sm:px-4 py-4">
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="relative flex flex-col items-center justify-center p-3 sm:p-5 bg-[#091c18]/80 backdrop-blur-md rounded-xl border border-amber-400/35 shadow-[0_10px_30px_rgba(0,0,0,0.45)] hover:border-amber-300/70 transition-all duration-300"
          >
            {/* Tiny gilded corner dots */}
            <span className="absolute top-1.5 left-1.5 w-1 h-1 rounded-full bg-amber-400/60" />
            <span className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-amber-400/60" />
            <span className="absolute bottom-1.5 left-1.5 w-1 h-1 rounded-full bg-amber-400/60" />
            <span className="absolute bottom-1.5 right-1.5 w-1 h-1 rounded-full bg-amber-400/60" />

            <span className="font-cinzel text-2xl sm:text-4xl md:text-5xl font-medium text-gold-foil tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[9px] sm:text-[11px] uppercase tracking-[0.2em] text-amber-200/75 font-cinzel mt-1.5">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
