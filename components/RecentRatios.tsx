'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, ExternalLink } from 'lucide-react';
import { RecentRatio, generateRecentRatios } from '@/lib/mockData';

interface TweetModalProps {
  isOpen: boolean;
  onClose: () => void;
  ratio: RecentRatio | null;
}

function TweetModal({ isOpen, onClose, ratio }: TweetModalProps) {
  if (!ratio) return null;

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
              className="bg-dark-card border border-dark-border rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
              <div className="flex items-center gap-3 mb-4">
                <Twitter className="w-6 h-6 text-neon-green" />
                <div>
                  <div className="font-semibold">{ratio.handle}</div>
                  <div className="text-sm text-gray-400">{ratio.time}</div>
                </div>
              </div>
              <div className="mb-4 p-4 bg-dark-bg rounded-lg border border-dark-border">
                <p className="text-sm text-gray-300 mb-2">
                  Tweet content preview for {ratio.handle}
                </p>
                <p className="text-xs text-gray-500">
                  This is a mocked tweet. In production, this would display the actual tweet content.
                </p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neon-green font-semibold">Reward: {ratio.reward}</span>
                <a
                  href={ratio.tweetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neon-green hover:text-neon-cyan transition-colors text-sm flex items-center gap-2"
                >
                  View on Twitter <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function RecentRatios() {
  const [ratios, setRatios] = useState<RecentRatio[]>(generateRecentRatios(8));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedRatio, setSelectedRatio] = useState<RecentRatio | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update with new random data
      const newRatios = generateRecentRatios(8);
      setRatios(newRatios);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusText = (ratio: RecentRatio) => {
    const statuses = [
      'Tweet verified / Reward pending',
      'Verification complete / Processing payment',
      'Reward sent successfully',
    ];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const handleRatioClick = (ratio: RecentRatio) => {
    setSelectedRatio(ratio);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-dark-card border border-dark-border rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-6">Recent Ratios</h2>
        <div className="space-y-3">
          {ratios.map((ratio, idx) => (
            <div
              key={ratio.id}
              className="relative"
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <motion.div
                className="flex items-center justify-between p-3 bg-dark-bg rounded-lg border border-dark-border hover:border-neon-green/50 transition-colors group cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleRatioClick(ratio)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center">
                    <Twitter className="w-4 h-4 text-neon-green" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{ratio.handle}</div>
                    <div className="text-xs text-gray-400">{ratio.time}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-neon-green font-semibold">{ratio.reward}</span>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:text-neon-green">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>

              {/* Tooltip */}
              {hoveredIndex === idx && (
                <motion.div
                  className="absolute left-0 bottom-full mb-2 z-10 px-3 py-2 bg-dark-card border border-neon-green/50 rounded-lg shadow-lg shadow-neon-green/20 text-xs text-gray-300 whitespace-nowrap"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  {getStatusText(ratio)}
                  <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-neon-green/50" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>

      <TweetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ratio={selectedRatio}
      />
    </>
  );
}

