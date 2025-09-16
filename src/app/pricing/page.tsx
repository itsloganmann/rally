export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* Background accents */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 left-1/3 w-[28rem] h-[28rem] bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[24rem] h-[24rem] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
      </div>

      {/* Hero */}
      <section className="px-6 pt-28 pb-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Pricing</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">Simple, transparent pricing for brands. Students join free.</p>
      </section>

      {/* Tiers */}
      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Starter</h2>
            <p className="text-gray-300 text-sm mb-4">Great for testing a single campaign.</p>
            <ul className="text-sm text-gray-300 space-y-2 mb-6">
              <li>Up to 1 campaign</li>
              <li>Basic matching</li>
              <li>Email support</li>
            </ul>
            <div className="text-3xl font-bold mb-2">$99</div>
          </div>

          <div className="glass rounded-2xl p-6 border border-cyan-400/30">
            <h2 className="text-xl font-semibold mb-2">Growth</h2>
            <p className="text-gray-300 text-sm mb-4">For brands running multiple campaigns.</p>
            <ul className="text-sm text-gray-300 space-y-2 mb-6">
              <li>Up to 5 campaigns</li>
              <li>Advanced filters</li>
              <li>Priority support</li>
            </ul>
            <div className="text-3xl font-bold mb-2">$399</div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-2">Scale</h2>
            <p className="text-gray-300 text-sm mb-4">For agencies and large teams.</p>
            <ul className="text-sm text-gray-300 space-y-2 mb-6">
              <li>Unlimited campaigns</li>
              <li>Custom workflows</li>
              <li>Dedicated support</li>
            </ul>
            <div className="text-3xl font-bold mb-2">Custom</div>
          </div>
        </div>
      </section>
    </main>
  );
}


