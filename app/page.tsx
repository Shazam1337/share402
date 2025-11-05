'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import MetricCard from '@/components/MetricCard';
import SubmitSection from '@/components/SubmitSection';
import RecentRatios from '@/components/RecentRatios';
import TopRaiders from '@/components/TopRaiders';
import PendingVerifications from '@/components/PendingVerifications';
import FeeClaims from '@/components/FeeClaims';
import LiveTicker from '@/components/LiveTicker';
import LoadingScreen from '@/components/LoadingScreen';
import { getInitialMetrics, getAdditionalMetrics } from '@/lib/mockData';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [metrics] = useState(getInitialMetrics());
  const [additionalMetrics] = useState(getAdditionalMetrics());

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />
      <div className="min-h-screen bg-dark-bg pb-16">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Overview - 4 Main Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {metrics.map((metric, idx) => (
              <MetricCard key={idx} {...metric} />
            ))}
          </div>

          {/* Additional Metrics - 3 New Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {additionalMetrics.map((metric, idx) => (
              <MetricCard key={`additional-${idx}`} {...metric} />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Left Column - Submit Section */}
            <div className="lg:col-span-1">
              <SubmitSection />
            </div>

            {/* Middle Column - Activity Panels */}
            <div className="lg:col-span-1 space-y-6">
              <RecentRatios />
              <TopRaiders />
            </div>

            {/* Right Column - Pending Verifications & Fee Claims */}
            <div className="lg:col-span-1 space-y-6">
              <PendingVerifications />
              <FeeClaims />
            </div>
          </div>
        </main>

        <LiveTicker />
      </div>
    </>
  );
}

