import Navigation from "../../components/Navigation";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
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

      {/* Mission */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto glass rounded-2xl p-6 border border-white/10">
          <h2 className="text-xl font-semibold mb-2">Our mission</h2>
          <p className="text-gray-300 text-sm">
            Make campus collaboration effortless. We help brands launch high‑signal, local campaigns
            by connecting with credible student ambassadors—measured by organizations, roles, and real engagement.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="glass rounded-xl p-6">
            <div className="text-sm text-white/70 mb-2">Step 1</div>
            <h3 className="font-semibold mb-1">Create profiles</h3>
            <p className="text-gray-300 text-sm">Students add colleges, orgs, and socials. Brands set goals and deliverables.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-sm text-white/70 mb-2">Step 2</div>
            <h3 className="font-semibold mb-1">AI Matching</h3>
            <p className="text-gray-300 text-sm">Embeddings align campaign briefs with student vectors via cosine similarity.</p>
          </div>
          <div className="glass rounded-xl p-6">
            <div className="text-sm text-white/70 mb-2">Step 3</div>
            <h3 className="font-semibold mb-1">Launch + payout</h3>
            <p className="text-gray-300 text-sm">Contracts, deliverables, and Stripe Connect payouts—tracked end‑to‑end.</p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Avg payout" value="$250+" />
          <StatCard label="Active campaigns" value="400+" />
          <StatCard label="Campuses" value="300+" />
          <StatCard label="Match success" value="92%" />
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16 text-center">
        <a
          href="/platform"
          className="inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-semibold text-black bg-white btn-hover"
        >
          Explore the platform
        </a>
      </section>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-5 text-center">
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="text-white/70 text-xs uppercase tracking-wide">{label}</div>
    </div>
  );
}


