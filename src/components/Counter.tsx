import React, { useState, useEffect } from 'react';

interface CounterProps {
  gameWon: boolean;
}

const Counter: React.FC<CounterProps> = ({ gameWon }) => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Use localhost URL in development, production URL otherwise
  const baseUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:8787'
    : 'https://goon-guessr-counter.YOUR_WORKER_DOMAIN';

  const fetchCount = async () => {
    try {
      const response = await fetch(`${baseUrl}/count`);
      const data = await response.json();
      setCount(data.count);
    } catch (err) {
      setError('Failed to fetch count');
      console.error('Error fetching count:', err);
    }
  };

  const incrementCount = async () => {
    try {
      const response = await fetch(`${baseUrl}/increment`, {
        method: 'POST',
      });
      const data = await response.json();
      setCount(data.count);
    } catch (err) {
      setError('Failed to increment count');
      console.error('Error incrementing count:', err);
    }
  };

  useEffect(() => {
    fetchCount();
    // Poll every 30 seconds to keep the count updated
    const interval = setInterval(fetchCount, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameWon) {
      incrementCount();
    }
  }, [gameWon]);

  return (
    <div className="text-center text-sm text-gray-600">
      {error ? 'Error loading count' : (
        <>
          <span className="font-bold">{count}</span> have already gooned today
        </>
      )}
    </div>
  );
};

export default Counter;