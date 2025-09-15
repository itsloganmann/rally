"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Student = {
  id: string;
  name: string;
  college: string;
  year?: string;
  major?: string;
  socials: { platform: string; handle?: string; followers?: number; notes?: string }[];
  affiliations: string[];
  interests: string[];
  matchStrength: number; // 0..1
};

const STUDENTS: Student[] = [
  {
    id: "1",
    name: "Priya Sharma",
    college: "Stanford University",
    year: "Senior",
    major: "Computer Science (AI/ML track)",
    affiliations: [
      "Project Lead, Stanford AI Society (SAIS)",
      "Member, Stanford Women in CS (WICS)",
    ],
    socials: [
      { platform: "X/Twitter", handle: "@priyaAI", followers: 4800, notes: "Research paper threads" },
      { platform: "LinkedIn", handle: "Priya Sharma", followers: 2100 },
    ],
    interests: ["Machine Learning", "Cloud Computing", "Open Source"],
    matchStrength: 0.95,
  },
  {
    id: "2",
    name: "Ben Carter",
    college: "UC Berkeley",
    year: "Junior",
    major: "Electrical Engineering & Computer Science (EECS)",
    affiliations: [
      "VP of Projects, Cal Hacks",
      "Developer, Blockchain at Berkeley",
    ],
    socials: [
      { platform: "GitHub", handle: "bcarter-dev", followers: 300, notes: "15 repos, 300+ stars" },
      { platform: "X/Twitter", handle: "@bencarterbuilds", followers: 2500 },
    ],
    interests: ["Web Dev", "Crypto", "APIs", "Startups"],
    matchStrength: 0.92,
  },
  {
    id: "3",
    name: "Sofia Flores",
    college: "UC Berkeley",
    year: "Senior",
    major: "Cognitive Science",
    affiliations: [
      "President, Codebase Berkeley",
      "Mentor, CS Kickstart",
    ],
    socials: [
      { platform: "Instagram", handle: "@sofia.codes", followers: 8200, notes: "Day-in-the-life coder content" },
      { platform: "LinkedIn", handle: "Sofia Flores", followers: 1500 },
    ],
    interests: ["UI/UX", "EdTech", "Community Building", "Frontend Dev"],
    matchStrength: 0.88,
  },
];

export default function Recommendations() {
  const router = useRouter();
  const [sort, setSort] = useState<"match" | "followers">("match");
  const [minFollowers, setMinFollowers] = useState<number>(0);

  // Guard: only require that the wizard was visited, not full completion
  useEffect(() => {
    try {
      const seen = localStorage.getItem("rally_campaign_wizard_seen") === "true";
      if (!seen) router.replace("/brands/campaigns/new");
    } catch {
      router.replace("/brands/campaigns/new");
    }
  }, [router]);

  const sorted = useMemo(() => {
    const filtered = STUDENTS.filter((s) => totalFollowers(s) >= minFollowers);
    return filtered.sort((a, b) => {
      if (sort === "match") return b.matchStrength - a.matchStrength;
      return totalFollowers(b) - totalFollowers(a);
    });
  }, [sort, minFollowers]);

  return (
    <div className="font-sans text-foreground bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-24">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Top Matches</h1>
            <p className="text-white/70">Vector-matched by clubs, socials, interests, and campus fit.</p>
          </div>
          <a href="/brands/dashboard" className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/5">Go to Dashboard</a>
        </div>

        <div className="mt-6 flex items-center gap-3 flex-wrap">
          <div className="text-xs text-white/60">Sort by</div>
          <div className="flex gap-2">
            {(["match", "followers"] as const).map((k) => (
              <button key={k} className={`rounded-full border border-white/10 px-3 py-1.5 text-sm ${sort === k ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}`} onClick={() => setSort(k)}>{k}</button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <label className="text-xs text-white/60">Min followers</label>
            <input type="number" value={minFollowers} onChange={(e) => setMinFollowers(e.target.value ? Number(e.target.value) : 0)} className="w-28 rounded-lg border border-white/10 bg-black/30 px-3 py-2 text-sm" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {sorted.map((s) => (
            <MatchCard key={s.id} s={s} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MatchCard({ s }: { s: Student }) {
  const followers = totalFollowers(s).toLocaleString();
  const badge = followersBadge(totalFollowers(s));
  const percent = Math.round(s.matchStrength * 100);
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
      <div className="absolute -inset-1 -z-10 rounded-2xl opacity-30 blur-2xl" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-medium">{s.name}</div>
          <div className="text-sm text-white/60">{s.college}{s.year ? `, ${s.year}` : ""}</div>
          {s.major && <div className="text-xs text-white/50">{s.major}</div>}
        </div>
        <div className="rounded-full bg-white/10 px-2 py-1 text-xs">{badge}</div>
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-white/80">
        <div>
          <div className="text-xs text-white/60">Match strength</div>
          <div className="mt-1 flex items-center gap-2">
            <div className="h-1.5 w-24 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full" style={{ width: `${percent}%`, background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
            </div>
            <div>{percent}%</div>
          </div>
        </div>
        <div>
          <div className="text-xs text-white/60">Reach</div>
          <div className="mt-1">{followers}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Interests</div>
          <div className="mt-1 flex flex-wrap gap-1">
            {s.interests.map((i) => (
              <span key={i} className="rounded-full bg-white/10 px-2 py-0.5 text-xs">{i}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {s.affiliations.map((a) => (
          <span key={a} className="rounded-full bg-white/10 px-2 py-1 text-xs">{a}</span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-white/70">
        {s.socials.map((soc, idx) => (
          <div key={idx} className="rounded-lg border border-white/10 bg-black/30 p-3">
            <div className="text-white/60">{soc.platform}</div>
            <div className="mt-1">{soc.handle || "—"}</div>
            {typeof soc.followers === "number" && <div className="text-white/50">{soc.followers.toLocaleString()} followers</div>}
            {soc.notes && <div className="text-white/50">{soc.notes}</div>}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button className="rounded-full px-4 py-2 text-sm font-medium text-white" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}>Invite</button>
        <button className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/5">View profile</button>
      </div>
    </div>
  );
}

function totalFollowers(s: Student): number {
  return s.socials.reduce((sum, cur) => sum + (cur.followers || 0), 0);
}

function followersBadge(n: number): string {
  if (n >= 50000) return "Mid-tier";
  if (n >= 10000) return "Micro";
  return "Nano";
}


