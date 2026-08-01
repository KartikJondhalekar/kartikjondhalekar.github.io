'use client';

import { motion } from 'framer-motion';
import { ChevronDown, MapPin, Mail, Github, Linkedin } from 'lucide-react';
import contentData from '@/data/content.json';
import type { ContentData } from '@/types/content';

export default function Hero() {
  const data = contentData as ContentData;
  const { profile } = data;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Animated Gradient Orb */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl"
        style={{
          background: 'radial-gradient(circle, #F59E0B, #FB923C)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Second Orb */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl"
        style={{
          background: 'radial-gradient(circle, #E11D48, #F59E0B)',
          mixBlendMode: 'screen',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
      >
        {/* Overline */}
        <motion.p
          variants={itemVariants}
          className="font-mono text-sm text-accent mb-6 tracking-wider uppercase"
        >
          Software Engineer
        </motion.p>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-6xl md:text-8xl font-bold mb-6 tracking-tight"
        >
          {profile.name}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto font-mono"
        >
          AI/ML • Full-Stack • Cloud
        </motion.p>

        {/* Location & Quick Contact */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 text-text-secondary mb-12"
        >
          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-accent" />
            <span className="font-mono text-sm">{profile.location}</span>
          </div>
          <span className="text-border">•</span>
          <a
            href={`mailto:${profile.contact.email}`}
            className="flex items-center gap-2 font-mono text-sm hover:text-accent transition-colors"
          >
            <Mail size={14} className="text-accent" />
            {profile.contact.email}
          </a>
          <span className="text-border">•</span>
          <a
            href={profile.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm hover:text-accent transition-colors"
          >
            <Github size={14} className="text-accent" />
            GitHub
          </a>
          <span className="text-border">•</span>
          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-mono text-sm hover:text-accent transition-colors"
          >
            <Linkedin size={14} className="text-accent" />
            LinkedIn
          </a>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-primary text-background font-mono text-sm rounded-lg hover:bg-accent transition-all shadow-lg"
          >
            View Projects
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border-2 border-primary font-mono text-sm rounded-lg hover:bg-primary/10 transition-all"
          >
            Get in Touch
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-text-secondary hover:text-accent transition-colors"
        aria-label="Scroll to content"
      >
        <ChevronDown size={32} />
      </motion.button>
    </section>
  );
}
