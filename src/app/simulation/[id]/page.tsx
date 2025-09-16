'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast, ToastContainer } from '../../../components/Toast';
import { getInfluencersByIds, calculateTotalFollowers, formatFollowerCount, type Influencer } from '../../../lib/influencers';
import Image from 'next/image';

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
  const searchParams = useSearchParams();
  const { toasts, addToast, removeToast } = useToast();
  
  const selectedIds = searchParams.get('ids')?.split(',') || [];
  const selectedInfluencers = useMemo(() => getInfluencersByIds(selectedIds), [selectedIds]);
  
  const [isStarted, setIsStarted] = useState(false);
  const [posts, setPosts] = useState<AnimatedPost[]>([]);
  const [hasShownMilestones, setHasShownMilestones] = useState({
    started: false,
    halfway: false,
    completed: false
  });

  // Initialize posts when component mounts
  useEffect(() => {
    if (selectedInfluencers.length > 0) {
      const initialPosts: AnimatedPost[] = [];
      
      selectedInfluencers.forEach(influencer => {
        influencer.examplePosts.forEach(post => {
          initialPosts.push({
            id: `${influencer.id}-${post.id}`,
            influencer,
            post,
            metrics: {
              views: 0,
              conversions: 0
            },
            targetViews: post.targetViews,
            targetConversions: post.targetConversions,
            isComplete: false
          });
        });
      });
      
      setPosts(initialPosts);
    }
  }, [selectedInfluencers]);

  const totalMetrics = useMemo(() => {
    return posts.reduce((acc, post) => ({
      views: acc.views + post.metrics.views,
      conversions: acc.conversions + post.metrics.conversions
    }), { views: 0, conversions: 0 });
  }, [posts]);

  const totalReach = useMemo(() => {
    return calculateTotalFollowers(selectedInfluencers);
  }, [selectedInfluencers]);

  const startSimulation = () => {
    setIsStarted(true);
    if (!hasShownMilestones.started) {
      addToast('Campaign deployment started!', 'info');
      setHasShownMilestones(prev => ({ ...prev, started: true }));
    }
  };

  // Animation effect for metrics
  useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(() => {
      setPosts(currentPosts => {
        let hasChanges = false;
        let completedCount = 0;
        
        const updatedPosts = currentPosts.map(post => {
          if (post.isComplete) {
            completedCount++;
            return post;
          }

          const viewsIncrement = Math.ceil(post.targetViews * 0.08 * (0.8 + Math.random() * 0.4));
          const conversionsIncrement = Math.ceil(post.targetConversions * 0.08 * (0.8 + Math.random() * 0.4));
          
          const newViews = Math.min(post.metrics.views + viewsIncrement, post.targetViews);
          const newConversions = Math.min(post.metrics.conversions + conversionsIncrement, post.targetConversions);
          
          const isComplete = newViews >= post.targetViews && newConversions >= post.targetConversions;
          if (isComplete) completedCount++;
          
          if (newViews !== post.metrics.views || newConversions !== post.metrics.conversions) {
            hasChanges = true;
          }

          return {
            ...post,
            metrics: {
              views: newViews,
              conversions: newConversions
            },
            isComplete
          };
        });

        // Show milestone notifications only once
        const totalPosts = currentPosts.length;
        const halfwayPoint = Math.ceil(totalPosts / 2);
        
        if (completedCount >= halfwayPoint && !hasShownMilestones.halfway) {
          addToast('Campaign is performing excellently!', 'success');
          setHasShownMilestones(prev => ({ ...prev, halfway: true }));
        }
        
        if (completedCount === totalPosts && !hasShownMilestones.completed) {
          addToast('All posts are performing excellently!', 'success');
          setHasShownMilestones(prev => ({ ...prev, completed: true }));
        }

        return hasChanges ? updatedPosts : currentPosts;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [isStarted, hasShownMilestones, addToast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/brands/recommendations" className="text-blue-400 hover:text-blue-300">
              ← Back
            </Link>
            <div>
              <h1 className="text-3xl font-bold">Campaign Simulation</h1>
              <p className="text-gray-400">
                {selectedInfluencers.length} influencer{selectedInfluencers.length !== 1 ? 's' : ''} selected
              </p>
            </div>
          </div>
          
          {!isStarted && (
            <button
              onClick={startSimulation}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Deploy Campaign
            </button>
          )}
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold">{selectedInfluencers.length}</div>
            <div className="text-gray-400">Selected Influencers</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold">{formatFollowerCount(totalReach)}</div>
            <div className="text-gray-400">Total Reach</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold">
              {totalMetrics.views.toLocaleString()}
            </div>
            <div className="text-gray-400">Total Views</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <div className="text-2xl font-bold">
              {totalMetrics.conversions.toLocaleString()}
            </div>
            <div className="text-gray-400">Conversions</div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {posts.map((animatedPost) => (
              <motion.div
                key={animatedPost.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-gray-800 rounded-lg overflow-hidden"
              >
                {/* Influencer Header */}
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {animatedPost.influencer.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{animatedPost.influencer.name}</div>
                      <div className="text-xs text-gray-400">{animatedPost.influencer.college}</div>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <div className="aspect-square bg-gray-700 flex items-center justify-center relative overflow-hidden">
                  {/* Post image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={animatedPost.post.mediaUrl}
                      alt={animatedPost.post.description}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div class="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                              <div class="text-center text-white">
                                <div class="text-2xl mb-2">📱</div>
                                <div class="text-sm font-semibold">${animatedPost.post.platform} Post</div>
                                <div class="text-xs opacity-75">${animatedPost.post.description}</div>
                              </div>
                            </div>
                          `;
                        }
                      }}
                    />
                  </div>
                  
                  {/* Platform badge */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs font-semibold">
                    {animatedPost.post.platform}
                  </div>

                  {/* Engagement overlay */}
                  <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs">
                    {animatedPost.post.description}
                  </div>
                </div>

                {/* Metrics */}
                <div className="p-4 space-y-3">
                  <div>
                    <div className="text-sm text-gray-400">Views</div>
                    <div className="text-xl font-bold">
                      {animatedPost.metrics.views.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Conversions</div>
                    <div className="text-xl font-bold">
                      {animatedPost.metrics.conversions.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">CTR</div>
                    <div className="text-lg font-bold">
                      {animatedPost.metrics.views > 0 
                        ? ((animatedPost.metrics.conversions / animatedPost.metrics.views) * 100).toFixed(1)
                        : '0.0'
                      }%
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{Math.round((animatedPost.metrics.views / animatedPost.targetViews) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, (animatedPost.metrics.views / animatedPost.targetViews) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Completion indicator */}
                  {animatedPost.isComplete && (
                    <div className="flex items-center gap-2 text-green-400 text-sm">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>Target Reached</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
