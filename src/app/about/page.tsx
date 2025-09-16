export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Background accents */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
      </div>

      {/* Hero */}
      <section className="px-6 pt-28 pb-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Built for authentic campus influence
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Rally’s matching engine pairs brand campaigns with students who have real reach
          across colleges, clubs, and communities.
        </p>
      </section>

      {/* Content */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold mb-2">AI Matching</h3>
            <p className="text-gray-300 text-sm">Embeddings align campaign goals with student profiles for high‑fit matches.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold mb-2">Zero Friction</h3>
            <p className="text-gray-300 text-sm">Simple onboarding for both brands and students with clear deliverables.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <h3 className="font-semibold mb-2">Payouts</h3>
            <p className="text-gray-300 text-sm">Stripe Connect for secure payments and transparent tracking.</p>
          </div>
        </div>
      </section>
    </main>
  );
}


