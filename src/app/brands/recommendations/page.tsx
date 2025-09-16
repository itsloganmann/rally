"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { influencers, type Influencer, calculateTotalFollowers, sortInfluencersByFitScore, sortInfluencersByFollowers, filterInfluencersByMinFollowers, filterInfluencersByInterests, formatFollowerCount, getInfluencerTier } from "../../../lib/influencers";

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
      const stored = localStorage.getItem("rally_brand_onboarding");
      if (!stored) {
        router.replace("/brands/onboarding");
        return;
      }
    } catch (error) {
      console.error('Failed to load brand onboarding state:', error);
      router.replace("/brands/onboarding");
    }
  }, [router]);

  // Get available interests for filter
  const availableInterests = useMemo(() => {
    const allInterests = new Set<string>();
    influencers.forEach(inf => {
      inf.interests.forEach(interest => allInterests.add(interest));
    });
    return Array.from(allInterests).sort();
  }, []);

  // Apply filters and sorting
  const filteredAndSortedInfluencers = useMemo(() => {
    let filtered = filterInfluencersByMinFollowers(influencers, minFollowers);
    filtered = filterInfluencersByInterests(filtered, interestFilter);
    
    if (sort === "fit") {
      return sortInfluencersByFitScore(filtered);
    } else {
      return sortInfluencersByFollowers(filtered);
    }
  }, [sort, minFollowers, interestFilter]);

  const toggleInfluencerSelection = (id: string) => {
    setSelectedInfluencers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const toggleInterestFilter = (interest: string) => {
    setInterestFilter(prev => {
      if (prev.includes(interest)) {
        return prev.filter(i => i !== interest);
      } else {
        return [...prev, interest];
      }
    });
  };

  const handleDeploySelected = () => {
    if (selectedInfluencers.size === 0) return;
    
    const selectedIds = Array.from(selectedInfluencers);
    router.push(`/simulation/campaign-demo?ids=${selectedIds.join(',')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Top Matches</h1>
              <p className="text-gray-400">AI-matched by semantic similarity, campus fit, and brand alignment.</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{selectedInfluencers.size} selected</div>
              <button
                onClick={handleDeploySelected}
                disabled={selectedInfluencers.size === 0}
                className="mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Deploy Campaign
              </button>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mb-8 space-y-4">
          {/* Sort and filter controls */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort by:</span>
              <button
                onClick={() => setSort("fit")}
                className={`px-3 py-1 rounded text-sm ${sort === "fit" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
              >
                Fit Score
              </button>
              <button
                onClick={() => setSort("followers")}
                className={`px-3 py-1 rounded text-sm ${sort === "followers" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"}`}
              >
                Followers
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Min followers:</span>
              <input
                type="number"
                value={minFollowers}
                onChange={(e) => setMinFollowers(Number(e.target.value))}
                className="bg-gray-800 border border-gray-600 rounded px-2 py-1 text-sm w-20"
                placeholder="0"
              />
            </div>
          </div>

          {/* Interest filters */}
          <div>
            <span className="text-sm text-gray-400 mb-2 block">Interests:</span>
            <div className="flex flex-wrap gap-2">
              {availableInterests.slice(0, 15).map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterestFilter(interest)}
                  className={`px-3 py-1 rounded text-sm ${
                    interestFilter.includes(interest) 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Influencer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedInfluencers.map(influencer => (
            <InfluencerCard
              key={influencer.id}
              influencer={influencer}
              isSelected={selectedInfluencers.has(influencer.id)}
              onSelect={() => toggleInfluencerSelection(influencer.id)}
            />
          ))}
        </div>

        {filteredAndSortedInfluencers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">No influencers match your current filters</div>
            <button
              onClick={() => {
                setMinFollowers(0);
                setInterestFilter([]);
              }}
              className="mt-4 text-blue-400 hover:text-blue-300 underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function InfluencerCard({
  influencer,
  isSelected,
  onSelect
}: {
  influencer: Influencer;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const totalFollowers = influencer.socials.reduce((sum, social) => sum + social.followers, 0);
  const tier = getInfluencerTier(totalFollowers);
  const formattedFollowers = formatFollowerCount(totalFollowers);

  return (
    <div className={`bg-gray-800 rounded-lg p-6 border-2 transition-all ${
      isSelected ? "border-blue-500 bg-blue-900/20" : "border-gray-700 hover:border-gray-600"
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{influencer.name}</h3>
          <p className="text-sm text-gray-400">{influencer.college} • {influencer.year}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs ${
            tier === "Macro" ? "bg-purple-600" : 
            tier === "Mid-tier" ? "bg-blue-600" : "bg-green-600"
          }`}>
            {tier}
          </span>
          <button
            onClick={onSelect}
            className={`px-4 py-2 rounded font-semibold text-sm transition-colors ${
              isSelected 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : "bg-gray-700 hover:bg-gray-600 text-gray-300"
            }`}
          >
            {isSelected ? "Selected" : "Select"}
          </button>
        </div>
      </div>

      {/* Organizations */}
      <div className="mb-4">
        <div className="text-sm text-gray-500 mb-1">Organizations:</div>
        <div className="space-y-1">
          {influencer.orgs.map((org, idx) => (
            <div key={idx} className="text-sm">
              <span className="font-medium">{org.role}</span> • {org.org}
            </div>
          ))}
        </div>
      </div>

      {/* Brand Fit Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Brand Fit Score</span>
          <span className="text-lg font-bold">{influencer.fitScore}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              influencer.fitScore >= 90 ? "bg-green-500" :
              influencer.fitScore >= 80 ? "bg-yellow-500" : "bg-red-500"
            }`}
            style={{ width: `${influencer.fitScore}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">{influencer.explanation}</p>
      </div>

      {/* Social Stats */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Total Reach</span>
          <span className="text-sm font-medium">{formattedFollowers}</span>
        </div>
        <div className="text-sm text-gray-400">Engagement: <span className="capitalize">{influencer.engagement}</span></div>
      </div>

      {/* Social Platforms */}
      <div className="grid grid-cols-2 gap-2">
        {influencer.socials.slice(0, 4).map((social, idx) => (
          <div key={idx} className="bg-gray-700 rounded p-2 text-xs">
            <div className="font-medium">{social.platform}</div>
            <div className="text-gray-400">@{social.handle}</div>
            <div className="text-gray-300">{formatFollowerCount(social.followers)} followers</div>
          </div>
        ))}
      </div>

      {/* Interests */}
      <div className="mt-4">
        <div className="text-sm text-gray-500 mb-1">Interests:</div>
        <div className="flex flex-wrap gap-1">
          {influencer.interests.slice(0, 4).map((interest, idx) => (
            <span key={idx} className="bg-gray-700 px-2 py-0.5 rounded text-xs">
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}


