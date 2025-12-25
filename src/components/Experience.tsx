'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import contentData from '@/data/content.json';
import type { ContentData, Experience as ExperienceType } from '@/types/content';
import { trackSectionView } from '@/lib/analytics';

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const data = contentData as ContentData;

  useEffect(() => {
    if (isInView) {
      trackSectionView('experience');
    }
  }, [isInView]);

  return (
    <section id="experience" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-sm text-accent mb-4 tracking-wider uppercase">
            Experience
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Where I&apos;ve built things that matter
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-12">
          {data.experience.map((exp: ExperienceType, index: number) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative pl-8 border-l-2 border-accent"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-accent rounded-full border-4 border-background" />

              {/* Content */}
              <div>
                <div className="mb-4">
                  <h3 className="font-display text-2xl font-bold mb-2">{exp.role}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-text-secondary">
                    <span className="font-mono text-sm">{exp.company}</span>
                    <span className="text-accent">•</span>
                    <span className="font-mono text-sm">{exp.location}</span>
                    <span className="text-accent">•</span>
                    <span className="font-mono text-sm">{exp.period}</span>
                  </div>
                </div>

                {/* Impact Points */}
                <div className="space-y-3">
                  {exp.impact.map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-3">
                      <span className="text-accent mt-1.5">▪</span>
                      <p className="text-text-secondary leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative pl-8 border-l-2 border-accent"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-accent rounded-full border-4 border-background" />

            {/* Content */}
            <div>
              <div className="mb-4">
                <h3 className="font-display text-2xl font-bold mb-2">{data.education.degree}</h3>
                <div className="flex flex-wrap items-center gap-3 text-text-secondary">
                  <span className="font-mono text-sm">{data.education.school}</span>
                  <span className="text-accent">•</span>
                  <span className="font-mono text-sm">{data.education.location}</span>
                  <span className="text-accent">•</span>
                  <span className="font-mono text-sm">GPA: {data.education.gpa}</span>
                </div>
              </div>
              <p className="text-text-secondary">
                Graduated: {data.education.graduationDate}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
