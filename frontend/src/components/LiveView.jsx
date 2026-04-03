import React, { useState, useEffect } from 'react';

const LiveView = () => {
  const [viewers, setViewers] = useState(Math.floor(Math.random() * (50 - 15 + 1)) + 15);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.floor(Math.random() * 10) - 5;
      setViewers(prev => {
        const newCount = prev + change;
        return newCount < 5 ? 10 : newCount > 100 ? 90 : newCount;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base font-medium mb-4 animate-pulse">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
      </svg>
      <p>{viewers} customers are viewing this product</p>
    </div>
  );
};

export default LiveView;