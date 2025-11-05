'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Coins } from 'lucide-react';
import { PendingVerification, generatePendingVerifications } from '@/lib/mockData';

export default function PendingVerifications() {
  const [verifications, setVerifications] = useState<PendingVerification[]>(
    generatePendingVerifications(6)
  );

  useEffect(() => {
    // Update existing verifications status with gradual progress
    const updateInterval = setInterval(() => {
      setVerifications(prev => {
        return prev.map(v => {
          // Simulate gradual status progression
          if (v.status === 'pending') {
            // Gradually increase progress from 0 to 50
            const increment = Math.random() * 3 + 2; // 2-5% increment
            const newProgress = Math.min(v.progress + increment, 50);
            
            // Transition to verified when reaching 50%
            if (newProgress >= 50 && Math.random() > 0.5) {
              return { ...v, status: 'verified', progress: 50 };
            }
            return { ...v, progress: newProgress };
          } else if (v.status === 'verified') {
            // Gradually increase progress from 50 to 100
            const increment = Math.random() * 3 + 2; // 2-5% increment
            const newProgress = Math.min(v.progress + increment, 100);
            
            // Transition to paid when reaching 100%
            if (newProgress >= 100) {
              return { ...v, status: 'paid', progress: 100 };
            }
            return { ...v, progress: newProgress };
          }
          return v;
        });
      });
    }, 1500); // Update every 1.5 seconds for smoother progress

    // Add new pending verifications periodically
    const addNewInterval = setInterval(() => {
      setVerifications(prev => {
        // Remove old paid items (keep max 3 paid items)
        const paidItems = prev.filter(v => v.status === 'paid');
        const activeItems = prev.filter(v => v.status !== 'paid');
        
        // Keep only the 2 most recent paid items
        const recentPaid = paidItems
          .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())
          .slice(0, 2);
        
        // Add 1-2 new pending items (always with 'pending' status)
        const newCount = Math.floor(Math.random() * 2) + 1;
        const newItems = Array.from({ length: newCount }, (_, i) => {
          const baseItem = generatePendingVerifications(1)[0];
          return {
            ...baseItem,
            status: 'pending' as const,
            progress: 0,
            submittedAt: new Date(),
          };
        });
        
        // Combine: active items + recent paid + new items
        // Limit total to 8 items
        const combined = [...activeItems, ...recentPaid, ...newItems];
        return combined.slice(-8);
      });
    }, 8000); // Add new items every 8 seconds

    return () => {
      clearInterval(updateInterval);
      clearInterval(addNewInterval);
    };
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'verified':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'paid':
        return <Coins className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'verified':
        return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'paid':
        return 'text-neon-green border-neon-green/30 bg-neon-green/10';
      default:
        return '';
    }
  };

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6">Pending Verifications</h2>
      <div className="space-y-4">
        {verifications.map((verification, idx) => (
          <motion.div
            key={verification.id}
            className="p-4 bg-dark-bg rounded-lg border border-dark-border relative overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            {/* Status transition animation background */}
            {verification.status === 'paid' && (
              <motion.div
                className="absolute inset-0 bg-neon-green/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.3, 0.1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded border ${getStatusColor(verification.status)}`}>
                  {getStatusIcon(verification.status)}
                </div>
                <div>
                  <div className="font-medium text-sm">{verification.handle}</div>
                  <div className="text-xs text-gray-400 capitalize">{verification.status}</div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Progress</span>
                <span>{Math.round(verification.progress)}%</span>
              </div>
              <div className="h-2 bg-dark-border rounded-full overflow-hidden relative">
                {/* Animated progress bar */}
                <motion.div
                  className={`h-full rounded-full ${
                    verification.status === 'pending'
                      ? 'bg-yellow-400'
                      : verification.status === 'verified'
                      ? 'bg-blue-400'
                      : 'bg-neon-green'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${verification.progress}%` }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
                {/* Animated shimmer effect for paid status */}
                {verification.status === 'paid' && verification.progress === 100 && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                )}
                {/* Glow effect for paid status */}
                {verification.status === 'paid' && verification.progress === 100 && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-neon-green/30 blur-sm"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

