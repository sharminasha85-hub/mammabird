import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ParticleCanvas from './components/ParticleCanvas';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AgesGuide from './components/AgesGuide';
import StoryPillars from './components/StoryPillars';
import LookbookShowcase from './components/LookbookShowcase';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Refresh GSAP ScrollTrigger after initial mount and font loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app-container" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Gentle Floating Feathers & Petals Canvas */}
      <ParticleCanvas />

      {/* Top Glass Navigation */}
      <Navbar />

      {/* Main Page Content */}
      <main>
        {/* 1. Hero: Branding, Countdown & VIP Early Access Form */}
        <HeroSection />

        {/* 2. Ages 0–10 Deep Dive Guide */}
        <AgesGuide />

        {/* 3. The Mother Bird's Nest Philosophy & Materials (GSAP Pinned/Staggered) */}
        <StoryPillars />

        {/* 4. Capsule Lookbook Preview with Interactive Modals & Filters */}
        <LookbookShowcase />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
