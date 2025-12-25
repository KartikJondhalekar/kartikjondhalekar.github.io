/**
 * Environment Variables Utility
 * 
 * Centralized access to environment variables with fallbacks
 */

export const env = {
  // Google Analytics
  gaId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',

  // Contact Information
  email: process.env.NEXT_PUBLIC_EMAIL || 'jondhalekar.k@northeastern.edu',
  phone: process.env.NEXT_PUBLIC_PHONE || '(857) 294-5334',
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/KartikJondhalekar',
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://www.linkedin.com/in/kartik-jondhalekar/',

  // Site Configuration
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://kartikjondhalekar.github.io',

  // Feature Flags
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
} as const;

/**
 * Validate required environment variables
 * Call this at build time to ensure all required vars are set
 */
export function validateEnv() {
  const required = {
    'NEXT_PUBLIC_GA_MEASUREMENT_ID': env.gaId,
  };

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0 && env.isProduction) {
    console.warn(
      `Warning: Missing environment variables in production: ${missing.join(', ')}\n` +
      'Analytics may not work correctly.'
    );
  }
}