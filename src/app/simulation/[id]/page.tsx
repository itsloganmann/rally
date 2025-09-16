'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('../../../components/Globe'), { ssr: false });

interface User {
  id: string;
  name: string;
  title: string;
  location: string;
  generation: string;
  industry: string;
  reaction: 'full' | 'partial' | 'negative';
  quote?: string;
}

const sampleUsers: User[] = [
  {
    id: '1',
    name: 'James Wilson',
    title: 'CEO',
    location: 'Toronto, Canada',
    generation: 'Gen X',
    industry: 'Fintech',
    reaction: 'full',
    quote: "I like the focus on my generation, there's a gap in the market for fintech solutions tailored for Gen X. I'd be keen to understand how the app plans to address the specific needs and behaviors of this demographic, especially when it comes to investing and financial planning for the future."
  },
  {
    id: '2',
    name: 'Hiroshi Tanaka',
    title: 'Software Engineer',
    location: 'Tokyo, Japan',
    generation: 'Millennial',
    industry: 'Software Development',
    reaction: 'partial',
    quote: "I see the potential in this idea, especially with the older generation's increasing familiarity with digital tools. Perhaps consider a more inclusive approach that targets a wider age range, or adapt the app for the Singaporean market as well, to cater to a broader user base."
  },
  {
    id: '3',
    name: 'Michelle Johnson',
    title: 'Marketing Director',
    location: 'Vancouver, Canada',
    generation: 'Gen Z',
    industry: 'Marketing',
    reaction: 'partial',
    quote: "I'd be curious to understand how the app intends to address the identified benefits. The focus is Gen X Canadians could be smart, but the execution needs to be flawless."
  }
];

export default function SimulationPage({ params }: { params: { id: string } }) {
  const [currentAnalysis, setCurrentAnalysis] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [analysisPhase, setAnalysisPhase] = useState<'input' | 'analyzing' | 'complete' | 'deploying'>('complete');
  const [inputText, setInputText] = useState('I want to create a fintech app for gen x in canada');
  const [showLiveReactions, setShowLiveReactions] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [liveTranscription, setLiveTranscription] = useState('I have mixed feelings');

  useEffect(() => {
    if (isCallActive) {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setAnalysisPhase('analyzing');
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setAnalysisPhase('complete');
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleDeploy = () => {
    setIsDeploying(true);
    setAnalysisPhase('deploying');
    setDeploymentProgress(0);
    
    const interval = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          setShowLiveReactions(true);
          return 100;
        }
        return prev + 1.5;
      });
    }, 100);
  };

  const startCall = (user: User) => {
    setSelectedUser(user);
    setIsCallActive(true);
    setCallDuration(0);
  };

  const endCall = () => {
    setIsCallActive(false);
    setSelectedUser(null);
    setCallDuration(0);
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Projects View
          </Link>
          
          <div className="mb-4">
            <h1 className="text-lg font-semibold mb-1">Current Society</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Startup Investors</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <button className="w-full btn-hover bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm font-medium mb-4">
            + Create New Session
          </button>
        </div>

        {/* Analysis Sessions */}
        <div className="flex-1 p-6">
          <h3 className="text-sm font-semibold mb-4">Analysis Sessions</h3>
          
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                {analysisPhase === 'complete' && <div className="w-2 h-2 bg-yellow-500 rounded-full" />}
                <span className="text-sm">Unsaved</span>
              </div>
              <p className="text-xs text-gray-400 mb-2">I want to create a fintech app for gen x in canada</p>
              <p className="text-xs text-gray-500">9/14/2025</p>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 mb-2">I want to build a fintech...</p>
              <p className="text-xs text-gray-500">9/14/2025</p>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 mb-2">I want to create a fintech...</p>
              <p className="text-xs text-gray-500">9/14/2025</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400 mb-2">199 Auth0 users loaded</p>
            <p className="text-xs text-gray-500">No analysis running</p>
          </div>
        </div>

        {/* Version */}
        <div className="p-6 border-t border-white/10">
          <p className="text-xs text-gray-500">Version 2.1</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm bg-gray-800 px-3 py-1 rounded">ANALYSIS MODE</span>
              {analysisPhase === 'complete' && (
                <span className="text-sm bg-gray-600 px-3 py-1 rounded">Analysis Complete</span>
              )}
              {analysisPhase === 'deploying' && (
                <span className="text-sm bg-blue-600 px-3 py-1 rounded">Deploying Globally...</span>
              )}
              <span className="text-sm text-gray-400">Global</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>199 Selected Users</span>
                <div className="w-2 h-2 bg-gray-600 rounded-full" />
                <span>174 Other Users</span>
              </div>
              
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share Simulation
              </button>
            </div>
          </div>
        </div>

        {/* Main Globe and Side Panel */}
        <div className="flex-1 flex">
          {/* Globe Section */}
          <div className="flex-1 p-6">
            <div className="h-full relative">
              {analysisPhase === 'deploying' && (
                <div className="absolute top-4 left-4 z-10 glass rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold">Deploying Globally...</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    Found 25 most relevant personas in: Financial Technology
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    Personas Processed: 0 / 199
                  </div>
                  <div className="w-48 bg-gray-800 rounded-full h-1 mb-2">
                    <div 
                      className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${deploymentProgress}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400">
                    Progress: {deploymentProgress}% ETA: 20s
                  </div>
                </div>
              )}
              
              <Globe className="w-full h-full" />
              
              {/* Input Box */}
              {analysisPhase !== 'deploying' && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
                  <div className="glass rounded-lg p-4 border border-white/10">
                    <div className="flex items-center gap-3">
                      <textarea
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Enter your idea to analyze against personas..."
                        className="flex-1 bg-transparent resize-none outline-none text-sm placeholder-gray-400"
                        rows={2}
                        disabled={analysisPhase === 'analyzing'}
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Focus Group</span>
                        {analysisPhase === 'complete' ? (
                          <button
                            onClick={handleDeploy}
                            className="btn-hover bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                          >
                            Analyze
                          </button>
                        ) : (
                          <button
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="btn-hover bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                          >
                            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {analysisPhase === 'analyzing' && (
                      <div className="mt-3">
                        <div className="text-xs text-gray-400 mb-1">
                          When you're ready, deploy your idea to the whole world
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Side Panel */}
          <div className="w-96 border-l border-white/10 flex flex-col">
            {/* Mission Status */}
            <div className="p-6 border-b border-white/10">
              <div className="glass rounded-lg p-4 border border-white/10 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <span className="text-sm font-semibold">MISSION STATUS</span>
                  <span className="ml-auto text-sm text-gray-400">ACTIVE</span>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-gray-400 mb-1">Impact Score</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-800 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-400 to-blue-600 h-2 rounded-full w-2/3" />
                    </div>
                    <span className="text-sm">47</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">-5% Status: MODERATE</div>
                </div>
              </div>

              <div className="glass rounded-lg p-4 border border-white/10 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full" />
                  <span className="text-sm font-semibold">AGENT ACTIVITY</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4">
                  <div>
                    <div className="text-lg font-bold">0</div>
                    <div className="text-gray-400">High</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">139</div>
                    <div className="text-gray-400">Medium</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">11</div>
                    <div className="text-gray-400">Low</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-xs font-medium">HIGH ENGAGEMENT</span>
                    <span className="ml-auto text-xs">0</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1">
                    <div className="bg-green-400 h-1 rounded-full w-0" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-xs font-medium">MEDIUM ENGAGEMENT</span>
                    <span className="ml-auto text-xs">82</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1">
                    <div className="bg-yellow-400 h-1 rounded-full w-4/5" />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full" />
                    <span className="text-xs font-medium">LOW ENGAGEMENT</span>
                    <span className="ml-auto text-xs">17</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1">
                    <div className="bg-red-400 h-1 rounded-full w-1/5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Live Reactions */}
            {showLiveReactions && (
              <div className="flex-1 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <span className="text-sm font-semibold">LIVE REACTIONS</span>
                  <span className="ml-auto text-xs text-gray-400">168 RESPONSES</span>
                </div>

                <div className="space-y-3">
                  {sampleUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass rounded-lg p-3 border border-white/10 cursor-pointer hover:border-white/20 transition-all"
                      onClick={() => setSelectedUser(user)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium truncate">{user.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              user.reaction === 'full' ? 'bg-green-600' :
                              user.reaction === 'partial' ? 'bg-yellow-600' : 'bg-red-600'
                            }`}>
                              {user.reaction}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {user.quote?.substring(0, 60)}...
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                    → INITIATE FOLLOW-UP PROTOCOL
                  </button>
                </div>
              </div>
            )}

            {/* Feedback List */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-orange-400 rounded-full" />
                <span className="text-sm font-semibold">FEEDBACK LIST (0)</span>
              </div>
              <p className="text-xs text-gray-400">No feedback collected yet</p>
            </div>

            {/* Analysis Input */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-sm font-semibold">ANALYSIS INPUT</span>
              </div>
              <div className="glass rounded-lg p-3 border border-white/10">
                <p className="text-sm">{inputText}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Detail Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass rounded-2xl p-6 border border-white/10 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedUser.name}</h3>
                  <p className="text-gray-400">Title: {selectedUser.title}</p>
                  <p className="text-gray-400">Location: {selectedUser.location}</p>
                  <p className="text-gray-400">Generation: {selectedUser.generation}</p>
                  <p className="text-gray-400">Industry: {selectedUser.industry}</p>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-semibold">Reaction</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    selectedUser.reaction === 'full' ? 'bg-green-600' :
                    selectedUser.reaction === 'partial' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {selectedUser.reaction}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{selectedUser.quote}</p>
              </div>

              {!isCallActive ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => startCall(selectedUser)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium btn-hover flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call {selectedUser.name.split(' ')[0]}
                  </button>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="px-6 py-3 border border-white/20 rounded-lg font-medium btn-hover"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="glass rounded-lg p-4 border border-green-400/30">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm font-semibold text-green-400">LIVE CALL</span>
                      <span className="ml-auto text-sm">{formatTime(callDuration)}</span>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-xs text-gray-400 mb-1">LIVE TRANSCRIPTION:</p>
                      <p className="text-sm bg-black/30 rounded p-2 font-mono">
                        {liveTranscription}
                        <span className="animate-pulse">|</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-white/10 border border-white/20 rounded-lg py-3 font-medium btn-hover flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </button>
                    <button className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium btn-hover">
                      Add to Feedback
                    </button>
                    <button
                      onClick={endCall}
                      className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium btn-hover"
                    >
                      End Call & Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
