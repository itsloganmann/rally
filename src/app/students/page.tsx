export default function StudentLanding() {
  return (
    <div className="font-sans text-foreground bg-background min-h-screen">
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "conic-gradient(from 90deg at 50% 50%, var(--accent-start), var(--accent-end), var(--accent-start))",
              animation: "spinSlow 30s linear infinite",
            }}
          />
          <div
            className="absolute -bottom-48 -right-48 h-[560px] w-[560px] rounded-full opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(ellipse at center, var(--accent-end), transparent 60%)",
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-5xl px-6 pt-28 pb-24 text-center">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
            Turn your campus clout into brand deals.
          </h1>
          <p className="mt-5 text-white/70 max-w-2xl mx-auto">
            Get paid to promote launches, events, and products at your school. Apply once—Rally’s
            AI matches your clubs, roles, and socials with the right campaigns.
          </p>
          <div className="mt-10 flex items-center justify-center">
            <a
              href="/students/onboarding"
              className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium text-white shadow-lg"
              style={{
                background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))",
                backgroundSize: "200% 100%",
                animation: "shimmer 4s linear infinite, pulseGlow 4s ease-in-out infinite",
              }}
            >
              Get Started
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">
            <LandingStat label="Avg payout" value="$250+" />
            <LandingStat label="Active campaigns" value="400+" />
            <LandingStat label="Campuses" value="300+" />
          </div>
        </div>
      </section>
    </div>
  );
}

function LandingStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur text-center">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-white/70 mt-1">{label}</div>
    </div>
  );
}


