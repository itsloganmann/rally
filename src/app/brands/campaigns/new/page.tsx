"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type Campaign = {
  goal?: string;
  filters: {
    colleges: string[];
    regions: string[];
    demographics?: {
      classYear?: string;
      genderMix?: string;
      clubs?: string[];
    };
    tier?: "Nano" | "Micro" | "Mid";
  };
  deliverables: string[];
  budget: {
    model?: "Per Post" | "Per Campaign" | "Retainer";
    amount?: number;
    timeline?: string;
  };
};

const GOALS = ["Brand Awareness", "Product Launch", "Event Promo", "Social Media Growth", "Internships"] as const;
const TIERS = ["Nano", "Micro", "Mid"] as const;
const DELIVERABLES = [
  "Instagram post",
  "TikTok video",
  "Twitter thread",
  "Campus event shoutout",
  "Email blast via student org",
];
const SCHOOLS = [
  "Stanford University",
  "University of California, Los Angeles",
  "University of Southern California",
  "Ohio State University",
  "University of Michigan",
  "New York University",
  "Georgia Institute of Technology",
  "University of Texas at Austin",
  "University of Florida",
];

export default function NewCampaign() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [query, setQuery] = useState("");
  const [campaign, setCampaign] = useState<Campaign>({
    filters: { colleges: [], regions: [], demographics: { clubs: [] } },
    deliverables: [],
    budget: {},
  });

  const percent = Math.round(((step + 1) / 4) * 100);
  const filteredSchools = useMemo(() => SCHOOLS.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 8), [query]);
  const canContinue = true;
  const canFinish = true;

  function next() { if (step < 3) setStep(step + 1); }
  function back() { if (step > 0) setStep(step - 1); }
  function finish() {
    try { localStorage.setItem("rally_campaign_draft", JSON.stringify(campaign)); } catch {}
    try { localStorage.setItem("rally_campaign_wizard_seen", "true"); } catch {}
    router.push("/brands/matching?next=/brands/recommendations");
  }

  return (
    <div className="font-sans text-foreground bg-background min-h-screen">
      <div className="relative max-w-3xl mx-auto px-6 pt-10 pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl" style={{ background: "conic-gradient(from 90deg at 50% 50%, var(--accent-start), var(--accent-end), var(--accent-start))", animation: "spinSlow 30s linear infinite" }} />
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
            <div className="text-sm text-white/70">Campaign Wizard</div>
          </div>
          <div className="text-sm text-white/60">Step {step + 1} / 4</div>
        </div>

        <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full" style={{ width: `${percent}%`, background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))", transition: "width .3s ease" }} />
        </div>

        <h1 className="mt-8 text-2xl md:text-3xl font-semibold tracking-tight">{["Goal", "Targeting", "Deliverables", "Budget & Timeline"][step]}</h1>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur space-y-5">
          {step === 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {GOALS.map((g) => (
                <button
                  key={g}
                  className={`rounded-xl border border-white/10 px-3 py-3 text-left text-sm ${campaign.goal === g ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}`}
                  onClick={() => setCampaign((c) => ({ ...c, goal: g }))}
                >
                  {g}
                </button>
              ))}
              <div className="sm:col-span-2 text-xs text-white/60 mt-2">Tip: Choosing a goal helps improve matches, but you can skip.</div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="text-xs text-white/60">Colleges / Regions</label>
                <input
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Search colleges (UCLA, Big Ten, SEC...)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <div className="mt-2 rounded-lg border border-white/10 bg-black/50">
                    {filteredSchools.map((s) => (
                      <button key={s} className="block w-full text-left px-3 py-2 text-sm hover:bg-white/5" onClick={() => setCampaign((c) => ({ ...c, filters: { ...c.filters, colleges: [...new Set([...(c.filters.colleges || []), s])] } }))}>{s}</button>
                    ))}
                    {filteredSchools.length === 0 && <div className="px-3 py-2 text-xs text-white/50">No matches</div>}
                  </div>
                )}
                {campaign.filters.colleges.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {campaign.filters.colleges.map((s) => (
                      <span key={s} className="rounded-full bg-white/10 px-2 py-1 text-xs">{s}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-white/60">Class year</label>
                  <input className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2" placeholder="e.g., 2026" onChange={(e) => setCampaign((c) => ({ ...c, filters: { ...c.filters, demographics: { ...(c.filters.demographics || {}), classYear: e.target.value } } }))} />
                </div>
                <div>
                  <label className="text-xs text-white/60">Gender mix (optional)</label>
                  <input className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2" placeholder="e.g., 40% male / 60% female" onChange={(e) => setCampaign((c) => ({ ...c, filters: { ...c.filters, demographics: { ...(c.filters.demographics || {}), genderMix: e.target.value } } }))} />
                </div>
                <div>
                  <label className="text-xs text-white/60">Clubs / affiliations</label>
                  <input className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2" placeholder="Greek life, athletics, student orgs" onChange={(e) => setCampaign((c) => ({ ...c, filters: { ...c.filters, demographics: { ...(c.filters.demographics || {}), clubs: e.target.value.split(",").map((x) => x.trim()).filter(Boolean) } } }))} />
                </div>
              </div>

              <div>
                <div className="text-xs text-white/60 mb-2">Influencer tier</div>
                <div className="flex flex-wrap gap-2">
                  {TIERS.map((t) => (
                    <button key={t} className={`rounded-full border border-white/10 px-3 py-1.5 text-sm ${campaign.filters.tier === t ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}`} onClick={() => setCampaign((c) => ({ ...c, filters: { ...c.filters, tier: t } }))}>{t}</button>
                  ))}
                </div>
              </div>
              <div className="text-xs text-white/60">Optional: Add colleges and a tier to refine targeting.</div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="text-xs text-white/60 mb-2">Deliverables</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {DELIVERABLES.map((d) => (
                  <label key={d} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10">
                    <input type="checkbox" className="accent-indigo-400" checked={campaign.deliverables.includes(d)} onChange={() => setCampaign((c) => ({ ...c, deliverables: c.deliverables.includes(d) ? c.deliverables.filter((x) => x !== d) : [...c.deliverables, d] }))} />
                    <span className="text-white/80">{d}</span>
                  </label>
                ))}
              </div>
              <div className="mt-2 text-xs text-white/60">Optional: Choose deliverables you expect from student creators.</div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-white/60">Budget model</label>
                <select className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2" value={campaign.budget.model || ""} onChange={(e) => setCampaign((c) => ({ ...c, budget: { ...c.budget, model: e.target.value as Campaign["budget"]["model"] } }))}>
                  <option value="">Select...</option>
                  <option value="Per Post">Per post</option>
                  <option value="Per Campaign">Per campaign</option>
                  <option value="Retainer">Retainer</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-white/60">Amount (USD)</label>
                  <input type="number" className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2" placeholder="e.g., 500" onChange={(e) => setCampaign((c) => ({ ...c, budget: { ...c.budget, amount: e.target.value ? Number(e.target.value) : undefined } }))} />
                </div>
                <div>
                  <label className="text-xs text-white/60">Timeline</label>
                  <input className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2" placeholder="e.g., 3 weeks starting Oct 1" onChange={(e) => setCampaign((c) => ({ ...c, budget: { ...c.budget, timeline: e.target.value } }))} />
                </div>
              </div>
              <div className="text-xs text-white/60">Optional: Add budget details now or skip and refine later.</div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <button onClick={back} disabled={step === 0} className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/80 disabled:opacity-40 hover:bg-white/5">Back</button>
          {step < 3 ? (
            <button
              onClick={next}
              disabled={!canContinue}
              className="rounded-full px-6 py-2 text-sm font-medium text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))", backgroundSize: "200% 100%", animation: "shimmer 4s linear infinite, pulseGlow 4s ease-in-out infinite" }}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={finish}
              disabled={!canFinish}
              className="rounded-full px-6 py-2 text-sm font-medium text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))", backgroundSize: "200% 100%", animation: "shimmer 4s linear infinite, pulseGlow 4s ease-in-out infinite" }}
            >
              Review Matches
            </button>
          )}
        </div>
      </div>
    </div>
  );
}


function validForStep(step: number, c: Campaign): boolean {
  if (step === 0) return !!c.goal;
  if (step === 1) return (c.filters.colleges?.length || 0) > 0 && !!c.filters.tier;
  if (step === 2) return (c.deliverables?.length || 0) > 0;
  if (step === 3) return !!c.budget.model && !!c.budget.timeline && typeof c.budget.amount === "number" && (c.budget.amount || 0) > 0;
  return true;
}


