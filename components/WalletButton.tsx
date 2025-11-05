'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Wallet, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WalletButton() {
  const { wallet, publicKey, disconnect, connected } = useWallet();
  const { setVisible } = useWalletModal();

  const handleClick = () => {
    if (connected) {
      disconnect();
    } else {
      setVisible(true);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <motion.button
      onClick={handleClick}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-green to-neon-cyan text-dark-bg font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-green/50 transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {connected ? (
        <>
          <LogOut className="w-4 h-4" />
          <span className="text-sm">{formatAddress(publicKey?.toBase58() || '')}</span>
        </>
      ) : (
        <>
          <Wallet className="w-4 h-4" />
          <span className="text-sm">Connect Wallet</span>
        </>
      )}
    </motion.button>
  );
}

