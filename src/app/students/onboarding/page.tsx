"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Socials = {
  tiktok?: { handle: string; followers?: number };
  instagram?: { handle: string; followers?: number };
  twitter?: { handle: string; followers?: number };
  youtube?: { handle: string; followers?: number };
  linkedin?: { handle: string; followers?: number };
};

type StudentProfile = {
  name: string;
  email: string;
  eduVerified: boolean;
  school?: string;
  year?: string;
  major?: string;
  clubs: string[];
  positions: string[]; // President, Social Chair, Member
  socials: Socials;
  screenshot?: string; // data URL placeholder
  interests: string[];
  persona?: string;
  influencerBadge?: "Nano" | "Micro" | "Campus Influencer" | undefined;
};

const STEPS = [
  "Create Account",
  "College Info",
  "Campus Clout",
  "Social Influence",
  "Interests",
  "Preview",
] as const;

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [profile, setProfile] = useState<StudentProfile>({
    name: "",
    email: "",
    eduVerified: false,
    school: "",
    year: "",
    major: "",
    clubs: [],
    positions: [],
    socials: {},
    interests: [],
  });

  const percent = Math.round(((step + 1) / STEPS.length) * 100);

  const influencerBadge = useMemo(() => classifyInfluencer(profile.socials), [profile.socials]);
  const persona = useMemo(() => inferPersona(profile), [profile]);

  useEffect(() => {
    setProfile((p) => ({ ...p, influencerBadge, persona }));
  }, [influencerBadge, persona]);

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1);
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  async function onFinish() {
    try {
      localStorage.setItem("rally_student_profile", JSON.stringify(profile));
    } catch {}
    router.push("/students/matching?next=/students/dashboard");
  }

  return (
    <div className="font-sans text-foreground bg-background min-h-screen">
      <div className="relative max-w-3xl mx-auto px-6 pt-10 pb-24">
        {/* Accent background */}
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

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))" }}
            />
            <div className="text-sm text-white/70">Rally Onboarding</div>
          </div>
          <div className="text-sm text-white/60">Step {step + 1} / {STEPS.length}</div>
        </div>

        {/* Progress */}
        <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${percent}%`,
              background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))",
              transition: "width .3s ease",
            }}
          />
        </div>

        {/* Step title */}
        <h1 className="mt-8 text-2xl md:text-3xl font-semibold tracking-tight">{STEPS[step]}</h1>

        {/* Step body */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          {step === 0 && (
            <AccountStep profile={profile} setProfile={setProfile} />
          )}
          {step === 1 && (
            <CollegeStep
              profile={profile}
              setProfile={setProfile}
              query={query}
              setQuery={setQuery}
            />
          )}
          {step === 2 && (
            <CloutStep profile={profile} setProfile={setProfile} />
          )}
          {step === 3 && (
            <SocialStep profile={profile} setProfile={setProfile} />
          )}
          {step === 4 && (
            <InterestsStep profile={profile} setProfile={setProfile} />
          )}
          {step === 5 && (
            <PreviewStep profile={profile} />
          )}
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={back}
            disabled={step === 0}
            className="rounded-full border border-white/15 px-5 py-2 text-sm text-white/80 disabled:opacity-40 hover:bg-white/5"
          >
            Back
          </button>
          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              className="rounded-full px-6 py-2 text-sm font-medium text-white shadow-lg"
              style={{
                background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))",
                backgroundSize: "200% 100%",
                animation: "shimmer 4s linear infinite, pulseGlow 4s ease-in-out infinite",
              }}
            >
              Continue
            </button>
          ) : (
            <button
              onClick={onFinish}
              className="rounded-full px-6 py-2 text-sm font-medium text-white shadow-lg"
              style={{
                background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))",
                backgroundSize: "200% 100%",
                animation: "shimmer 4s linear infinite, pulseGlow 4s ease-in-out infinite",
              }}
            >
              Finish & See Opportunities
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AccountStep({ profile, setProfile }: {
  profile: StudentProfile; setProfile: (updater: (p: StudentProfile) => StudentProfile) => void;
}) {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-white/60">Full name</label>
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Maya Patel"
            value={profile.name}
            onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs text-white/60">.edu email</label>
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="you@university.edu"
            value={profile.email}
            onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
          />
          <div className="mt-2 flex items-center gap-2">
            <button
              className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 hover:bg-white/5"
              onClick={() => setProfile((p) => ({ ...p, eduVerified: p.email.endsWith(".edu") }))}
            >
              Verify .edu
            </button>
            {profile.eduVerified && (
              <span className="text-xs text-emerald-400">Verified</span>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="text-xs text-white/60">Or continue with</div>
        <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
          {["Google", "Instagram", "TikTok", "LinkedIn"].map((p) => (
            <button key={p} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
              Continue with {p}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-white/50">Quick step: verify student status now, optional doc upload later.</p>
      </div>
    </div>
  );
}

const SCHOOLS = [
  "University of California, Los Angeles",
  "University of Southern California",
  "Ohio State University",
  "University of Michigan",
  "New York University",
  "Stanford University",
  "Harvard University",
  "Georgia Institute of Technology",
  "University of Texas at Austin",
  "University of Florida",
];

function CollegeStep({
  profile, setProfile, query, setQuery,
}: {
  profile: StudentProfile;
  setProfile: (updater: (p: StudentProfile) => StudentProfile) => void;
  query: string;
  setQuery: (q: string) => void;
}) {
  const filtered = useMemo(
    () => SCHOOLS.filter((s) => s.toLowerCase().includes(query.toLowerCase())).slice(0, 8),
    [query]
  );

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs text-white/60">College / University</label>
        <input
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
          placeholder="Search your school"
          value={query || profile.school || ""}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <div className="mt-2 rounded-lg border border-white/10 bg-black/50">
            {filtered.map((s) => (
              <button
                key={s}
                className="block w-full text-left px-3 py-2 text-sm hover:bg-white/5"
                onClick={() => {
                  setProfile((p) => ({ ...p, school: s }));
                  setQuery("");
                }}
              >
                {s}
              </button>
            ))}
            {filtered.length === 0 && (
              <div className="px-3 py-2 text-xs text-white/50">No matches</div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-white/60">Year (optional)</label>
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="2026"
            value={profile.year}
            onChange={(e) => setProfile((p) => ({ ...p, year: e.target.value }))}
          />
        </div>
        <div>
          <label className="text-xs text-white/60">Major (optional)</label>
          <input
            className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
            placeholder="Economics"
            value={profile.major}
            onChange={(e) => setProfile((p) => ({ ...p, major: e.target.value }))}
          />
        </div>
      </div>
      <p className="text-xs text-white/60">Geo marker helps brands target by campus/location.</p>
    </div>
  );
}

const CLOUT_OPTIONS: { category: string; items: string[] }[] = [
  { category: "Greek Life", items: ["IFC Fraternity", "Panhellenic Sorority", "Multicultural Greek", "Rush Committee"] },
  { category: "Athletics", items: ["Varsity Team", "Club Team", "Intramurals", "Spirit Squad"] },
  { category: "Academic Clubs", items: ["Debate", "Robotics", "Finance", "Entrepreneurship", "CS Society"] },
  { category: "Arts", items: ["Dance", "A Cappella", "Theater", "Band"] },
  { category: "Leadership", items: ["Student Government", "Resident Advisor", "Orientation Leader"] },
];

function CloutStep({ profile, setProfile }: {
  profile: StudentProfile; setProfile: (updater: (p: StudentProfile) => StudentProfile) => void;
}) {
  const [filter, setFilter] = useState<string>("");
  const options = useMemo(() => {
    const lower = filter.toLowerCase();
    return CLOUT_OPTIONS.flatMap((group) =>
      group.items
        .filter((i) => i.toLowerCase().includes(lower))
        .map((i) => ({ label: i, group: group.category }))
    );
  }, [filter]);

  function toggle(item: string) {
    setProfile((p) => ({
      ...p,
      clubs: p.clubs.includes(item) ? p.clubs.filter((c) => c !== item) : [...p.clubs, item],
    }));
  }

  function togglePosition(pos: string) {
    setProfile((p) => ({
      ...p,
      positions: p.positions.includes(pos)
        ? p.positions.filter((x) => x !== pos)
        : [...p.positions, pos],
    }));
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs text-white/60">Search orgs</label>
        <input
          className="mt-1 w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2 outline-none focus:ring-2 focus:ring-white/20"
          placeholder="Greek, Athletics, Clubs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-64 overflow-auto pr-1">
        {options.map((opt) => (
          <label key={opt.label} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-3 text-sm hover:bg-white/10">
            <input
              type="checkbox"
              className="accent-indigo-400"
              checked={profile.clubs.includes(opt.label)}
              onChange={() => toggle(opt.label)}
            />
            <span className="text-white/80">{opt.label}</span>
            <span className="ml-auto text-xs text-white/50">{opt.group}</span>
          </label>
        ))}
        {options.length === 0 && (
          <div className="text-xs text-white/50">No results</div>
        )}
      </div>

      <div>
        <div className="text-xs text-white/60 mb-2">Positions held</div>
        <div className="flex flex-wrap gap-2">
          {["President", "Social Chair", "Member"].map((p) => (
            <button
              key={p}
              className={`rounded-full border border-white/10 px-3 py-1.5 text-xs ${profile.positions.includes(p) ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}`}
              onClick={() => togglePosition(p)}
            >
              {p}
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-white/60">We use this to build your campus influence graph.</p>
      </div>
    </div>
  );
}

function SocialStep({ profile, setProfile }: {
  profile: StudentProfile; setProfile: (updater: (p: StudentProfile) => StudentProfile) => void;
}) {
  function setHandle(key: keyof Socials, handle: string) {
    setProfile((p) => ({
      ...p,
      socials: { ...p.socials, [key]: { ...(p.socials[key] as any), handle } },
    }));
  }
  function setFollowers(key: keyof Socials, followers: number | undefined) {
    setProfile((p) => ({
      ...p,
      socials: { ...p.socials, [key]: { ...(p.socials[key] as any), followers } },
    }));
  }
  function onFile(file?: File) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((p) => ({ ...p, screenshot: String(reader.result || "") }));
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {([
          ["tiktok", "TikTok"],
          ["instagram", "Instagram"],
          ["twitter", "X / Twitter"],
          ["youtube", "YouTube"],
          ["linkedin", "LinkedIn"],
        ] as [keyof Socials, string][]).map(([key, label]) => (
          <div key={key} className="rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="text-xs text-white/60">{label}</div>
            <input
              className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
              placeholder={`@your_${String(key)}`}
              value={(profile.socials[key]?.handle as string) || ""}
              onChange={(e) => setHandle(key, e.target.value)}
            />
            <input
              className="mt-2 w-full rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Followers (optional)"
              type="number"
              value={profile.socials[key]?.followers ?? ""}
              onChange={(e) => setFollowers(key, e.target.value ? Number(e.target.value) : undefined)}
            />
            <div className="mt-2 text-xs text-white/50">Connect to auto-pull when available, or enter manually.</div>
          </div>
        ))}
      </div>

      <div>
        <div className="text-xs text-white/60 mb-1">Optional screenshot verification</div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFile(e.target.files?.[0] || undefined)}
          className="block w-full text-xs text-white/70"
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
        <div className="text-white/80">Badge: <span className="font-medium">{classifyInfluencer(profile.socials) || "—"}</span></div>
        <div className="text-white/60 text-xs mt-1">We assign based on follower counts and campus graph.</div>
      </div>
    </div>
  );
}

const INTERESTS = [
  "Fitness",
  "Fashion",
  "Tech",
  "Sustainability",
  "Nightlife",
  "Gaming",
  "Food",
  "Sports",
  "Beauty",
  "Music",
  "Photography",
  "Study/Academic",
];

function InterestsStep({ profile, setProfile }: {
  profile: StudentProfile; setProfile: (updater: (p: StudentProfile) => StudentProfile) => void;
}) {
  function toggle(tag: string) {
    setProfile((p) => ({
      ...p,
      interests: p.interests.includes(tag)
        ? p.interests.filter((t) => t !== tag)
        : p.interests.length < 5
          ? [...p.interests, tag]
          : p.interests,
    }));
  }

  return (
    <div className="space-y-5">
      <div className="text-sm text-white/70">Choose 3–5 interest tags.</div>
      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((tag) => (
          <button
            key={tag}
            onClick={() => toggle(tag)}
            className={`rounded-full border border-white/10 px-3 py-1.5 text-sm ${profile.interests.includes(tag) ? "bg-white/20" : "bg-white/5 hover:bg-white/10"}`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
        <div className="text-white/80">Your Influence Persona: <span className="font-medium">{inferPersona(profile) || "—"}</span></div>
        <div className="text-white/60 text-xs mt-1">Helps match culture fit—not just reach.</div>
      </div>
    </div>
  );
}

function PreviewStep({ profile }: { profile: StudentProfile }) {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-lg font-medium">{profile.name || "Your Name"}</div>
        <div className="text-sm text-white/70 mt-1">{profile.school || "Your School"}{profile.year ? ` · ${profile.year}` : ""}</div>
        <div className="mt-4">
          <div className="text-xs text-white/60 mb-2">Clubs / Roles</div>
          <div className="flex flex-wrap gap-2">
            {profile.clubs.length ? profile.clubs.map((c) => (
              <span key={c} className="rounded-full bg-white/10 px-2 py-1 text-xs">{c}</span>
            )) : <span className="text-xs text-white/50">Add a few orgs to boost matching</span>}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(profile.socials).map(([k, v]) => (
            <div key={k} className="rounded-lg border border-white/10 bg-black/30 p-3 text-sm">
              <div className="text-white/60 text-xs">{labelFor(k)}</div>
              <div className="mt-1">{v?.handle || "—"}</div>
              {v?.followers ? <div className="text-xs text-white/60">{v.followers.toLocaleString()} followers</div> : null}
            </div>
          ))}
        </div>
        <div className="mt-4">
          <div className="text-xs text-white/60 mb-2">Interests</div>
          <div className="flex flex-wrap gap-2">
            {profile.interests.length ? profile.interests.map((i) => (
              <span key={i} className="rounded-full bg-white/10 px-2 py-1 text-xs">{i}</span>
            )) : <span className="text-xs text-white/50">Pick a few interests</span>}
          </div>
        </div>
        <div className="mt-4 text-sm text-white/70">Persona: <span className="font-medium text-white">{profile.persona || "—"}</span></div>
        <div className="text-sm text-white/70">Badge: <span className="font-medium text-white">{profile.influencerBadge || "—"}</span></div>
      </div>
      <div className="text-xs text-white/50">Looks good? Click Finish to see campus opportunities tailored to you.</div>
    </div>
  );
}

function labelFor(k: string) {
  return k === "twitter" ? "X / Twitter" : k.charAt(0).toUpperCase() + k.slice(1);
}

function classifyInfluencer(socials: Socials): StudentProfile["influencerBadge"] {
  const sum = Object.values(socials).reduce((acc, cur) => acc + (cur?.followers || 0), 0);
  if (sum >= 20000) return "Campus Influencer";
  if (sum >= 10000) return "Micro";
  if (sum >= 1000) return "Nano";
  return undefined;
}

function inferPersona(p: StudentProfile): string | undefined {
  if (p.positions.includes("President")) return "The Leader";
  const set = new Set(p.interests.map((x) => x.toLowerCase()));
  if (set.has("fashion") || set.has("beauty")) return "The Trendsetter";
  if (set.has("nightlife") || set.has("gaming") || set.has("sports")) return "The Connector";
  if (set.has("tech") || set.has("sustainability")) return "The Builder";
  return p.interests.length ? "The Connector" : undefined;
}


