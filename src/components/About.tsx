'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import contentData from '@/data/content.json';
import type { ContentData } from '@/types/content';
import { trackSectionView } from '@/lib/analytics';

export default function About() {
  const data = contentData as ContentData;
  const { profile, education } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      trackSectionView('about');
    }
  }, [isInView]);

  return (
    <section id="about" className="section-container bg-surface" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section Header */}
        <div className="mb-12">
          <p className="font-mono text-sm text-accent mb-4 tracking-wider uppercase">
            About
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Engineering as informed trade-offs
          </h2>
        </div>

        {/* Main Content - Optimized Layout */}
        <div className="space-y-8">
          {/* Bio - Full Width */}
          <p className="text-lg text-text-secondary leading-relaxed">
            {profile.bio}
          </p>

          {/* 4-Column Grid for All Info */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Currently */}
            <div className="p-6 bg-background border border-border rounded-xl">
              <h3 className="font-display text-sm font-bold mb-3 text-primary uppercase tracking-wider">Currently</h3>
              <p className="text-text-secondary text-xs leading-relaxed">
                Recent M.S. in Computer Science graduate from Northeastern University (GPA: {education.gpa}),
                completed {education.graduationDate}. Actively seeking full-time opportunities in
                Full-Stack Engineering, Front-End Development, and Web Application Development.
              </p>
            </div>

            {/* Technical Interests */}
            <div className="p-6 bg-background border border-border rounded-xl">
              <h3 className="font-display text-sm font-bold mb-3 text-primary uppercase tracking-wider">Technical Interests</h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Modern frontend frameworks (React, Angular, Next.js), UI/UX design, component architecture,
                responsive design, API development, cloud-native systems, and building tools that
                improve both user experience and developer velocity.
              </p>
            </div>

            {/* Education */}
            <div className="p-6 bg-background border border-border rounded-xl">
              <h3 className="font-display text-sm font-bold mb-3 text-accent uppercase tracking-wider">Education</h3>
              <div className="space-y-3">
                {/* Master's */}
                <div>
                  <div className="font-mono text-xs text-accent">M.S. Computer Science</div>
                  <div className="text-xs text-text-secondary">Northeastern University</div>
                  <div className="text-xs text-text-secondary">GPA: 3.85/4.0 · Dec 2025</div>
                </div>
                {/* Bachelor's */}
                <div className="pt-2 border-t border-border">
                  <div className="font-mono text-xs text-accent">B.E. Electronics & Telecom</div>
                  <div className="text-xs text-text-secondary">University of Mumbai</div>
                  <div className="text-xs text-text-secondary">GPA: 9.31/10.0 · May 2021</div>
                </div>
              </div>
            </div>

            {/* Stats + Location Combined */}
            <div className="p-6 bg-background border border-border rounded-xl">
              <h3 className="font-display text-sm font-bold mb-3 text-secondary uppercase tracking-wider">Experience</h3>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-display font-bold text-accent">3+</div>
                  <div className="text-xs text-text-secondary">Years Professional</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-accent">150K+</div>
                  <div className="text-xs text-text-secondary">Users Supported</div>
                </div>
                <div className="pt-2 border-t border-border">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <div className="text-xs text-text-secondary">{profile.location}</div>
                  </div>
                  <div className="text-xs text-text-secondary mt-1">Open to relocation</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid - Full Width */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 bg-background border border-border rounded-xl hover:border-primary transition-colors">
            <h3 className="font-display text-sm font-bold mb-4 text-primary uppercase tracking-wider">Frontend & UI</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML/CSS', 'TailwindCSS', 'Angular', 'UI Patterns', 'Accessibility'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface border border-border rounded-full font-mono text-xs text-text-secondary hover:border-primary hover:text-primary transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 bg-background border border-border rounded-xl hover:border-accent transition-colors">
            <h3 className="font-display text-sm font-bold mb-4 text-accent uppercase tracking-wider">Backend & APIs</h3>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'Express', '.NET Core', 'C#', 'REST APIs', 'Microservices', 'Auth', 'Python', 'Django'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface border border-border rounded-full font-mono text-xs text-text-secondary hover:border-accent hover:text-accent transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 bg-background border border-border rounded-xl hover:border-secondary transition-colors">
            <h3 className="font-display text-sm font-bold mb-4 text-secondary uppercase tracking-wider">Cloud & Data</h3>
            <div className="flex flex-wrap gap-2">
              {['AWS', 'Azure', 'Docker', 'SQL Server', 'PostgreSQL', 'MongoDB', 'DynamoDB', 'OpenAI', 'LangChain'].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-surface border border-border rounded-full font-mono text-xs text-text-secondary hover:border-secondary hover:text-secondary transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
