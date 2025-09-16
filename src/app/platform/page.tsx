import Link from "next/link";

export default function PlatformPage() {
  return (
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
      <section className="px-6 pb-16">
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
    </main>
  );
}


