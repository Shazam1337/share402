'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { generateSOL } from '@/lib/mockData';

export default function FeeClaims() {
  const [feeAmount, setFeeAmount] = useState('0.0005605'); // Reduced by 20x (0.01121 / 20)
  const [lastClaimed, setLastClaimed] = useState(2);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);
      const current = parseFloat(feeAmount);
      const increment = Math.random() * 0.00005; // Reduced by 20x
      setFeeAmount((current + increment).toFixed(5));
      setLastClaimed(Math.floor(Math.random() * 5) + 1);
      
      setTimeout(() => setIsUpdating(false), 500);
    }, 15000);

    return () => clearInterval(interval);
  }, [feeAmount]);

  return (
    <motion.div
      className="bg-dark-card border border-dark-border rounded-xl p-6 relative overflow-hidden"
      animate={isUpdating ? { scale: [1, 1.02, 1] } : {}}
    >
      {isUpdating && (
        <motion.div
          className="absolute inset-0 bg-neon-green/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 0.6 }}
        />
      )}
      <div className="relative z-10">
        <h3 className="text-sm text-gray-400 mb-2">Creator Fee Claims</h3>
        <motion.div
          className="text-2xl font-bold text-neon-green mb-2"
          key={feeAmount}
          initial={{ scale: 1.1, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {feeAmount} SOL
        </motion.div>
        <p className="text-xs text-gray-400">Last claimed {lastClaimed}m ago</p>
      </div>
    </motion.div>
  );
}

