export default function Home() {
  return (
    <div className="font-sans text-foreground bg-background min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
               style={{
                 background:
                   "conic-gradient(from 90deg at 50% 50%, var(--accent-start), var(--accent-end), var(--accent-start))",
                 animation: "spinSlow 30s linear infinite"
               }}
          />
          <div className="absolute -bottom-48 -right-48 h-[560px] w-[560px] rounded-full opacity-20 blur-3xl"
               style={{
                 background:
                   "radial-gradient(ellipse at center, var(--accent-end), transparent 60%)"
               }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 bg-white/5 backdrop-blur">
                Campus marketplace • AI matching
              </span>
              <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight">
                Rally matches students and brands for elite campus campaigns
              </h1>
              <p className="mt-5 text-white/70 max-w-xl">
                Apply once with your resume and socials. Rally’s vector matching aligns
                your campus influence with brand campaign needs—so the best gigs find you.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a
                  href="/students/onboarding"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--accent-start), var(--accent-end))",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 4s linear infinite, pulseGlow 4s ease-in-out infinite"
                  }}
                >
                  Apply as Student
                </a>
                <a
                  href="/brands/onboarding"
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium border border-white/15 text-white hover:bg-white/5 transition"
                >
                  Find Student Ambassadors
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-6 text-center">
                <Stat label="Campaigns posted" value="5,000+" />
                <Stat label="Avg payout" value="$250+" />
                <Stat label="Colleges" value="300+" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl opacity-40 blur-2xl"
                   style={{
                     background:
                       "linear-gradient(90deg, var(--accent-start), var(--accent-end))"
                   }}
              />
              <div className="relative rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  Rally AI
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    "Energy drink launching needs frat social chairs.",
                    "New fashion app seeking 10 UCLA ambassadors.",
                    "Crypto wallet internship for econ/CS majors.",
                    "Gaming company pursuing campus tournament shoutouts.",
                    "Sustainable brand needs eco-conscious campus influencers",
                  ].map((line, i) => (
                    <ChatBubble key={i} text={line} index={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              title="Work with top brands"
              desc="Partner with startups and household names on launches, events, and on‑campus promos."
              Icon={() => (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-cyan-300">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" fill="currentColor"/>
                </svg>
              )}
            />
            <FeatureCard
              title="Earn serious payouts"
              desc="Transparent budgets. One‑click contracts and Stripe Connect payouts."
              Icon={() => (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-indigo-300">
                  <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm.5 5a1.5 1.5 0 00-3 0v1H8a1 1 0 100 2h1.5v4H8a1 1 0 100 2h1.5v1a1.5 1.5 0 003 0v-1H16a1 1 0 100-2h-3.5V9H16a1 1 0 100-2h-3.5V6z" fill="currentColor"/>
                </svg>
              )}
            />
            <FeatureCard
              title="Grow your influence"
              desc="Build a portfolio of campaigns. Boost your reputation with ratings and wins."
              Icon={() => (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-violet-300">
                  <path d="M3 13h4l3 7 4-14 3 7h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            />
          </div>
        </div>
      </section>

      {/* Opportunities Marquee */}
      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-0 md:px-6">
          <div className="relative overflow-hidden">
            <div className="flex gap-4 whitespace-nowrap will-change-transform" style={{ animation: "marquee 30s linear infinite" }}>
              {[...Array(2)].flatMap((_, loopIndex) => (
                opportunities.map((o, i) => (
                  <Opportunity key={`${loopIndex}-${i}`} {...o} />
                ))
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Matching Engine */}
      <section id="engine" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Vector matching that understands students and campaigns
            </h2>
            <p className="mt-5 text-white/70 max-w-xl">
              Rally embeds student profiles and campaign briefs into a shared vector space.
              We rank by cosine similarity and filter by campus, orgs, and budget to surface
              the most relevant matches.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl opacity-50 blur-2xl" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
            <div className="relative rounded-2xl border border-white/10 bg-[#0c0c12] p-5">
              <div className="text-xs text-white/50">engine.ts</div>
              <pre className="mt-3 overflow-auto rounded-lg bg-black/50 p-4 text-xs leading-relaxed text-white/80">
{`const studentEmbedding = embed({
  college: "Ohio State University",
  clubs: ["Delta Sigma Pi", "Block O"],
  socials: [{ platform: "TikTok", followers: 18000 }],
  interests: ["events", "sports", "food"],
});

const campaignEmbedding = embed({
  goal: "awareness",
  deliverables: ["TikTok video", "event promo"],
  target: { colleges: ["Ohio State University"], min_followers: 5000 },
});

const score = cosineSimilarity(studentEmbedding, campaignEmbedding);
// -> 0.87  (strong match)
`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Testimonial key={i} {...t} />
            ))}
          </div>
          <div className="mt-12 flex items-center justify-center">
            <a
              href="/students/onboarding"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white shadow-lg"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent-start), var(--accent-end))",
                backgroundSize: "200% 100%",
                animation: "shimmer 4s linear infinite, pulseGlow 4s ease-in-out infinite"
              }}
            >
              Apply today
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
            Rally · San Francisco, CA
          </div>
          <div className="flex items-center gap-6">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#engine" className="hover:text-white">Matching</a>
            <a href="#apply" className="hover:text-white">Apply</a>
          </div>
          <div>© {new Date().getFullYear()} Rally</div>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-white/70 mt-1">{label}</div>
    </div>
  );
}

function ChatBubble({ text, index }: { text: string; index: number }) {
  return (
    <div
      className="w-full rounded-xl border border-white/10 bg-white/10 p-3 text-sm"
      style={{ animation: `float 6s ease-in-out ${index * 0.2}s infinite` }}
    >
      {text}
    </div>
  );
}

function FeatureCard({ title, desc, Icon }: { title: string; desc: string; Icon: () => JSX.Element }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="absolute -inset-1 -z-10 rounded-2xl opacity-40 blur-2xl" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-white/10 flex items-center justify-center">
          <Icon />
        </div>
        <div>
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="mt-2 text-sm text-white/70">{desc}</p>
        </div>
      </div>
    </div>
  );
}

type OpportunityProps = {
  role: string;
  type: string;
  pay: string;
  brand: string;
};

function Opportunity({ role, type, pay, brand }: OpportunityProps) {
  return (
    <div className="mx-2 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
      <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{type}</span>
      <span className="font-medium">{role}</span>
      <span className="text-white/50">·</span>
      <span>{brand}</span>
      <span className="text-white/60">{pay}</span>
    </div>
  );
}

const opportunities: OpportunityProps[] = [
  { role: "TikTok Campus Ambassador", type: "Remote", pay: "$200/video", brand: "Spark Seltzer" },
  { role: "Event Promo Lead", type: "On‑Campus", pay: "$400/event", brand: "Arcade Energy" },
  { role: "IG Story Pack", type: "Remote", pay: "$150/post", brand: "StudyWise" },
  { role: "Launch Street Team", type: "On‑Campus", pay: "$25/hr", brand: "Nori Noodles" },
  { role: "Tabling Captain", type: "On‑Campus", pay: "$300/day", brand: "Luna Labs" },
  { role: "Giveaway Host", type: "Remote", pay: "$250/campaign", brand: "Atlas Finance" },
];

type TestimonialProps = { quote: string; name: string; title: string };

function Testimonial({ quote, name, title }: TestimonialProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <p className="text-white/80">“{quote}”</p>
      <div className="mt-4 text-sm text-white/60">{name} · {title}</div>
    </div>
  );
}

const testimonials: TestimonialProps[] = [
  {
    quote:
      "I applied once and had three brand intros by Friday. Payments were instant.",
    name: "Maya P.",
    title: "PR Chair, USC",
  },
  {
    quote:
      "The matching nailed our event launch. We filled the street team in 48 hours.",
    name: "Ben S.",
    title: "Growth Lead, CPG Startup",
  },
  {
    quote:
      "Finally a platform that understands campus orgs and real reach, not vanity metrics.",
    name: "Alexa R.",
    title: "President, Delta Sigma Pi",
  },
];
