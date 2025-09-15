"use client";

import { useEffect, useState } from "react";

type Application = {
  id: string;
  student: string;
  college: string;
  pitch: string;
  followers: number;
  status: "pending" | "approved" | "declined";
};

const DEMO_APPS: Application[] = [
  {
    id: "1",
    student: "Priya Sharma",
    college: "Stanford University",
    pitch: "Can drive technical awareness with SAIS channels + research threads.",
    followers: 4800 + 2100,
    status: "pending",
  },
  {
    id: "2",
    student: "Ben Carter",
    college: "UC Berkeley",
    pitch: "Hackathon-style sprint: ship demo + devlog to GitHub/Twitter.",
    followers: 2500 + 300,
    status: "pending",
  },
  {
    id: "3",
    student: "Sofia Flores",
    college: "UC Berkeley",
    pitch: "Activate Codebase community + IG creator content for launch.",
    followers: 8200 + 1500,
    status: "pending",
  },
];

export default function BrandDashboard() {
  const [apps, setApps] = useState<Application[]>([]);

  useEffect(() => {
    setApps(DEMO_APPS);
  }, []);

  function update(id: string, status: Application["status"]) {
    setApps((list) => list.map((a) => (a.id === id ? { ...a, status } : a)));
  }

  return (
    <div className="font-sans text-foreground bg-background min-h-screen">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-24">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Campaign Dashboard</h1>
            <p className="text-white/70">Track applicants, manage approvals and payouts, and view analytics.</p>
          </div>
          <a href="/brands/campaigns/new" className="rounded-full px-4 py-2 text-sm font-medium text-white" style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}>New Campaign</a>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {apps.map((a) => (
            <div key={a.id} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-medium">{a.student}</div>
                  <div className="text-sm text-white/60">{a.college}</div>
                  <div className="mt-2 text-sm text-white/80">{a.pitch}</div>
                  <div className="text-xs text-white/60 mt-1">{a.followers.toLocaleString()} followers</div>
                </div>
                <div className="text-xs">
                  <span className={`rounded-full px-2 py-1 ${a.status === "approved" ? "bg-emerald-500/20 text-emerald-300" : a.status === "declined" ? "bg-rose-500/20 text-rose-300" : "bg-white/10 text-white/70"}`}>{a.status}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button onClick={() => update(a.id, "approved")} className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 hover:bg-emerald-400/20">Approve</button>
                <button onClick={() => update(a.id, "declined")} className="rounded-full border border-rose-400/40 bg-rose-400/10 px-4 py-2 text-sm text-rose-200 hover:bg-rose-400/20">Decline</button>
                <button className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 hover:bg-white/5">Message</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="text-lg font-medium">Analytics</div>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <Stat label="Potential Reach" value="19,400" />
            <Stat label="Engagement" value="7.4%" />
            <Stat label="Applications" value={apps.length.toString()} />
            <Stat label="Approved" value={apps.filter((a) => a.status === "approved").length.toString()} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-2xl font-semibold">{value}</div>
      <div className="text-xs text-white/70 mt-1">{label}</div>
    </div>
  );
}


