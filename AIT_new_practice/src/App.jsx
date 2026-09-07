import React from 'react';
import Hero from './components/Hero';
import GlobalReach from './components/GlobalReach';
import StatsSection from './components/StatsSection';
import AIPoweredSection from './components/AIPoweredSection';
import FooterCTA from './components/FooterCTA';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050608] text-white">
      <Hero />
      <GlobalReach />
      <StatsSection />
      <AIPoweredSection />
      <FooterCTA />
    </div>
  );
}
