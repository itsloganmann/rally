'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast, ToastContainer } from '../../../components/Toast';
import { getInfluencersByIds, calculateTotalFollowers, formatFollowerCount, type Influencer } from '../../../lib/influencers';

interface PostMetrics {
  views: number;
  conversions: number;
}

interface AnimatedPost {
  id: string;
  influencer: Influencer;
  post: Influencer['examplePosts'][0];
  metrics: PostMetrics;
  targetViews: number;
  targetConversions: number;
  isComplete: boolean;
}

export default function CampaignSimulation() {
  const router = useRouter();
  const { toasts, addToast, removeToast } = useToast();
  const [selectedInfluencers, setSelectedInfluencers] = useState<Influencer[]>([]);
  const [animatedPosts, setAnimatedPosts] = useState<AnimatedPost[]>([]);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Load selected influencers from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("rally_selected_influencers");
      if (!stored) {
        router.replace("/brands/recommendations");
        return;
      }

      const { ids } = JSON.parse(stored);
      const influencers = getInfluencersByIds(ids);
      
      if (influencers.length === 0) {
        router.replace("/brands/recommendations");
        return;
      }

      setSelectedInfluencers(influencers);

      // Create animated posts from selected influencers
      const posts: AnimatedPost[] = [];
      influencers.forEach(influencer => {
        influencer.examplePosts.forEach(post => {
          posts.push({
            id: `${influencer.id}-${post.id}`,
            influencer,
            post,
            metrics: {
              views: post.baseViews,
              conversions: post.baseConversions
            },
            targetViews: post.targetViews,
            targetConversions: post.targetConversions,
            isComplete: false
          });
        });
      });

      setAnimatedPosts(posts);
    } catch (error) {
      console.error('Failed to load selected influencers:', error);
      router.replace("/brands/recommendations");
    }
  }, [router]);

  // Start deployment animation
  useEffect(() => {
    if (selectedInfluencers.length === 0) return;

    const timer = setTimeout(() => {
      setIsDeploying(true);
      addToast("Campaign deployment started!", "info");
      
      // Animate deployment progress
      const progressInterval = setInterval(() => {
        setDeploymentProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setIsDeploying(false);
            addToast("Campaign deployed successfully!", "success");
            startPostAnimations();
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedInfluencers.length, addToast]);

  // Start animating post metrics
  const startPostAnimations = () => {
    setAnimatedPosts(prev => {
      const updated = prev.map(post => ({ ...post, isComplete: false }));
      
      // Animate each post with slight delays
      updated.forEach((post, index) => {
        setTimeout(() => {
          const interval = setInterval(() => {
            setAnimatedPosts(current => 
              current.map(p => {
                if (p.id !== post.id) return p;
                if (p.isComplete) return p;

                const viewsIncrement = Math.floor((p.targetViews - p.post.baseViews) / 50);
                const conversionsIncrement = Math.floor((p.targetConversions - p.post.baseConversions) / 50);

                const newViews = Math.min(p.targetViews, p.metrics.views + viewsIncrement);
                const newConversions = Math.min(p.targetConversions, p.metrics.conversions + conversionsIncrement);

                const complete = newViews >= p.targetViews && newConversions >= p.targetConversions;

                return {
                  ...p,
                  metrics: { views: newViews, conversions: newConversions },
                  isComplete: complete
                };
              })
            );
          }, 150);

          // Stop animation after reaching targets
          setTimeout(() => {
            clearInterval(interval);
            setAnimatedPosts(current =>
              current.map(p => 
                p.id === post.id 
                  ? { ...p, isComplete: true, metrics: { views: p.targetViews, conversions: p.targetConversions } }
                  : p
              )
            );
          }, 8000);
        }, index * 1000);
      });

      return updated;
    });

    // Mark overall completion
    setTimeout(() => {
      setIsComplete(true);
      addToast("All posts are performing excellently!", "success");
    }, animatedPosts.length * 1000 + 9000);
  };

  // Calculate totals
  const totalReach = useMemo(() => {
    return selectedInfluencers.reduce((total, inf) => total + calculateTotalFollowers(inf), 0);
  }, [selectedInfluencers]);

  const totalViews = useMemo(() => {
    return animatedPosts.reduce((total, post) => total + post.metrics.views, 0);
  }, [animatedPosts]);

  const totalConversions = useMemo(() => {
    return animatedPosts.reduce((total, post) => total + post.metrics.conversions, 0);
  }, [animatedPosts]);

  const averageEngagement = useMemo(() => {
    if (totalViews === 0) return 0;
    return ((totalConversions / totalViews) * 100);
  }, [totalViews, totalConversions]);

  if (selectedInfluencers.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading campaign...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/brands/recommendations" className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1 className="text-xl font-semibold">Campaign Simulation</h1>
              <p className="text-sm text-gray-400">{selectedInfluencers.length} influencers selected</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {isDeploying && (
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span>Deploying... {deploymentProgress}%</span>
              </div>
            )}
            {isComplete && (
              <div className="flex items-center gap-2 text-sm text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span>Campaign Active</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Overview */}
      <div className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div 
              className="glass rounded-lg p-4 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-2xl font-bold">{selectedInfluencers.length}</div>
              <div className="text-sm text-gray-400">Selected Influencers</div>
            </motion.div>
            
            <motion.div 
              className="glass rounded-lg p-4 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-2xl font-bold">{formatFollowerCount(totalReach)}</div>
              <div className="text-sm text-gray-400">Total Reach</div>
            </motion.div>
            
            <motion.div 
              className="glass rounded-lg p-4 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-2xl font-bold">{totalViews.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Total Views</div>
            </motion.div>
            
            <motion.div 
              className="glass rounded-lg p-4 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-2xl font-bold">{totalConversions.toLocaleString()}</div>
              <div className="text-sm text-gray-400">Conversions</div>
            </motion.div>
          </div>

          {/* Deployment Progress */}
          {isDeploying && (
            <motion.div 
              className="mb-8 glass rounded-lg p-6 border border-white/10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold">Deploying Campaign</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                <div 
                  className="bg-blue-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${deploymentProgress}%` }}
                />
              </div>
              <div className="text-xs text-gray-400">
                Progress: {deploymentProgress}% • Activating {selectedInfluencers.length} influencer accounts
              </div>
            </motion.div>
          )}

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {animatedPosts.map((animatedPost, index) => (
                <motion.div
                  key={animatedPost.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="glass rounded-lg border border-white/10 overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                        {animatedPost.influencer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-medium">{animatedPost.influencer.name}</div>
                        <div className="text-xs text-gray-400">{animatedPost.influencer.college}</div>
                      </div>
                    </div>

                    {/* Mock Post Content */}
                    <div className="mb-4 bg-gray-800/50 rounded-lg p-4 aspect-square flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg mb-2">📱</div>
                        <div className="text-xs text-gray-400">{animatedPost.post.platform} Post</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {animatedPost.post.platform === "TikTok" ? "Fashion try-on haul" :
                           animatedPost.post.platform === "Instagram" ? "Outfit of the day" :
                           "Campus lifestyle content"}
                        </div>
                      </div>
                    </div>

                    {/* Metrics */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Views</span>
                        <motion.span 
                          className="text-sm font-medium"
                          key={animatedPost.metrics.views}
                          initial={{ scale: 1.2, color: "#22d3ee" }}
                          animate={{ scale: 1, color: "#ffffff" }}
                          transition={{ duration: 0.3 }}
                        >
                          {animatedPost.metrics.views.toLocaleString()}
                        </motion.span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Conversions</span>
                        <motion.span 
                          className="text-sm font-medium"
                          key={animatedPost.metrics.conversions}
                          initial={{ scale: 1.2, color: "#10b981" }}
                          animate={{ scale: 1, color: "#ffffff" }}
                          transition={{ duration: 0.3 }}
                        >
                          {animatedPost.metrics.conversions.toLocaleString()}
                        </motion.span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">CTR</span>
                        <span className="text-sm font-medium">
                          {animatedPost.metrics.views > 0 
                            ? ((animatedPost.metrics.conversions / animatedPost.metrics.views) * 100).toFixed(1)
                            : "0.0"
                          }%
                        </span>
                      </div>
                    </div>

                    {/* Progress indicators */}
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Views Progress</span>
                        <span className="text-gray-500">
                          {Math.round((animatedPost.metrics.views / animatedPost.targetViews) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1">
                        <div 
                          className="bg-cyan-400 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(100, (animatedPost.metrics.views / animatedPost.targetViews) * 100)}%` }}
                        />
                      </div>
                    </div>

                    {animatedPost.isComplete && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-3 flex items-center gap-2 text-xs text-green-400"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Target reached</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Campaign Summary */}
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="mt-12 glass rounded-lg p-6 border border-green-400/30 bg-green-400/10"
            >
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-lg font-semibold text-green-400">Campaign Performance Summary</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-green-400">{averageEngagement.toFixed(1)}%</div>
                  <div className="text-sm text-gray-300">Average CTR</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">${(totalConversions * 45).toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Estimated Revenue</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">{animatedPosts.length}</div>
                  <div className="text-sm text-gray-300">Active Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {Math.round((totalViews / totalReach) * 100)}%
                  </div>
                  <div className="text-sm text-gray-300">Reach Efficiency</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
