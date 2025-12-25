import Link from 'next/link';

export default function Privacy() {
  return (
    <main className="min-h-screen bg-background py-24 px-6">
      <article className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-8">Privacy & Analytics</h1>

        <section className="prose prose-lg max-w-none space-y-6 text-text-secondary">
          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">What We Track</h2>
          <p>
            This website uses Google Analytics (GA4) to understand how visitors interact with the site.
            This helps improve content and user experience.
          </p>

          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">Why We Track</h2>
          <p>
            Analytics exists to inform iteration and improve the site. We track:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Page views and navigation patterns</li>
            <li>Which projects get the most engagement</li>
            <li>How users interact with project deep-dives</li>
            <li>Contact interaction patterns</li>
            <li>General demographics and interests (aggregated)</li>
          </ul>
          <p>
            This data helps answer questions like: &ldquo;Do users read technical decisions or just skim summaries?&rdquo;
            or &ldquo;Which projects drive the most GitHub clicks?&rdquo; These insights inform future improvements.
          </p>

          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">What We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pages visited and time spent</li>
            <li>Geographic location (city/country level)</li>
            <li>Device type and browser information</li>
            <li>Referring websites</li>
            <li>Custom events (project clicks, contact interactions)</li>
          </ul>
          <p>
            Google Analytics uses cookies to track sessions and user behavior across visits.
          </p>

          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">Your Privacy Rights</h2>
          <p>
            You have control over your data:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Opt out using browser extensions (e.g., Google Analytics Opt-out)</li>
            <li>Enable Do Not Track in your browser settings</li>
            <li>Use privacy-focused browsers (Firefox, Brave) that block trackers</li>
            <li>Clear cookies to remove tracking data</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">Data Retention</h2>
          <p>
            Google Analytics data is retained according to Google&apos;s policies:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>User-level data: 14 months (default)</li>
            <li>Aggregated reports: Indefinitely</li>
            <li>IP addresses: Anonymized automatically</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">Third-Party Sharing</h2>
          <p>
            Analytics data is processed by Google and subject to their privacy policy.
            No personal data is shared with other third parties.
          </p>

          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">Contact</h2>
          <p>
            Questions about privacy or analytics? Email me at{' '}
            <a href="mailto:jondhalekar.k@northeastern.edu" className="text-accent hover:underline">
              jondhalekar.k@northeastern.edu
            </a>
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-border">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-accent hover:underline font-mono text-sm"
          >
            ← Back to portfolio
          </Link>
        </div>
      </article>
    </main>
  );
}