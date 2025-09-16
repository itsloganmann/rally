"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { influencers, type Influencer, calculateTotalFollowers, sortInfluencersByFitScore, sortInfluencersByFollowers, filterInfluencersByMinFollowers, filterInfluencersByInterests, formatFollowerCount, getInfluencerTier } from "../../../lib/influencers";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('../../../components/Globe'), { ssr: false });

export default function Recommendations() {
  const router = useRouter();
  const [sort, setSort] = useState<"fit" | "followers">("fit");
  const [minFollowers, setMinFollowers] = useState<number>(0);
  const [selectedInfluencers, setSelectedInfluencers] = useState<Set<string>>(new Set());
  const [focusedInfluencer, setFocusedInfluencer] = useState<Influencer | null>(null);
  const [interestFilter, setInterestFilter] = useState<string[]>([]);

  // Guard: only require that the wizard was visited, not full completion
  useEffect(() => {
    try {
      const seen = localStorage.getItem("rally_campaign_wizard_seen") === "true";
      if (!seen) router.replace("/brands/campaigns/new");
    } catch {
      router.replace("/brands/campaigns/new");
    }
  }, [router]);

  // Get all unique interests for filter
  const allInterests = useMemo(() => {
    const interests = new Set<string>();
    influencers.forEach(inf => {
      inf.interests.forEach(interest => interests.add(interest));
    });
    return Array.from(interests).sort();
  }, []);

  // Filter and sort influencers
  const sortedInfluencers = useMemo(() => {
    let filtered = influencers;
    
    // Apply filters
    if (minFollowers > 0) {
      filtered = filterInfluencersByMinFollowers(filtered, minFollowers);
    }
    
    if (interestFilter.length > 0) {
      filtered = filterInfluencersByInterests(filtered, interestFilter);
    }

    // Sort
    if (sort === "fit") {
      return sortInfluencersByFitScore(filtered);
    } else {
      return sortInfluencersByFollowers(filtered);
    }
  }, [sort, minFollowers, interestFilter]);

  const handleInfluencerSelect = (influencerId: string) => {
    const newSelected = new Set(selectedInfluencers);
    if (newSelected.has(influencerId)) {
      newSelected.delete(influencerId);
    } else {
      newSelected.add(influencerId);
    }
    setSelectedInfluencers(newSelected);
  };

  const handleGlobeInfluencerClick = (influencer: Influencer) => {
    setFocusedInfluencer(influencer);
    // Scroll to the influencer card
    const element = document.getElementById(`influencer-${influencer.id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleDeployCampaign = () => {
    if (selectedInfluencers.size === 0) return;
    
    // Save selected influencers to localStorage
    try {
      localStorage.setItem("rally_selected_influencers", JSON.stringify({
        ids: Array.from(selectedInfluencers),
        timestamp: new Date().toISOString()
      }));
    } catch {}
    
    router.push("/simulation/campaign-demo");
  };

  const toggleInterestFilter = (interest: string) => {
    setInterestFilter(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <div className="font-sans text-foreground bg-background min-h-screen">
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-24">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Top Matches
            </h1>
            <p className="text-white/70">
              AI-matched by semantic similarity, campus fit, and brand alignment.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">
              {selectedInfluencers.size} selected
            </span>
            {selectedInfluencers.size > 0 && (
              <button
                onClick={handleDeployCampaign}
                className="rounded-full px-6 py-2 text-sm font-medium text-white"
                style={{
                  background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 4s linear infinite, pulseGlow 4s ease-in-out infinite",
                }}
              >
                Deploy Campaign ({selectedInfluencers.size})
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">Sort by</span>
              <div className="flex gap-2">
                {(["fit", "followers"] as const).map((k) => (
                  <button 
                    key={k} 
                    className={`rounded-full border border-white/10 px-3 py-1.5 text-sm ${
                      sort === k ? "bg-white/20" : "bg-white/5 hover:bg-white/10"
                    }`} 
                    onClick={() => setSort(k)}
                  >
                    {k === "fit" ? "Fit Score" : "Followers"}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <label className="text-xs text-white/60">Min followers</label>
              <input 
                type="number" 
                value={minFollowers} 
                onChange={(e) => setMinFollowers(e.target.value ? Number(e.target.value) : 0)} 
                className="w-24 rounded-lg border border-white/10 bg-black/30 px-3 py-1 text-sm" 
                placeholder="0"
              />
            </div>
          </div>

          {/* Interest filter tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-white/60">Interests:</span>
            {allInterests.slice(0, 8).map(interest => (
              <button
                key={interest}
                onClick={() => toggleInterestFilter(interest)}
                className={`rounded-full border border-white/10 px-2 py-1 text-xs ${
                  interestFilter.includes(interest) 
                    ? "bg-white/20 text-white" 
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Main content: Globe + List */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Globe */}
          <div className="lg:col-span-2">
            <div className="sticky top-8">
              <Globe 
                className="w-full h-[500px]" 
                influencers={sortedInfluencers}
                onInfluencerClick={handleGlobeInfluencerClick}
              />
              {focusedInfluencer && (
                <div className="mt-4 p-4 rounded-lg border border-white/10 bg-white/5">
                  <div className="text-sm font-medium">{focusedInfluencer.name}</div>
                  <div className="text-xs text-white/60">{focusedInfluencer.college}</div>
                  <div className="text-xs text-white/50 mt-1">
                    Fit Score: {focusedInfluencer.fitScore}%
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Influencer List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {sortedInfluencers.map((influencer) => (
                <InfluencerCard 
                  key={influencer.id}
                  influencer={influencer}
                  isSelected={selectedInfluencers.has(influencer.id)}
                  isFocused={focusedInfluencer?.id === influencer.id}
                  onSelect={() => handleInfluencerSelect(influencer.id)}
                />
              ))}
              
              {sortedInfluencers.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-lg font-medium">No influencers match your filters</div>
                  <div className="text-sm text-white/70 mt-2">
                    Try adjusting your minimum followers or interest filters.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfluencerCard({ 
  influencer, 
  isSelected, 
  isFocused,
  onSelect 
}: { 
  influencer: Influencer; 
  isSelected: boolean;
  isFocused: boolean;
  onSelect: () => void;
}) {
  const totalFollowers = influencer.socials.reduce((sum, social) => sum + social.followers, 0);
  const tier = getInfluencerTier(totalFollowers);
  const formattedFollowers = formatFollowerCount(totalFollowers);

  return (
    <div 
      id={`influencer-${influencer.id}`}
      className={`relative rounded-2xl border p-6 backdrop-blur transition-all ${
        isFocused 
          ? "border-cyan-400/50 bg-cyan-400/10 ring-2 ring-cyan-400/30" 
          : isSelected 
            ? "border-green-400/50 bg-green-400/10"
            : "border-white/10 bg-white/5 hover:border-white/20"
      }`}
    >
      {(isSelected || isFocused) && (
        <div className="absolute -inset-1 -z-10 rounded-2xl opacity-30 blur-2xl" 
             style={{ background: isFocused ? "var(--cyan-400)" : "var(--green-400)" }} />
      )}
      
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-lg font-medium">{influencer.name}</div>
            <span className="rounded-full bg-white/10 px-2 py-1 text-xs">{tier}</span>
          </div>
          <div className="text-sm text-white/60">
            {influencer.college} • {influencer.year}
          </div>
          {influencer.orgs.length > 0 && (
            <div className="text-xs text-white/50 mt-1">
              {influencer.orgs[0].role} at {influencer.orgs[0].org}
            </div>
          )}
        </div>
        
        <button
          onClick={onSelect}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            isSelected 
              ? "bg-green-600 text-white" 
              : "border border-white/20 bg-white/5 text-white/80 hover:bg-white/10"
          }`}
        >
          {isSelected ? "Selected" : "Select"}
        </button>
      </div>

      {/* Fit Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1">
          <span className="text-white/60">Brand Fit Score</span>
          <span className="font-medium">{influencer.fitScore}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-600" 
            style={{ width: `${influencer.fitScore}%` }}
          />
        </div>
        <div className="text-xs text-white/50 mt-1">
          {influencer.explanation}
        </div>
      </div>

      {/* Reach Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-white/60">Total Reach</div>
          <div className="font-medium">{formattedFollowers}</div>
        </div>
        <div>
          <div className="text-xs text-white/60">Engagement</div>
          <div className="font-medium capitalize">{influencer.engagement}</div>
        </div>
      </div>

      {/* Social Platforms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
        {influencer.socials.slice(0, 4).map((social, idx) => (
          <div key={idx} className="rounded-lg border border-white/10 bg-black/30 p-2">
            <div className="text-xs text-white/60">{social.platform}</div>
            <div className="text-xs font-medium">{social.handle}</div>
            <div className="text-xs text-white/50">
              {formatFollowerCount(social.followers)} followers
            </div>
          </div>
        ))}
      </div>

      {/* Organizations */}
      <div className="mb-4">
        <div className="text-xs text-white/60 mb-2">Organizations</div>
        <div className="flex flex-wrap gap-2">
          {influencer.orgs.map((org, idx) => (
            <span key={idx} className="rounded-full bg-white/10 px-2 py-1 text-xs">
              {org.role} • {org.org}
            </span>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <div className="text-xs text-white/60 mb-2">Interests</div>
        <div className="flex flex-wrap gap-1">
          {influencer.interests.map((interest) => (
            <span key={interest} className="rounded-full bg-white/10 px-2 py-0.5 text-xs">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


