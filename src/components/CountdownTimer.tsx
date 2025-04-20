import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  revealed: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ revealed }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');

  useEffect(() => {
    if (!revealed) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      tomorrow.setUTCHours(0, 0, 0, 0); // Reset at UTC 0:00

      const difference = tomorrow.getTime() - now.getTime();
      
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Update immediately
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [revealed]);

  if (!revealed) return null;

  return (
    <div className="text-center text-sm text-gray-600">
      Next Baddie in <span className="font-bold">{timeLeft}</span>
    </div>
  );
};

export default CountdownTimer; 