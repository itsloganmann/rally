"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { influencers, type Influencer, formatFollowerCount, getInfluencerTier } from "../../../lib/influencers";
import dynamic from "next/dynamic";

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import("../../../components/Globe"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] bg-black rounded-lg flex items-center justify-center">
      <div className="text-white">Loading globe...</div>
    </div>
  )
});

// School interface
interface School {
  id: string;
  name: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
}

export default function Recommendations() {
  const router = useRouter();
  const [sort, setSort] = useState<"fit" | "followers">("fit");
  const [minFollowers, setMinFollowers] = useState<number>(0);
  const [selectedInfluencers, setSelectedInfluencers] = useState<Set<string>>(new Set());
  const [focusedInfluencer, setFocusedInfluencer] = useState<Influencer | null>(null);
  const [interestFilter, setInterestFilter] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'students' | 'schools' | 'density'>('students');
  const [searchSchool, setSearchSchool] = useState<string>('');
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);

  // Load schools data
  useEffect(() => {
    fetch('/data/schools.json')
      .then(res => res.json())
      .then(data => setSchools(data))
      .catch(err => console.error('Failed to load schools:', err));
  }, []);

  // Guard: check onboarding completion
  useEffect(() => {
    try {
      const stored = localStorage.getItem("rally_brand_onboarded");
      if (!stored || stored !== "true") {
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
    let filtered = influencers.filter(inf => {
      // Min followers filter
      const totalFollowers = inf.socials.reduce((sum, social) => sum + social.followers, 0);
      if (totalFollowers < minFollowers) return false;
      
      // Interest filter
      if (interestFilter.length > 0 && !interestFilter.some(interest => inf.interests.includes(interest))) {
        return false;
      }
      
      // School filter
      if (selectedSchool && inf.schoolId !== selectedSchool.id) {
        return false;
      }
      
      return true;
    });
    
    // Sort
    if (sort === "fit") {
      return filtered.sort((a, b) => b.fitScore - a.fitScore);
    } else {
      return filtered.sort((a, b) => {
        const aTotal = a.socials.reduce((sum, social) => sum + social.followers, 0);
        const bTotal = b.socials.reduce((sum, social) => sum + social.followers, 0);
        return bTotal - aTotal;
      });
    }
  }, [sort, minFollowers, interestFilter, selectedSchool]);

  const toggleInfluencerSelection = useCallback((id: string) => {
    setSelectedInfluencers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleInfluencerClick = useCallback((influencer: Influencer) => {
    setFocusedInfluencer(influencer);
    toggleInfluencerSelection(influencer.id);
  }, [toggleInfluencerSelection]);

  const handleSchoolClick = useCallback((school: School) => {
    setSelectedSchool(school);
    setViewMode('students'); // Switch to students view when school is clicked
  }, []);

  const toggleInterestFilter = (interest: string) => {
    setInterestFilter(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleDeploySelected = () => {
    if (selectedInfluencers.size === 0) return;
    const ids = Array.from(selectedInfluencers).join(',');
    router.push(`/simulation/campaign-demo?ids=${ids}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The Globe component will handle the search via the searchSchool prop
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Campus Influencer Network</h1>
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

        {/* Main Content - Globe and Side Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Globe Section */}
          <div className="lg:col-span-2">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchSchool}
                  onChange={(e) => setSearchSchool(e.target.value)}
                  placeholder="Search schools (e.g., Stanford, Miami, Duke...)"
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  🔍
                </button>
              </div>
            </form>

            {/* View Mode Toggle */}
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-400">View:</span>
              <button
                onClick={() => setViewMode('students')}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'students' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Students
              </button>
              <button
                onClick={() => setViewMode('schools')}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'schools' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Schools
              </button>
              <button
                onClick={() => setViewMode('density')}
                className={`px-3 py-1 rounded text-sm ${viewMode === 'density' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
              >
                Density
              </button>
            </div>

            {/* Globe */}
            <div className="bg-gray-800 rounded-lg p-4">
              <Globe
                influencers={filteredAndSortedInfluencers}
                schools={schools}
                selectedInfluencers={selectedInfluencers}
                onInfluencerClick={handleInfluencerClick}
                onSchoolClick={handleSchoolClick}
                searchSchool={searchSchool}
                viewMode={viewMode}
              />
            </div>

            {/* Legend */}
            <div className="mt-4 flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span>High Fit (90%+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span>Good Fit (80-89%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-white"></div>
                <span>Standard Fit</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span>Schools</span>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="lg:col-span-1">
            {/* Filters */}
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              {/* Sort */}
              <div className="mb-4">
                <span className="text-sm text-gray-400 mb-2 block">Sort by:</span>
                <div className="flex gap-2">
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
              </div>

              {/* Min Followers */}
              <div className="mb-4">
                <label className="text-sm text-gray-400 mb-2 block">Min followers:</label>
                <input
                  type="number"
                  value={minFollowers}
                  onChange={(e) => setMinFollowers(Number(e.target.value))}
                  className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
                  placeholder="0"
                />
              </div>

              {/* Selected School */}
              {selectedSchool && (
                <div className="mb-4">
                  <span className="text-sm text-gray-400 mb-2 block">Filtered by school:</span>
                  <div className="flex items-center justify-between bg-gray-700 px-3 py-2 rounded">
                    <span className="text-sm">{selectedSchool.name}</span>
                    <button
                      onClick={() => setSelectedSchool(null)}
                      className="text-gray-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Interests */}
              <div>
                <span className="text-sm text-gray-400 mb-2 block">Interests:</span>
                <div className="flex flex-wrap gap-1 max-h-32 overflow-y-auto">
                  {availableInterests.slice(0, 12).map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleInterestFilter(interest)}
                      className={`px-2 py-1 rounded text-xs ${
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

            {/* Focused Influencer Panel */}
            {focusedInfluencer && (
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">{focusedInfluencer.name}</h3>
                  <button
                    onClick={() => setFocusedInfluencer(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-400">School:</span>
                    <div className="text-white">{focusedInfluencer.college}</div>
                  </div>
                  
                  <div>
                    <span className="text-gray-400">Organizations:</span>
                    <div className="text-white">
                      {focusedInfluencer.orgs.map(org => (
                        <div key={org.org} className="text-xs">
                          {org.role} at {org.org}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-400">Social Media:</span>
                    <div className="text-white">
                      {focusedInfluencer.socials.map(social => (
                        <div key={social.platform} className="text-xs">
                          {social.platform}: {formatFollowerCount(social.followers)}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-gray-400">Fit Score:</span>
                    <div className="text-white font-bold">{focusedInfluencer.fitScore}%</div>
                  </div>
                  
                  <div>
                    <span className="text-gray-400">Why they're a match:</span>
                    <div className="text-white text-xs">{focusedInfluencer.explanation}</div>
                  </div>
                  
                  <button
                    onClick={() => toggleInfluencerSelection(focusedInfluencer.id)}
                    className={`w-full py-2 px-4 rounded font-semibold transition-colors ${
                      selectedInfluencers.has(focusedInfluencer.id)
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {selectedInfluencers.has(focusedInfluencer.id) ? 'Selected ✓' : 'Select'}
                  </button>
                </div>
              </div>
            )}

            {/* Influencer List */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold mb-4">Influencers ({filteredAndSortedInfluencers.length})</h3>
              <div className="max-h-96 overflow-y-auto space-y-3">
                {filteredAndSortedInfluencers.slice(0, 20).map(influencer => (
                  <InfluencerCard
                    key={influencer.id}
                    influencer={influencer}
                    isSelected={selectedInfluencers.has(influencer.id)}
                    onSelect={() => toggleInfluencerSelection(influencer.id)}
                    onFocus={() => setFocusedInfluencer(influencer)}
                  />
                ))}
                {filteredAndSortedInfluencers.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No influencers match your current filters
                  </div>
                )}
              </div>
            </div>

            {/* Results Summary */}
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Campaign Summary</h3>
              <div className="text-sm text-gray-400">
                {filteredAndSortedInfluencers.length} influencers available
              </div>
              {selectedInfluencers.size > 0 && (
                <div className="text-sm text-blue-400 mt-1">
                  {selectedInfluencers.size} selected for campaign
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
  onSelect,
  onFocus
}: {
  influencer: Influencer;
  isSelected: boolean;
  onSelect: () => void;
  onFocus: () => void;
}) {
  const totalFollowers = influencer.socials.reduce((sum, social) => sum + social.followers, 0);
  
  return (
    <div 
      className={`bg-gray-700 rounded-lg p-3 cursor-pointer transition-all ${
        isSelected ? "border-2 border-blue-500 bg-blue-900/20" : "border border-gray-600 hover:border-gray-500"
      }`}
      onClick={onFocus}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold text-sm">{influencer.name}</h4>
          <p className="text-xs text-gray-400">{influencer.college}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className={`px-2 py-1 rounded text-xs font-semibold transition-colors ${
            isSelected 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {isSelected ? "✓" : "Select"}
        </button>
      </div>

      {/* Fit Score */}
      <div className="mb-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">Fit Score</span>
          <span className="text-sm font-bold">{influencer.fitScore}%</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
          <div 
            className={`h-1 rounded-full ${
              influencer.fitScore >= 90 ? "bg-green-500" :
              influencer.fitScore >= 80 ? "bg-yellow-500" : "bg-gray-400"
            }`}
            style={{ width: `${influencer.fitScore}%` }}
          />
        </div>
      </div>

      {/* Social Stats */}
      <div className="text-xs text-gray-400">
        {formatFollowerCount(totalFollowers)} total reach
      </div>
    </div>
  );
}


