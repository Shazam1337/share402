'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2 } from 'lucide-react';

export default function SubmitSection() {
  const [formData, setFormData] = useState({
    twitterHandle: '',
    tweetUrl: '',
    walletAddress: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [checklistProgress, setChecklistProgress] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Animate checklist
    let progress = 0;
    const interval = setInterval(() => {
      progress++;
      setChecklistProgress(progress);
      if (progress >= 3) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const checklistItems = [
    'Must mention CA in tweet',
    'Verification once per minute',
    'Payment sent automatically',
  ];

  return (
    <div className="bg-dark-card border border-dark-border rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Send className="w-5 h-5 text-neon-green" />
        Submit Raid
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Twitter Handle</label>
          <input
            type="text"
            value={formData.twitterHandle}
            onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
            placeholder="@username"
            className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-green transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Tweet URL</label>
          <input
            type="url"
            value={formData.tweetUrl}
            onChange={(e) => setFormData({ ...formData, tweetUrl: e.target.value })}
            placeholder="https://twitter.com/..."
            className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-green transition-colors"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Wallet Address</label>
          <input
            type="text"
            value={formData.walletAddress}
            onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
            placeholder="Enter Solana wallet address"
            className="w-full px-4 py-2.5 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-neon-green transition-colors font-mono text-sm"
            required
          />
        </div>

        <motion.button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-neon-green to-neon-cyan text-dark-bg font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-green/50 transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Send className="w-5 h-5" />
          Submit Raid
        </motion.button>
      </form>

      {/* Checklist */}
      {submitted && (
        <motion.div
          className="mt-6 pt-6 border-t border-dark-border space-y-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {checklistItems.map((item, idx) => (
            <motion.div
              key={idx}
              className="flex items-center gap-2 text-sm"
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: idx < checklistProgress ? 1 : 0.5,
                x: idx < checklistProgress ? 0 : -10,
              }}
              transition={{ delay: idx * 0.3 }}
            >
              {idx < checklistProgress ? (
                <CheckCircle2 className="w-4 h-4 text-neon-green" />
              ) : (
                <div className="w-4 h-4 border border-gray-500 rounded-full" />
              )}
              <span className={idx < checklistProgress ? 'text-gray-300' : 'text-gray-500'}>
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

