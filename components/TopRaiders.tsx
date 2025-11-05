'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopRaider, generateTopRaiders } from '@/lib/mockData';
import { X } from 'lucide-react';

interface RaiderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  raider: TopRaider | null;
}

function RaiderHistoryModal({ isOpen, onClose, raider }: RaiderHistoryModalProps) {
  if (!raider) return null;

  const mockHistory = Array.from({ length: 5 }, (_, i) => ({
    id: `raid-${i}`,
    date: `${Math.floor(Math.random() * 30) + 1} days ago`,
    reward: `+${(Math.random() * 0.01).toFixed(4)} SOL`,
    tweetUrl: `https://twitter.com/${raider.handle.replace('@', '')}/status/${Math.floor(Math.random() * 1000000000)}`,
  }));

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={onClose}
          >
            <motion.div
              className="bg-dark-card border border-dark-border rounded-xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-6">
                <img
                  src={raider.avatar}
                  alt={raider.handle}
                  className="w-12 h-12 rounded-full border border-neon-green/30"
                />
                <div>
                  <div className="font-semibold">{raider.handle}</div>
                  <div className="text-sm text-gray-400">{raider.raids} raids • {raider.totalEarned} total</div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-4">Recent Raids</h3>
              <div className="space-y-3">
                {mockHistory.map((raid) => (
                  <div
                    key={raid.id}
                    className="p-3 bg-dark-bg rounded-lg border border-dark-border flex items-center justify-between"
                  >
                    <div>
                      <div className="text-sm font-medium">{raid.reward}</div>
                      <div className="text-xs text-gray-400">{raid.date}</div>
                    </div>
                    <a
                      href={raid.tweetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-green hover:text-neon-cyan transition-colors text-xs"
                    >
                      View →
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function TopRaiders() {
  const [raiders, setRaiders] = useState<TopRaider[]>(generateTopRaiders(7));
  const [selectedRaider, setSelectedRaider] = useState<TopRaider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setRaiders(generateTopRaiders(7));
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const maxEarned = Math.max(...raiders.map(r => parseFloat(r.totalEarned)));

  const getRankEmoji = (idx: number) => {
    if (idx === 0) return '🥇';
    if (idx === 1) return '🥈';
    if (idx === 2) return '🥉';
    return null;
  };

  const handleRaiderClick = (raider: TopRaider) => {
    setSelectedRaider(raider);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Top Raiders</h2>
        <div className="space-y-4">
          {raiders.map((raider, idx) => {
            const progress = (parseFloat(raider.totalEarned) / maxEarned) * 100;
            const rankEmoji = getRankEmoji(idx);
            return (
              <motion.div
                key={raider.id}
                className="flex items-center gap-4 p-3 bg-dark-bg rounded-lg border border-dark-border hover:border-neon-green/50 transition-all cursor-pointer group relative overflow-hidden"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleRaiderClick(raider)}
                whileHover={{ scale: 1.02 }}
              >
                {/* Gradient glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-neon-green/10 via-neon-purple/10 to-neon-green/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                
                <div className="relative z-10 flex-shrink-0 flex items-center gap-2">
                  {rankEmoji && <span className="text-xl">{rankEmoji}</span>}
                  <img
                    src={raider.avatar}
                    alt={raider.handle}
                    className="w-10 h-10 rounded-full border border-neon-green/30"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${raider.handle}`;
                    }}
                  />
                </div>
                <div className="relative z-10 flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-sm truncate">{raider.handle}</div>
                    <div className="text-neon-green font-semibold text-sm ml-2">
                      {raider.totalEarned}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{raider.raids} raids</span>
                    <div className="flex-1 mx-2 h-1.5 bg-dark-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-neon-green via-neon-purple to-neon-cyan rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <RaiderHistoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        raider={selectedRaider}
      />
    </>
  );
}

