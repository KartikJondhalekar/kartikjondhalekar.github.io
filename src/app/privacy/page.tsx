import Link from 'next/link';

export default function Privacy() {
  return (
    <main className="min-h-screen bg-background py-24 px-6">
      <article className="max-w-3xl mx-auto">
        <h1 className="font-display text-4xl font-bold mb-8">Privacy & Analytics</h1>
        
        <section className="prose prose-lg max-w-none space-y-6 text-text-secondary">
          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">What We Track</h2>
          <p>
            This website uses Plausible Analytics, a privacy-first, open-source analytics platform 
            that doesn&apos;t use cookies and doesn&apos;t collect personal data.
          </p>

          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">Why We Track</h2>
          <p>
            Analytics exists to inform iteration, not to collect vanity metrics. We track:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Page views and navigation patterns</li>
            <li>Which projects get the most engagement</li>
            <li>How users interact with project deep-dives</li>
            <li>Contact interaction patterns</li>
          </ul>
          <p>
            This data helps answer questions like: &ldquo;Do users read technical decisions or just skim summaries?&rdquo; 
            or &ldquo;Which projects drive the most GitHub clicks?&rdquo; These insights inform future improvements.
          </p>

          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">What We Don&apos;t Track</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Personal information (name, email, etc.)</li>
            <li>IP addresses (anonymized)</li>
            <li>Cross-site tracking</li>
            <li>Browser fingerprinting</li>
            <li>Any data that could identify individual users</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">Your Rights</h2>
          <p>
            Because we use Plausible and don&apos;t collect personal data:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>No cookies are set (GDPR compliant)</li>
            <li>No consent banner required (PECR compliant)</li>
            <li>You can opt out via browser extensions</li>
            <li>All data is aggregated and anonymous</li>
          </ul>

          <h2 className="font-display text-2xl font-bold text-text mt-8 mb-4">Technical Details</h2>
          <p>
            Plausible script: &lt;1KB, loaded asynchronously, no impact on page performance.
            Hosted in the EU, GDPR compliant, no data sold or shared with third parties.
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
