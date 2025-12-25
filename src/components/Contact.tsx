'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';
import contentData from '@/data/content.json';
import type { ContentData } from '@/types/content';
import { trackContactInteraction, trackExternalLink, trackSectionView } from '@/lib/analytics';

export default function Contact() {
  const [emailCopied, setEmailCopied] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const data = contentData as ContentData;

  useEffect(() => {
    if (isInView) {
      trackSectionView('contact');
    }
  }, [isInView]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(data.profile.contact.email);
      setEmailCopied(true);
      trackContactInteraction('copy_email');
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  const handleEmailClick = () => {
    trackContactInteraction('email_click');
  };

  const handleLinkedInClick = () => {
    trackContactInteraction('linkedin');
    trackExternalLink('linkedin');
  };

  const handleGitHubClick = () => {
    trackContactInteraction('github');
    trackExternalLink('github');
  };

  return (
    <section id="contact" className="section-container bg-surface" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto text-center"
      >
        {/* Section Header */}
        <div className="mb-12">
          <p className="font-mono text-sm text-accent mb-4 tracking-wider uppercase">
            Get in Touch
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Let&apos;s build something together
          </h2>
          <p className="text-lg text-text-secondary">
            Recent M.S. in Computer Science graduate actively seeking full-time opportunities in
            Software Development/Engineering, Full-Stack Development, Backend/Frontend Engineering,
            and Web/App Development. Open to relocation.
          </p>
        </div>

        {/* Contact Options */}
        <div className="space-y-4 mb-12">
          {/* Email with Copy */}
          <div className="flex items-center justify-center gap-4 p-6 bg-background border border-border rounded-2xl">
            <Mail className="text-accent flex-shrink-0" size={24} />
            <a
              href={`mailto:${data.profile.contact.email}`}
              onClick={handleEmailClick}
              className="font-mono text-lg hover:text-accent transition-colors"
            >
              {data.profile.contact.email}
            </a>
            <button
              onClick={copyEmail}
              className="p-2 hover:bg-surface rounded-lg transition-colors group relative"
              aria-label="Copy email"
            >
              {emailCopied ? (
                <Check className="text-accent" size={20} />
              ) : (
                <Copy className="text-text-secondary group-hover:text-accent transition-colors" size={20} />
              )}

              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-background text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {emailCopied ? 'Copied!' : 'Copy email'}
              </span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={data.profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleGitHubClick}
              className="flex items-center gap-3 px-6 py-4 bg-background border border-border rounded-xl hover:border-accent transition-all group"
            >
              <Github className="text-text-secondary group-hover:text-accent transition-colors" size={20} />
              <span className="font-mono text-sm">GitHub</span>
            </a>

            <a
              href={data.profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLinkedInClick}
              className="flex items-center gap-3 px-6 py-4 bg-background border border-border rounded-xl hover:border-accent transition-all group"
            >
              <Linkedin className="text-text-secondary group-hover:text-accent transition-colors" size={20} />
              <span className="font-mono text-sm">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Availability Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-accent/10 border border-accent/20 rounded-full"
        >
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="font-mono text-sm text-accent">Actively seeking full-time roles</span>
        </motion.div>
      </motion.div>
    </section>
  );
}
