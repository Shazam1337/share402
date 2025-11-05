'use client';

import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  if (!isLoading) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-dark-bg z-50 flex items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="mb-6"
        >
          <Zap className="w-16 h-16 text-neon-green mx-auto" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-4">Syncing with Share402 Network...</h2>
        <div className="w-64 h-1 bg-dark-border rounded-full overflow-hidden mx-auto">
          <motion.div
            className="h-full bg-gradient-to-r from-neon-green to-neon-cyan"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
}

