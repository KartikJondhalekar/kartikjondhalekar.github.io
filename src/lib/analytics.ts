/**
 * Analytics utility using Google Analytics (GA4)
 * 
 * Why Google Analytics?
 * - Industry standard with comprehensive features
 * - Free tier with generous limits
 * - Detailed user behavior insights
 * - Integration with Google tools
 * 
 * Implementation Strategy:
 * - Events are explicit and intentionally tracked
 * - Uses GA4 event model (recommended events + custom)
 * - All events include contextual metadata
 * - Designed to inform iteration, not collect vanity metrics
 */

export interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

// Declare gtag types
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
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

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, props);
    }
  }

  /**
   * Track page view (automatic with GA script)
   * Only call this manually for SPA route changes
   */
  trackPageView(path?: string) {
    if (!this.isEnabled) {
      console.log('[Analytics Dev] Page view:', path || window.location.pathname);
      return;
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: path || window.location.pathname,
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
 * HOW TO INTERPRET GOOGLE ANALYTICS
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
 * Insight: "High time on 'How I Think' section"
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
 * SETUP INSTRUCTIONS:
 * 1. Go to https://analytics.google.com
 * 2. Create a new GA4 property
 * 3. Get your Measurement ID (starts with G-)
 * 4. Replace 'G-XXXXXXXXXX' in src/app/layout.tsx with your ID
 * 5. Deploy and verify data appears in GA dashboard (within 24 hours)
 */