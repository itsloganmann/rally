"use client";

import { useEffect, useMemo, useState } from "react";

type Deal = {
  id: string;
  title: string;
  brand: string;
  location: "Remote" | "On‑Campus";
  notes: string;
  campusFilter?: string[]; // school names
  clubHints?: string[];
  payout: string;
};

type Profile = {
  name?: string;
  school?: string;
  clubs?: string[];
  interests?: string[];
  persona?: string;
  influencerBadge?: string;
};

const DEMO_DEALS: Deal[] = [
  {
    id: "1",
    title: "\"Campus Launch Tour\" – Energy drink launch → looking for frat social chairs at USC.",
    brand: "LaunchPad Energy ⚡️",
    location: "On‑Campus",
    notes: `Deliverables: 1 TikTok video promoting a sponsored party; host one branded event during the semester; distribute product samples at the event.\nWhy it matches: Directly targets Social Chair role and Nightlife interest.`,
    campusFilter: ["University of Southern California"],
    clubHints: ["IFC Fraternity"],
    payout: "$750 + Free Product",
  },
  {
    id: "2",
    title: "\"Student Ambassador Program\" – New investing app → seeking ambassadors in top business programs.",
    brand: "PortfolioPal Investing 📈",
    location: "On‑Campus",
    notes: `Deliverables: 2 Instagram story series with unique sign-up link; on-campus promotion within the business school.\nWhy it matches: Aligns with Business major, Investment Club affiliation, and Entrepreneurship interest.`,
    clubHints: ["Finance", "Entrepreneurship"],
    payout: "$400 + Performance Bonus per sign-up",
  },
  {
    id: "3",
    title: "\"Fall Collection Drop\" – Men's fashion brand → micro-influencers for our new apparel line.",
    brand: "Coastal Threads Co. 👕",
    location: "Remote",
    notes: `Deliverables: 1 Instagram grid post; 1 TikTok \"Get Ready With Me\" video.\nWhy it matches: Taps into Fashion interest and leverages TikTok micro‑influencer status.`,
    payout: "$250 + Free Apparel ($300 value)",
  },
];

export default function StudentDashboard() {
  const [applied, setApplied] = useState<Record<string, boolean>>({});
  const [profile, setProfile] = useState<Profile>({});
  const [query, setQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState<"All" | "Remote" | "On‑Campus">("All");
  const [sortBy, setSortBy] = useState<"relevance" | "payout">("relevance");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("rally_student_profile");
      if (raw) setProfile(JSON.parse(raw));
    } catch {}
  }, []);

  const deals = useMemo(() => filterAndSortDeals(DEMO_DEALS, profile, query, locationFilter, sortBy), [profile, query, locationFilter, sortBy]);

  return (
    <div className="font-sans text-foreground bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-24">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Your Matched Opportunities{profile.name ? `, ${profile.name.split(" ")[0]}` : ""}</h1>
            <p className="text-white/70">Curated roles based on your school, clubs, and social reach.</p>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
            Persona: <span className="text-white">{profile.persona || "—"}</span> · Badge: <span className="text-white">{profile.influencerBadge || "—"}</span>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search brand, title, keywords..."
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
          />
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value as typeof locationFilter)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="All">All locations</option>
            <option value="Remote">Remote</option>
            <option value="On‑Campus">On‑Campus</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="payout">Sort: Highest payout</option>
          </select>
        </div>

        {/* Reputation
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <ReputationCard title="Verified .edu" active={true} />
          <ReputationCard title="First campaign completed" active={false} />
          <ReputationCard title="5-star rating" active={false} />
        </div> */}

        {/* Deals */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {deals.length === 0 && (
            <div className="md:col-span-2 rounded-2xl border border-dashed border-white/10 bg-white/5 p-10 text-center">
              <div className="text-lg font-medium">No opportunities match your filters (yet)</div>
              <div className="mt-2 text-sm text-white/70">Try clearing search or switching location to "All".</div>
            </div>
          )}
          {deals.map((d) => (
            <div key={d.id} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="absolute -inset-1 -z-10 rounded-2xl opacity-30 blur-2xl" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-white/60">{d.brand}</div>
                  <div className="text-lg font-medium">{d.title}</div>
                  <div className="mt-1 flex items-center gap-2 text-sm text-white/60">
                    <span className="rounded-full bg-white/10 px-2 py-0.5">{d.location}</span>
                    <span>·</span>
                    <span className="text-white/70">{d.payout}</span>
                  </div>
                </div>
                <button
                  onClick={() => setApplied((a) => ({ ...a, [d.id]: true }))}
                  disabled={!!applied[d.id]}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                  style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}
                >
                  {applied[d.id] ? "Applied" : "Apply"}
                </button>
              </div>
              <div className="mt-4 text-sm text-white/80">{d.notes}</div>
              {(d.clubHints?.length || d.campusFilter?.length) && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {(d.campusFilter || []).map((c) => (
                    <span key={c} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">{c}</span>
                  ))}
                  {(d.clubHints || []).map((c) => (
                    <span key={c} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/70">{c}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReputationCard({ title, active }: { title: string; active: boolean }) {
  return (
    <div className={`rounded-2xl border border-white/10 p-5 ${active ? "bg-white/10" : "bg-white/5"}`}>
      <div className="flex items-center gap-2">
        <div className={`h-2.5 w-2.5 rounded-full ${active ? "bg-emerald-400" : "bg-white/20"}`} />
        <div className="text-sm text-white/80">{title}</div>
      </div>
    </div>
  );
}

function filterAndSortDeals(
  deals: Deal[],
  profile: Profile,
  query: string,
  location: "All" | "Remote" | "On‑Campus",
  sortBy: "relevance" | "payout"
): Deal[] {
  const text = query.trim().toLowerCase();
  const hasSchool = !!profile.school;
  const hasClubs = !!(profile.clubs && profile.clubs.length);
  const filtered = deals.filter((d) => {
    const campusOk = !d.campusFilter?.length || !hasSchool || (profile.school && d.campusFilter.includes(profile.school));
    const clubOk = !d.clubHints?.length || !hasClubs || (profile.clubs || []).some((c) => d.clubHints?.some((h) => c.toLowerCase().includes(h.toLowerCase())));
    const locOk = location === "All" || d.location === location;
    const textOk = !text || `${d.title} ${d.brand} ${d.notes}`.toLowerCase().includes(text);
    return campusOk && clubOk && locOk && textOk;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "payout") {
      const ap = extractPayoutNumber(a.payout);
      const bp = extractPayoutNumber(b.payout);
      return bp - ap;
    }
    // relevance: prefer campus + club matches implicitly; keep input order
    return 0;
  });

  return sorted;
}

function extractPayoutNumber(payout: string): number {
  const match = payout.replace(/[,\s]/g, "").match(/\$?(\d+(?:\.\d+)?)/);
  return match ? Number(match[1]) : 0;
}


