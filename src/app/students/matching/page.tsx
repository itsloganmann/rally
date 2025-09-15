"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const STEPS = [
  "Embedding your profile",
  "Indexing campus campaigns",
  "Scanning brand briefs",
  "Ranking by cosine similarity",
  "Applying campus/org filters",
  "Preparing your feed",
];

export default function StudentMatchingLoader() {
  const router = useRouter();
  const search = useSearchParams();
  const nextPath = useMemo(() => search.get("next") || "/students/dashboard", [search]);

  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const totalMs = 3600;
    const tick = 40;
    const steps = Math.ceil(totalMs / tick);
    let current = 0;
    const id = setInterval(() => {
      current += 1;
      const pct = Math.min(100, Math.round((current / steps) * 100));
      setProgress(pct);
      const i = Math.min(STEPS.length - 1, Math.floor((pct / 100) * STEPS.length));
      setStepIndex(i);
      if (pct >= 100) {
        clearInterval(id);
        setTimeout(() => router.push(nextPath), 250);
      }
    }, tick);
    return () => clearInterval(id);
  }, [router, nextPath]);

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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
        </div>

        <div className="mx-auto max-w-3xl px-6 pt-24 pb-24">
          <div className="text-center">
            <div className="inline-block relative">
              <div
                className="absolute -inset-10 rounded-full opacity-40 blur-2xl"
                style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}
              />
              <div className="relative h-28 w-28">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(from 0deg, var(--accent-start), var(--accent-end), var(--accent-start))",
                    animation: "spinSlow 1.6s linear infinite",
                    WebkitMask:
                      "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 8px))",
                    mask:
                      "radial-gradient(farthest-side, transparent calc(100% - 8px), #000 calc(100% - 8px))",
                  }}
                />
                <div className="absolute inset-[8px] rounded-full border border-white/10 bg-white/5 backdrop-blur" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-white/70">Matching</span>
                </div>
              </div>
            </div>

            <h1 className="mt-8 text-2xl md:text-3xl font-semibold tracking-tight">Finding the best opportunities for you…</h1>
            <p className="mt-2 text-white/70">We’re aligning your campus influence with live campaigns. This usually takes a few seconds.</p>
          </div>

          <div className="mt-8 h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))",
                transition: "width .12s ease",
              }}
            />
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`rounded-xl border border-white/10 p-4 text-sm ${i < stepIndex ? "bg-white/10" : "bg-white/5"}`}
              >
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${i < stepIndex ? "bg-emerald-400" : i === stepIndex ? "bg-white/60" : "bg-white/20"}`} />
                  <div className={i <= stepIndex ? "text-white" : "text-white/70"}>{s}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-xs text-white/60">Preparing your opportunities · {progress}%</div>
        </div>
      </section>
    </div>
  );
}



