'use client';

import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import contentData from '@/data/content.json';
import type { ContentData, MindsetSection } from '@/types/content';
import { trackSectionView } from '@/lib/analytics';

export default function HowIThink() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const data = contentData as ContentData;

  useEffect(() => {
    if (isInView) {
      trackSectionView('how-i-think');
    }
  }, [isInView]);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="how-i-think" className="section-container bg-surface" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section Header */}
        <div className="mb-16">
          <p className="font-mono text-sm text-accent mb-4 tracking-wider uppercase">
            Mindset & Approach
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            {data.mindset.title}
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl">
            How I approach technical decisions, debugging, and building systems.
            Click to expand each principle.
          </p>
        </div>

        {/* Mindset Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {data.mindset.sections.map((section: MindsetSection, index: number) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <button
                onClick={() => toggleExpand(section.id)}
                className="w-full p-6 bg-background border border-border rounded-2xl hover:border-accent transition-all duration-300 text-left"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed mb-4">
                      {section.description}
                    </p>

                    {/* Expanded Content */}
                    {expandedId === section.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-border"
                      >
                        <h4 className="font-mono text-sm font-bold mb-3 text-accent">
                          My Approach:
                        </h4>
                        <AnimatePresence>
                          <ul className="space-y-2">
                            {section.approach.map((step: string, idx: number) => (
                              <li key={idx} className="flex gap-3 text-text-secondary text-sm">
                                <span className="text-accent mt-1 font-bold">{idx + 1}.</span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </AnimatePresence>
                      </motion.div>
                    )}
                  </div>

                  {/* Expand Icon */}
                  <div className="flex-shrink-0 text-accent">
                    {expandedId === section.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 p-6 bg-background border border-border rounded-2xl"
        >
          <p className="text-text-secondary leading-relaxed">
            <span className="font-display font-bold text-text">Note:</span> These aren&apos;t rigid rules—they&apos;re
            heuristics that have worked well across different systems and teams. The specifics change based on
            context, but the underlying principles stay consistent: understand the constraints, make informed
            trade-offs, and optimize for long-term maintainability.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
