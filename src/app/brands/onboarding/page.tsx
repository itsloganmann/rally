"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type BrandProfile = {
  companyName: string;
  industry: string;
  size: "Startup" | "Growth" | "Enterprise" | "";
  logoDataUrl?: string;
  description?: string;
  budgetPreference: "Micro" | "Mid" | "Large" | "";
};

export default function BrandOnboarding() {
  const router = useRouter();
  const [profile, setProfile] = useState<BrandProfile>({
    companyName: "",
    industry: "",
    size: "",
    description: "",
    budgetPreference: "",
  });

  function onFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setProfile((p) => ({ ...p, logoDataUrl: String(reader.result || "") }));
    reader.readAsDataURL(file);
  }

  function saveAndContinue() {
    try {
      localStorage.setItem("rally_brand_profile", JSON.stringify(profile));
    } catch {}
    router.push("/brands/campaigns/new");
  }

  return (
    <div className="font-sans text-foreground bg-background min-h-screen">
      <section className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "conic-gradient(from 90deg at 50% 50%, var(--accent-start), var(--accent-end), var(--accent-start))",
              animation: "spinSlow 30s linear infinite",
            }}
          />
        </div>

        <div className="mx-auto max-w-3xl px-6 pt-16 pb-24">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-2.5 rounded-full" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }} />
            <div className="text-sm text-white/70">Create Brand Profile</div>
          </div>

          <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight">Find authentic campus ambassadors</h1>
          <p className="mt-2 text-white/70">Tell us about your brand and budget so we can match the right student voices.</p>

          <div className="mt-8 space-y-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/60">Company name</label>
                <input
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Arcade Energy"
                  value={profile.companyName}
                  onChange={(e) => setProfile((p) => ({ ...p, companyName: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-xs text-white/60">Industry</label>
                <input
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="CPG, fashion, fintech, edtech..."
                  value={profile.industry}
                  onChange={(e) => setProfile((p) => ({ ...p, industry: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/60">Company size</label>
                <select
                  className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
                  value={profile.size}
                  onChange={(e) => setProfile((p) => ({ ...p, size: e.target.value as BrandProfile["size"] }))}
                >
                  <option value="">Select...</option>
                  <option value="Startup">Startup</option>
                  <option value="Growth">Growth</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-white/60">Logo</label>
                <input type="file" accept="image/*" className="mt-1 block w-full text-xs text-white/70" onChange={(e) => onFile(e.target.files?.[0] || undefined)} />
                {profile.logoDataUrl && (
                  <div className="mt-2 text-xs text-white/60">Logo uploaded ✓</div>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs text-white/60">Description</label>
              <textarea
                className="mt-1 w-full min-h-24 rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
                placeholder="What do you do? Who's your audience?"
                value={profile.description}
                onChange={(e) => setProfile((p) => ({ ...p, description: e.target.value }))}
              />
            </div>

            <div>
              <div className="text-xs text-white/60 mb-2">Campaign budget preference</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "Micro", label: "Micro-budget (<$500)" },
                  { key: "Mid", label: "Mid-tier ($500–$5k)" },
                  { key: "Large", label: "Large-scale ($5k+)" },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    className={`rounded-full border border-white/10 px-3 py-1.5 text-sm ${profile.budgetPreference === opt.key ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}`}
                    onClick={() => setProfile((p) => ({ ...p, budgetPreference: opt.key as BrandProfile["budgetPreference"] }))}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={saveAndContinue}
                className="rounded-full px-6 py-2 text-sm font-medium text-white shadow-lg"
                style={{
                  background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 4s linear infinite, pulseGlow 4s ease-in-out infinite",
                }}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


