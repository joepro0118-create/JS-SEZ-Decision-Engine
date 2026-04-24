import React from 'react';
import HeroSection from '../components/HeroSection.jsx';

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[var(--color-nexus-bg)] flex flex-col w-full">
      <HeroSection />
    </div>
  );
}