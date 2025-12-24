/**
 * Analytics utility using Plausible Analytics
 * 
 * Why Plausible?
 * - Privacy-first: No cookies, no personal data collection
 * - Lightweight: <1KB script, minimal performance impact
 * - Static-site compatible: Works with GitHub Pages
 * - Recognized in engineering teams: Modern, ethical analytics
 * 
 * Implementation Strategy:
 * - Events are explicit and intentionally tracked
 * - No automatic tracking beyond page views
 * - All events include contextual metadata
 * - Designed to inform iteration, not collect vanity metrics
 */

export interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

class Analytics {
  private isEnabled: boolean = false;

  constructor() {
    // Only enable in production
    this.isEnabled = typeof window !== 'undefined' && 
                     process.env.NODE_ENV === 'production';
  }

  /**
   * Track a custom event
   * @param eventName - Descriptive event name (e.g., "project_deep_dive_opened")
   * @param props - Optional metadata (e.g., { project: "ask-chinook" })
   */
  trackEvent(eventName: string, props?: Record<string, string | number | boolean>) {
    if (!this.isEnabled) {
      console.log('[Analytics Dev]', eventName, props);
      return;
    }

    if (typeof window !== 'undefined' && (window as Window & { plausible?: unknown }).plausible) {
      ((window as Window & { plausible?: (event: string, options: { props?: Record<string, string | number | boolean> }) => void }).plausible)?.(eventName, { props });
    }
  }

  /**
   * Track page view (automatic with Plausible script)
   * Only call this manually for SPA route changes
   */
  trackPageView(path?: string) {
    if (!this.isEnabled) {
      console.log('[Analytics Dev] Page view:', path || window.location.pathname);
      return;
    }

    if (typeof window !== 'undefined' && (window as Window & { plausible?: unknown }).plausible) {
      ((window as Window & { plausible?: (event: string, options: { props?: { path: string } }) => void }).plausible)?.('pageview', { 
        props: { path: path || window.location.pathname } 
      });
    }
  }
}

// Singleton instance
export const analytics = new Analytics();

/**
 * Convenience wrapper for common events
 */
export const trackProjectOpen = (projectId: string) => {
  analytics.trackEvent('project_opened', { project: projectId });
};

export const trackProjectDeepDive = (projectId: string) => {
  analytics.trackEvent('project_deep_dive_opened', { project: projectId });
};

export const trackExternalLink = (type: 'github' | 'demo' | 'linkedin' | 'email', project?: string) => {
  analytics.trackEvent('external_link_clicked', { 
    link_type: type,
    ...(project && { project })
  });
};

export const trackSectionView = (section: string) => {
  analytics.trackEvent('section_viewed', { section });
};

export const trackContactInteraction = (method: 'email_click' | 'copy_email' | 'linkedin' | 'github') => {
  analytics.trackEvent('contact_interaction', { method });
};

export const trackThemeToggle = (theme: 'light' | 'dark') => {
  analytics.trackEvent('theme_toggled', { theme });
};

/**
 * HOW TO INTERPRET ANALYTICS
 * 
 * Key Metrics to Track:
 * 1. Engagement Patterns
 *    - Which projects get the most opens?
 *    - Do users read deep-dives or just skim summaries?
 *    - How far do users scroll on each page?
 * 
 * 2. Project Interest
 *    - "project_deep_dive_opened" vs. "project_opened" ratio
 *    - "View Code" vs "Live Demo" preference
 *    - Which projects drive external link clicks?
 * 
 * 3. Content Effectiveness
 *    - Time spent on "How I Think" section
 *    - Section view sequences (do users read About before Projects?)
 *    - Bounce rate on landing page
 * 
 * 4. Conversion Signals
 *    - Contact interaction rate
 *    - GitHub/LinkedIn click-through rate
 *    - Returning visitor patterns
 * 
 * EXAMPLE INSIGHTS & ITERATIONS:
 * 
 * Insight: "Users open projects but don't view deep-dives"
 * → Action: Make deep-dive CTAs more prominent
 * → Action: Add preview of technical decisions in project card
 * 
 * Insight: "High scroll depth on 'How I Think' section"
 * → Action: Expand this section with more examples
 * → Action: Add similar mindset sections to project deep-dives
 * 
 * Insight: "Users click 'View Code' more than 'Live Demo'"
 * → Action: Prioritize code quality and README documentation
 * → Action: Add architecture diagrams to GitHub repos
 * 
 * Insight: "Low contact interaction rate"
 * → Action: Simplify contact CTA
 * → Action: Add availability status or preferred contact method
 * 
 * ETHICS & PERFORMANCE:
 * - Plausible script loads async, no blocking
 * - No cookies, no localStorage, no fingerprinting
 * - All data is aggregated, not user-specific
 * - Users can opt out via browser extensions (Plausible respects Do Not Track)
 * - No impact on Lighthouse scores (tested <1KB, async load)
 */
