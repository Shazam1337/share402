'use client';

import { useEffect, useState } from 'react';
import { generateTickerMessage } from '@/lib/mockData';

const getMarker = (type: string) => {
  switch (type) {
    case 'reward':
      return '🟢';
    case 'system':
      return '🔵';
    case 'user':
      return '🟡';
    default:
      return '🟢';
  }
};

const getColorClass = (color: string) => {
  switch (color) {
    case 'neon-green':
      return 'text-neon-green';
    case 'blue':
      return 'text-blue-400';
    case 'purple':
      return 'text-neon-purple';
    default:
      return 'text-gray-300';
  }
};

export default function LiveTicker() {
  const [tickerData, setTickerData] = useState(generateTickerMessage());

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerData(generateTickerMessage());
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Create enough copies for seamless infinite scroll
  const tickerItems = Array.from({ length: 6 }, (_, i) => ({
    ...tickerData,
    id: i,
  }));

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-b from-dark-card to-dark-bg border-t border-dark-border py-2.5 overflow-hidden z-40">
      <div className="relative h-full">
        {/* Scanline/glitch effect */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-30" 
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 136, 0.03) 2px, rgba(0, 255, 136, 0.03) 4px)',
          }}
        />
        
        {/* Gradient glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 via-transparent to-neon-green/20 pointer-events-none" />
        
        {/* Animated sliding text container */}
        <div className="relative h-full overflow-hidden">
          <div 
            className="flex items-center whitespace-nowrap"
            style={{
              animation: 'slide 40s linear infinite',
            }}
          >
            {/* First set of items */}
            {tickerItems.map((item, idx) => (
              <div
                key={`first-${item.type}-${idx}`}
                className="flex items-center gap-3 text-sm px-6 flex-shrink-0"
              >
                <span className="text-lg leading-none">{getMarker(item.type)}</span>
                <span className={`${getColorClass(item.color)} font-medium tracking-wide`}>
                  {item.message}
                </span>
                <span className="text-neon-green/30">•</span>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {tickerItems.map((item, idx) => (
              <div
                key={`second-${item.type}-${idx}`}
                className="flex items-center gap-3 text-sm px-6 flex-shrink-0"
              >
                <span className="text-lg leading-none">{getMarker(item.type)}</span>
                <span className={`${getColorClass(item.color)} font-medium tracking-wide`}>
                  {item.message}
                </span>
                <span className="text-neon-green/30">•</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

