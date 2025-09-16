import Navigation from "../../components/Navigation";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main className="min-h-screen">
      {/* Background accents */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/3 w-[28rem] h-[28rem] bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[24rem] h-[24rem] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
      </div>

      {/* Hero */}
      <section className="px-6 pt-28 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-3">Pricing</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">Simple, transparent pricing for brands. Students join free.</p>
      </section>

      {/* Tiers */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6">
            <div className="inline-flex items-center gap-2 text-xs text-white/70 mb-2">
              <span className="bg-white/10 px-2 py-0.5 rounded-full">Starter</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Starter</h2>
            <p className="text-gray-300 text-sm mb-4">Great for testing a single campaign.</p>
            <ul className="text-sm text-gray-300 space-y-2 mb-6">
              <li>Up to 1 campaign</li>
              <li>Basic matching</li>
              <li>Email support</li>
            </ul>
            <div className="text-3xl font-bold mb-4">$99</div>
            <a href="/brands/onboarding" className="inline-block">
              <button className="btn-hover bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold">Get Started</button>
            </a>
          </div>

          <div className="relative glass rounded-2xl p-6 border border-cyan-400/30">
            <div className="absolute -inset-0.5 rounded-2xl opacity-20 blur-2xl" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 text-xs text-black bg-white px-2 py-0.5 rounded-full mb-2">
                Best value
              </div>
              <h2 className="text-xl font-semibold mb-2">Growth</h2>
              <p className="text-gray-300 text-sm mb-4">For brands running multiple campaigns.</p>
              <ul className="text-sm text-gray-300 space-y-2 mb-6">
                <li>Up to 5 campaigns</li>
                <li>Advanced filters</li>
                <li>Priority support</li>
              </ul>
              <div className="text-3xl font-bold mb-4">$399</div>
              <a href="/brands/onboarding" className="inline-block">
                <button className="btn-hover bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold">Choose Growth</button>
              </a>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="inline-flex items-center gap-2 text-xs text-white/70 mb-2">
              <span className="bg-white/10 px-2 py-0.5 rounded-full">Scale</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">Scale</h2>
            <p className="text-gray-300 text-sm mb-4">For agencies and large teams.</p>
            <ul className="text-sm text-gray-300 space-y-2 mb-6">
              <li>Unlimited campaigns</li>
              <li>Custom workflows</li>
              <li>Dedicated support</li>
            </ul>
            <div className="text-3xl font-bold mb-4">Custom</div>
            <a href="/brands/onboarding" className="inline-block">
              <button className="btn-hover bg-white text-black px-4 py-2 rounded-lg text-sm font-semibold">Talk to us</button>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto grid gap-4">
          <div className="glass rounded-xl p-5">
            <div className="font-semibold mb-1">How are students paid?</div>
            <div className="text-gray-300 text-sm">Stripe Connect handles payouts. Brands fund the campaign, students are paid on completion.</div>
          </div>
          <div className="glass rounded-xl p-5">
            <div className="font-semibold mb-1">Do you support campus targeting?</div>
            <div className="text-gray-300 text-sm">Yes—filter by college, orgs, and follower tiers for precision matching.</div>
          </div>
        </div>
      </section>
      </main>
    </div>
  );
}


