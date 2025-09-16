import Link from "next/link";
import Navigation from "../../components/Navigation";

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="min-h-screen">
      {/* Background accents */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -left-10 w-[28rem] h-[28rem] bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-10 w-[28rem] h-[28rem] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
      </div>

      {/* Hero */}
      <section className="px-6 pt-28 pb-10 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Platform</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Two experiences. One marketplace.
        </p>
      </section>

      {/* Panels */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">For Brands</h2>
            <p className="text-gray-300 text-sm mb-4">
              Create campaigns, define deliverables, and target by college, orgs, and reach.
            </p>
            <div className="flex gap-3">
              <Link href="/brands/onboarding" className="inline-block">
                <button className="btn-hover bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold">Get Started</button>
              </Link>
              <Link href="/brands/matching" className="inline-block">
                <button className="btn-hover bg-transparent border border-white/20 px-4 py-2 rounded-lg text-sm">See Matching</button>
              </Link>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">For Students</h2>
            <p className="text-gray-300 text-sm mb-4">
              Build your profile, connect socials, and apply to matched campaigns.
            </p>
            <div className="flex gap-3">
              <Link href="/students/onboarding" className="inline-block">
                <button className="btn-hover bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold">Join Now</button>
              </Link>
              <Link href="/students/matching" className="inline-block">
                <button className="btn-hover bg-transparent border border-white/20 px-4 py-2 rounded-lg text-sm">See Matches</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <Feature title="Vector Matching" desc="Profiles and campaigns live in shared vector space for precise results." />
          <Feature title="Filters that matter" desc="College, clubs, orgs, follower tiers, and timelines built‑in." />
          <Feature title="Payments + Contracts" desc="Stripe Connect payouts and transparent execution tracking." />
        </div>
      </section>

      {/* How it works strip */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          <Step title="Create" subtitle="Profiles & Campaigns" />
          <Step title="Match" subtitle="Cosine similarity + filters" />
          <Step title="Launch" subtitle="Deliverables & payout" />
        </div>
      </section>
      </main>
    </div>
  );
}

function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="glass rounded-xl p-6">
      <div className="text-lg font-semibold mb-1">{title}</div>
      <div className="text-gray-300 text-sm">{desc}</div>
    </div>
  );
}

function Step({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
      <div className="text-xl font-semibold">{title}</div>
      <div className="text-white/70 text-xs mt-1">{subtitle}</div>
    </div>
  );
}


