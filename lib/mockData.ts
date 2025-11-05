// Mock data generator for Share402

export interface MetricCard {
  title: string;
  value: string;
  updateInterval: number;
  sparkline: number[];
}

export interface RecentRatio {
  id: string;
  handle: string;
  time: string;
  reward: string;
  tweetUrl: string;
}

export interface TopRaider {
  id: string;
  handle: string;
  raids: number;
  totalEarned: string;
  avatar: string;
}

export interface PendingVerification {
  id: string;
  handle: string;
  tweetUrl: string;
  status: 'pending' | 'verified' | 'paid';
  progress: number;
  submittedAt: Date;
}

// Generate random SOL value
export const generateSOL = (min: number, max: number): string => {
  const value = (Math.random() * (max - min) + min).toFixed(4);
  return `${value} SOL`;
};

// Generate random number
export const generateNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

// Generate sparkline data
export const generateSparkline = (points: number = 10): number[] => {
  return Array.from({ length: points }, () => Math.random() * 100);
};

// Generate random handle
export const generateHandle = (): string => {
  const prefixes = ['solana', 'crypto', 'web3', 'defi', 'nft', 'dao', 'bull', 'bear'];
  const suffixes = ['king', 'queen', 'master', 'guru', 'pro', 'dev', 'builder', 'trader'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const num = Math.floor(Math.random() * 9999);
  return `@${prefix}${suffix}${num}`;
};

// Generate initial metrics
export const getInitialMetrics = (): MetricCard[] => {
  // Ensure Unclaimed Fees is always greater than Paid Out
  const paidOutValue = parseFloat(generateSOL(0.015, 0.03)); // Reduced by 20x
  const unclaimedFeesValue = paidOutValue + 0.005 + Math.random() * 0.025; // Always greater (reduced by 20x)
  
  return [
    {
      title: 'Total Unclaimed Fees',
      value: `${unclaimedFeesValue.toFixed(4)} SOL`,
      updateInterval: 1000, // 1 second - faster updates
      sparkline: generateSparkline(),
    },
    {
      title: 'Total Creator Rewards',
      value: generateSOL(0.0005, 0.0025), // Reduced by 20x
      updateInterval: 1200, // 1.2 seconds - faster updates
      sparkline: generateSparkline(),
    },
    {
      title: 'Total Transactions',
      value: generateNumber(100, 200).toString(),
      updateInterval: 1500, // 1.5 seconds - faster updates
      sparkline: generateSparkline(),
    },
    {
      title: 'Total Paid Out',
      value: `${paidOutValue.toFixed(4)} SOL`,
      updateInterval: 1000, // 1 second - faster updates
      sparkline: generateSparkline(),
    },
  ];
};

// Generate additional metrics
export const getAdditionalMetrics = (): MetricCard[] => {
  return [
    {
      title: 'Active Users (24h)',
      value: generateNumber(45, 120).toString(),
      updateInterval: 2000,
      sparkline: generateSparkline(),
    },
    {
      title: 'Top Tweets (by reach)',
      value: generateNumber(150, 500).toString(),
      updateInterval: 3000,
      sparkline: generateSparkline(),
    },
    {
      title: 'Conversion Rate',
      value: `${(75 + Math.random() * 20).toFixed(1)}%`,
      updateInterval: 2500,
      sparkline: generateSparkline(),
    },
  ];
};

// Generate recent ratios
export const generateRecentRatios = (count: number = 8): RecentRatio[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `ratio-${Date.now()}-${i}`,
    handle: generateHandle(),
    time: `${generateNumber(1, 60)}m ago`,
    reward: `+${generateSOL(0.0005, 0.0025)}`, // Reduced by 20x
    tweetUrl: `https://twitter.com/${generateHandle().replace('@', '')}/status/${generateNumber(1000000000, 9999999999)}`,
  }));
};

// Generate top raiders
export const generateTopRaiders = (count: number = 7): TopRaider[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `raider-${i}`,
    handle: generateHandle(),
    raids: generateNumber(5, 50),
    totalEarned: generateSOL(0.005, 0.1), // Reduced by 20x
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${generateHandle()}`,
  })).sort((a, b) => parseFloat(b.totalEarned) - parseFloat(a.totalEarned));
};

// Generate pending verifications
export const generatePendingVerifications = (count: number = 6): PendingVerification[] => {
  const statuses: ('pending' | 'verified' | 'paid')[] = ['pending', 'verified', 'paid'];
  return Array.from({ length: count }, (_, i) => ({
    id: `pending-${Date.now()}-${i}`,
    handle: generateHandle(),
    tweetUrl: `https://twitter.com/${generateHandle().replace('@', '')}/status/${generateNumber(1000000000, 9999999999)}`,
    status: statuses[Math.floor(Math.random() * statuses.length)],
    progress: Math.random() * 100,
    submittedAt: new Date(Date.now() - Math.random() * 3600000),
  }));
};

// Contract address (mock)
export const CONTRACT_ADDRESS = '';

// Live ticker messages
export const generateTickerMessage = (): { message: string; type: 'reward' | 'system' | 'user'; color: string } => {
  const handles = [generateHandle(), generateHandle(), generateHandle()];
  const rewards = [generateSOL(0.0005, 0.0025), generateSOL(0.001, 0.004)]; // Reduced by 20x
  const users = generateNumber(1, 5);
  const uptime = (99.5 + Math.random() * 0.5).toFixed(2);
  
  const messageTypes = [
    {
      message: `${handles[0]} earned ${rewards[0]} • Total Users +${users} • System Uptime ${uptime}%`,
      type: 'reward' as const,
      color: 'neon-green',
    },
    {
      message: `System check OK. Rewards synchronized.`,
      type: 'system' as const,
      color: 'blue',
    },
    {
      message: `${handles[0]} joined the network.`,
      type: 'user' as const,
      color: 'purple',
    },
    {
      message: `${handles[0]} earned ${rewards[0]} • New raid verified`,
      type: 'reward' as const,
      color: 'neon-green',
    },
  ];
  
  return messageTypes[Math.floor(Math.random() * messageTypes.length)];
};

