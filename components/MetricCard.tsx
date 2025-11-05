'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string;
  updateInterval: number;
  sparkline: number[];
}

export default function MetricCard({ title, value, updateInterval, sparkline }: MetricCardProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const [isUpdating, setIsUpdating] = useState(false);
  const [sparklineData, setSparklineData] = useState(sparkline);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      
      // Update value
      if (value.includes('SOL')) {
        const current = parseFloat(currentValue);
        let increment: number;
        
        // Different increment rates based on metric type (all reduced by 20x)
        if (title === 'Total Unclaimed Fees') {
          // Unclaimed Fees should grow faster and stay larger
          increment = Math.random() * 0.00015 + 0.00005; // 0.00005-0.0002 (faster growth, reduced by 20x)
        } else if (title === 'Total Paid Out') {
          // Paid Out should grow slower to maintain Unclaimed Fees > Paid Out
          increment = Math.random() * 0.000025; // 0-0.000025 (slower growth, reduced by 20x)
        } else {
          // Creator Rewards - moderate growth
          increment = Math.random() * 0.00005; // Reduced by 20x
        }
        
        setCurrentValue(`${(current + increment).toFixed(4)} SOL`);
      } else if (value.includes('%')) {
        // Percentage values (Conversion Rate)
        const current = parseFloat(currentValue);
        const change = (Math.random() - 0.5) * 0.5; // Small random change
        const newValue = Math.max(0, Math.min(100, current + change));
        setCurrentValue(`${newValue.toFixed(1)}%`);
      } else {
        // Numeric values (Transactions, Active Users, Top Tweets)
        const current = parseInt(currentValue);
        setCurrentValue((current + Math.floor(Math.random() * 3) + 1).toString());
      }

      // Update sparkline
      setSparklineData(prev => {
        const newData = [...prev.slice(1), Math.random() * 100];
        return newData;
      });

      setTimeout(() => setIsUpdating(false), 500);
    }, updateInterval);

    return () => clearInterval(interval);
  }, [currentValue, updateInterval, value, title]);

  const maxSpark = Math.max(...sparklineData);
  const minSpark = Math.min(...sparklineData);
  const range = maxSpark - minSpark || 1;

  return (
    <motion.div
      className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-neon-green/30 transition-all duration-300 relative overflow-hidden"
      whileHover={{ y: -2 }}
      animate={isUpdating ? { scale: [1, 1.02, 1] } : {}}
    >
      {/* Pulse effect background */}
      {isUpdating && (
        <motion.div
          className="absolute inset-0 bg-neon-green/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.5 }}
        />
      )}

      <div className="relative z-10">
        <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
        <motion.div
          className="text-2xl font-bold text-neon-green mb-4"
          key={currentValue}
          initial={{ scale: 1.1, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentValue}
        </motion.div>

        {/* Mini sparkline */}
        <div className="h-12 w-full flex items-end gap-0.5 opacity-60">
          {sparklineData.map((point, idx) => {
            const height = ((point - minSpark) / range) * 100;
            return (
              <div
                key={idx}
                className="flex-1 bg-neon-green rounded-t"
                style={{
                  height: `${Math.max(height, 5)}%`,
                  transition: 'height 0.3s ease',
                }}
              />
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

