'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RallyLandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation is now in RootLayout */}

      {/* Hero Section */}
      <main className="relative min-h-screen flex items-center justify-center">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          {/* Dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-black/40 z-10" />
        </div>

        {/* Latest Update Banner */}
        <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 text-sm"
          >
            <span className="text-gray-400">Latest update</span>
            <span>AI-Powered Matching Is Here!</span>
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6 mt-20 md:mt-28 lg:mt-36">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight text-white drop-shadow-2xl"
            style={{ 
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.5)' 
            }}
          >
            Connect brands with
            <br />
            <span className="text-gradient drop-shadow-2xl">authentic campus voices</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto drop-shadow-lg"
            style={{ 
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)' 
            }}
          >
            Rally connects college students and campus micro‑influencers with brands through a smart two‑sided marketplace using AI-powered resume parsing and vector database semantic matching.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/brands/onboarding">
              <button className="btn-hover bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-2 mx-auto">
                Get Started
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Bottom Preview Section moved below hero */}
      </main>

      {/* Preview Section */}
      <section className="relative z-20 w-full px-6 pb-16 pt-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="glass rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">R</span>
              </div>
              <span className="font-semibold">Rally</span>
              <div className="ml-auto flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Live Matching
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
              <span>← Brand Dashboard</span>
              <span className="bg-gray-800 px-3 py-1 rounded">CAMPAIGN MATCH</span>
              <span className="bg-blue-600 px-3 py-1 rounded">Fashion Brand Demo</span>
              <span>Global</span>
              <div className="ml-auto flex items-center gap-2">
                <span>• 127 Matched Influencers</span>
                <span>• 892K Total Reach</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-3">
                <div className="relative h-64 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl overflow-hidden">
                  {/* Globe placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 border border-cyan-400/30 rounded-full flex items-center justify-center">
                      <div className="w-32 h-32 border border-cyan-400/50 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                    </div>
                    {/* Simulate dots */}
                    <div className="absolute top-16 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                    <div className="absolute top-32 right-16 w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                    <div className="absolute bottom-20 left-32 w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute bottom-16 right-20 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-sm font-semibold">MATCH STATUS</span>
                    <span className="ml-auto text-sm text-gray-400">ACTIVE</span>
                  </div>
                  <div className="text-sm text-gray-400 mb-2">Fit Score</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-600 h-2 rounded-full w-5/6" />
                    </div>
                    <span className="text-sm">94</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Status: EXCELLENT</div>
                </div>

                <div className="glass rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-sm font-semibold">REACH BREAKDOWN</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div>
                      <div className="text-lg font-bold">12</div>
                      <div className="text-gray-400">High</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">86</div>
                      <div className="text-gray-400">Medium</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">29</div>
                      <div className="text-gray-400">Nano</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
