
import React, { useState, useEffect, useRef } from 'react';

interface StopWatchProps {
  running: boolean;
  onTimerUpdate: (time: string) => void;
}

const StopWatch: React.FC<StopWatchProps> = ({ running, onTimerUpdate }) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [running]);

  // Format time to MM:SS:SS
  const formatTime = (timeInMs: number) => {
    const minutes = Math.floor(timeInMs / 60000);
    const seconds = Math.floor((timeInMs % 60000) / 1000);
    const hundredths = Math.floor((timeInMs % 1000) / 10);
    
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${hundredths.toString().padStart(2, '0')}`;
    
    onTimerUpdate(formattedTime);
    return formattedTime;
  };

  return (
    <div className="font-mono text-gray-700 font-medium">
      {formatTime(time)}
    </div>
  );
};

export default StopWatch;
