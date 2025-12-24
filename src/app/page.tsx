'use client';

import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import HowIThink from '@/components/HowIThink';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { analytics } from '@/lib/analytics';

export default function Home() {
  useEffect(() => {
    // Track initial page load
    analytics.trackPageView();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <HowIThink />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
