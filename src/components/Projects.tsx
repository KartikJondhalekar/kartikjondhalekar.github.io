'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, Github, X, ChevronRight } from 'lucide-react';
import contentData from '@/data/content.json';
import type { Project, ContentData } from '@/types/content';
import { trackProjectOpen, trackProjectDeepDive, trackExternalLink, trackSectionView } from '@/lib/analytics';

const categories = [
  { id: 'all', label: 'All Projects', color: 'accent' },
  { id: 'enterprise', label: 'Enterprise', color: 'primary' },
  { id: 'ai', label: 'AI/LLM', color: 'secondary' },
  { id: 'cloud', label: 'Cloud', color: 'accent' },
  { id: 'fullstack', label: 'Full-Stack', color: 'primary' },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAdditional, setShowAdditional] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const data = contentData as ContentData;

  useEffect(() => {
    if (isInView) {
      trackSectionView('projects');
    }
  }, [isInView]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    trackProjectOpen(project.id);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  // Filter projects by category
  const visibleProjects = data.projects.filter((p: Project) => p.visible);
  const filteredProjects = activeCategory === 'all'
    ? visibleProjects
    : visibleProjects.filter((p: Project) => p.category === activeCategory);

  return (
    <section id="projects" className="section-container" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Section Header */}
        <div className="mb-12">
          <p className="font-mono text-sm text-accent mb-4 tracking-wider uppercase">
            Selected Work
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Projects that show how I think
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mb-8">
            Each project includes the problem context, technical decisions, trade-offs made,
            and what I&apos;d improve next. Click any project for a deep-dive.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${activeCategory === category.id
                  ? 'bg-accent text-background'
                  : 'bg-surface border border-border text-text-secondary hover:border-accent hover:text-accent'
                  }`}
              >
                {category.label}
                {category.id === 'all' && (
                  <span className="ml-2 opacity-60">({visibleProjects.length})</span>
                )}
                {category.id !== 'all' && (
                  <span className="ml-2 opacity-60">
                    ({visibleProjects.filter((p: Project) => p.category === category.id).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid - 2x4 Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project: Project, index: number) => (
            <motion.button
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 }
              }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handleProjectClick(project)}
              className="group text-left"
            >
              <div className="relative h-full p-6 bg-surface border border-border rounded-2xl hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden flex flex-col">
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-xl" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {project.title}
                      </h3>
                      <span className="inline-block px-2 py-1 bg-accent/10 border border-accent/30 rounded text-accent font-mono text-xs group-hover:bg-accent/20 group-hover:border-accent transition-all">
                        {project.domain}
                      </span>
                    </div>
                    <ChevronRight className="text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" size={20} />
                  </div>

                  {/* Subtitle */}
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {project.subtitle}
                  </p>

                  {/* Summary */}
                  <p className="text-text-secondary text-sm mb-4 line-clamp-3 flex-grow">
                    {project.summary}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies.slice(0, 4).map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-background border border-border rounded-full font-mono text-xs text-text-secondary group-hover:border-primary/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 font-mono text-xs text-text-secondary">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* No Results Message */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-text-secondary text-lg">
              No projects found in this category.
            </p>
          </motion.div>
        )}

        {/* Additional Projects Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <button
            onClick={() => setShowAdditional(!showAdditional)}
            className="w-full p-6 bg-surface border border-border rounded-2xl hover:border-accent transition-all text-left group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-bold mb-2 group-hover:text-accent transition-colors">
                  Additional Projects
                </h3>
                <p className="text-text-secondary text-sm">
                  {data.additionalProjects.enterprise.length + data.additionalProjects.academic.length} more enterprise and academic projects
                </p>
              </div>
              <ChevronRight className={`text-accent transition-transform ${showAdditional ? 'rotate-90' : ''}`} />
            </div>
          </button>

          {showAdditional && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 space-y-8"
            >
              {/* Enterprise Projects */}
              <div>
                <h4 className="font-display text-lg font-bold mb-4">Additional Enterprise Systems</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.additionalProjects.enterprise.map((project) => (
                    <div key={project.id} className="p-4 bg-surface border border-border rounded-xl hover:border-accent transition-colors">
                      <h5 className="font-display font-bold mb-2">{project.title}</h5>
                      <p className="text-text-secondary text-sm mb-3 line-clamp-2">{project.summary}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-background border border-border rounded-full font-mono text-xs text-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Academic Projects */}
              <div>
                <h4 className="font-display text-lg font-bold mb-4">Additional Academic Projects</h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.additionalProjects.academic.map((project) => (
                    <div key={project.id} className="p-4 bg-surface border border-border rounded-xl hover:border-accent transition-colors">
                      <h5 className="font-display font-bold mb-2">{project.title}</h5>
                      <p className="text-text-secondary text-sm mb-3 line-clamp-2">{project.summary}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-background border border-border rounded-full font-mono text-xs text-text-secondary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Project Deep-Dive Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.stopPropagation();
                trackProjectDeepDive(selectedProject.id);
              }}
              className="relative w-full max-w-4xl bg-background rounded-2xl shadow-2xl my-8"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 hover:bg-surface rounded-lg transition-colors z-10"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>

              <div className="p-8 md:p-12 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                    {selectedProject.title}
                  </h2>
                  <p className="text-xl text-text-secondary mb-6">
                    {selectedProject.subtitle}
                  </p>

                  {/* Links */}
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.github && (
                      <>
                        {Array.isArray(selectedProject.github) ? (
                          selectedProject.github.map((link: string, idx: number) => (
                            <a
                              key={idx}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => trackExternalLink('github', selectedProject.id)}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg hover:border-accent transition-colors font-mono text-sm"
                            >
                              <Github size={16} />
                              {(Array.isArray(selectedProject.github) && selectedProject.github.length > 1) ? `Repository ${idx + 1}` : 'View Code'}                            </a>
                          ))
                        ) : (
                          <a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackExternalLink('github', selectedProject.id)}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg hover:border-accent transition-colors font-mono text-sm"
                          >
                            <Github size={16} />
                            View Code
                          </a>
                        )}
                      </>
                    )}
                    {selectedProject.demo && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackExternalLink('demo', selectedProject.id)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-background rounded-lg hover:bg-accent/90 transition-colors font-mono text-sm"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h3 className="font-display text-lg font-bold mb-3">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-surface border border-border rounded-full font-mono text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem */}
                <div className="mb-8">
                  <h3 className="font-display text-lg font-bold mb-3">Problem</h3>
                  <p className="text-text-secondary leading-relaxed">
                    {selectedProject.problem}
                  </p>
                </div>

                {/* Constraints */}
                <div className="mb-8">
                  <h3 className="font-display text-lg font-bold mb-3">Constraints</h3>
                  <ul className="space-y-2">
                    {selectedProject.constraints.map((constraint, idx) => (
                      <li key={idx} className="flex gap-3 text-text-secondary">
                        <span className="text-accent mt-1.5">▪</span>
                        <span>{constraint}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Decisions */}
                <div className="mb-8">
                  <h3 className="font-display text-lg font-bold mb-4">Key Technical Decisions</h3>
                  <div className="space-y-6">
                    {selectedProject.decisions.map((decision, idx) => (
                      <div key={idx} className="p-4 bg-surface rounded-lg border border-border">
                        <h4 className="font-mono text-sm font-bold mb-2">{decision.decision}</h4>
                        <p className="text-text-secondary text-sm leading-relaxed">
                          {decision.rationale}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture */}
                <div className="mb-8">
                  <h3 className="font-display text-lg font-bold mb-3">Architecture</h3>
                  <p className="text-text-secondary mb-4 leading-relaxed">
                    {selectedProject.architecture.overview}
                  </p>
                  <div className="p-4 bg-surface rounded-lg border border-border">
                    <h4 className="font-mono text-sm font-bold mb-3">Components</h4>
                    <ul className="space-y-2">
                      {selectedProject.architecture.components.map((component, idx) => (
                        <li key={idx} className="flex gap-3 text-text-secondary text-sm">
                          <span className="text-accent mt-1">▪</span>
                          <span>{component}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="font-mono text-sm font-bold mb-2">Data Flow</h4>
                      <p className="text-text-secondary text-sm font-mono">
                        {selectedProject.architecture.dataFlow}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Outcomes */}
                <div className="mb-8">
                  <h3 className="font-display text-lg font-bold mb-3">Outcomes</h3>
                  <ul className="space-y-2">
                    {selectedProject.outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex gap-3 text-text-secondary">
                        <span className="text-accent mt-1.5">✓</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Future Improvements */}
                <div>
                  <h3 className="font-display text-lg font-bold mb-3">What I&apos;d Improve Next</h3>
                  <ul className="space-y-2">
                    {selectedProject.improvements.map((improvement, idx) => (
                      <li key={idx} className="flex gap-3 text-text-secondary">
                        <span className="text-accent mt-1.5">→</span>
                        <span>{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}