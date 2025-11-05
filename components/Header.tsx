'use client';

import { useState, useEffect } from 'react';
import { Copy, Check } from 'lucide-react';
import { CONTRACT_ADDRESS } from '@/lib/mockData';
import WalletButton from './WalletButton';
import Image from 'next/image';

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Header() {
  const [isOnline, setIsOnline] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Simulate occasional offline status
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsOnline(false);
        setTimeout(() => setIsOnline(true), 2000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="w-full border-b border-dark-border bg-dark-bg/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Share402 Logo"
                width={32}
                height={32}
                className="object-contain"
                priority
              />
              <h1 className="text-2xl font-bold tracking-tight">
                Share<span className="text-neon-green">402</span>
              </h1>
            </div>
            <div className="h-6 w-px bg-dark-border mx-2" />
            <p className="text-sm text-gray-400">Share. Submit. Earn.</p>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* X (Twitter) Link */}
            <a
              href="https://x.com/Share402_xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:bg-dark-card rounded-lg transition-colors group"
              title="Follow us on X"
            >
              <XIcon className="w-5 h-5 text-gray-400 group-hover:text-neon-green transition-colors" />
            </a>

            {/* System Status */}
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-neon-green animate-pulse' : 'bg-red-500'}`} />
              <span className="text-sm font-medium">
                System {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>

            {/* Contract Address */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-dark-card border border-dark-border rounded-lg hover:border-neon-green/50 transition-colors">
              <span className="text-xs font-mono text-gray-400">
                CA: {CONTRACT_ADDRESS.slice(0, 8)}...{CONTRACT_ADDRESS.slice(-6)}
              </span>
              <button
                onClick={copyToClipboard}
                className="p-1 hover:text-neon-green transition-colors"
                title="Copy contract address"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-neon-green" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Connect Wallet Button */}
            <WalletButton />
          </div>
        </div>
      </div>
    </header>
  );
}

