'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import * as Dialog from '@radix-ui/react-dialog';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Select from '@radix-ui/react-select';
import { loadState, saveState, generateId, generateCritique, type AppState, type Session, type FeedbackItem, type Persona } from '../../../lib/storage';
import { useToast, ToastContainer } from '../../../components/Toast';

// Dynamically import Globe to avoid SSR issues
const Globe = dynamic(() => import('../../../components/Globe'), { ssr: false });

export default function SimulationPage({ params }: { params: { id: string } }) {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<Persona | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [liveTranscription, setLiveTranscription] = useState('');
  const [newSessionOpen, setNewSessionOpen] = useState(false);
  const [newSessionTitle, setNewSessionTitle] = useState('');
  const [currentSociety, setCurrentSociety] = useState('Startup Investors');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [personasProcessed, setPersonasProcessed] = useState(0);
  const [deploymentProgress, setDeploymentProgress] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechUtterance, setSpeechUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toasts, addToast, removeToast } = useToast();

  // Load state on mount and listen for URL params
  useEffect(() => {
    const state = loadState();
    
    // Update state from URL params if present
    const mode = searchParams.get('mode');
    const sessionId = searchParams.get('session');
    const reset = searchParams.get('reset');
    
    // Reset analysis phase if requested
    if (reset === 'true') {
      state.analysisPhase = 'input';
      state.feedback = [];
      state.deploymentProgress = 0;
      setPersonasProcessed(0);
      setDeploymentProgress(0);
      setAnalysisProgress(0);
    }
    
    if (mode && (mode === 'analysis' || mode === 'global')) {
      state.currentMode = mode;
    }
    
    if (sessionId) {
      // Set current session
      state.sessions = state.sessions.map(session => ({
        ...session,
        isCurrent: session.id === sessionId
      }));
    }
    
    // Reset to input phase if stuck in deploying without active deployment
    if (state.analysisPhase === 'deploying' && !isDeploying) {
      state.analysisPhase = 'input';
      state.deploymentProgress = 0;
    }
    
    setAppState(state);
  }, [searchParams]);

  // Save state when it changes
  useEffect(() => {
    if (appState) {
      saveState(appState);
    }
  }, [appState]);

  // Call timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCallActive]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      if (speechUtterance) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechUtterance]);

  // Helper functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentSession = () => {
    return appState?.sessions.find(session => session.isCurrent);
  };

  const updateCurrentMode = (mode: 'analysis' | 'global') => {
    if (!appState) return;
    setAppState({
      ...appState,
      currentMode: mode
    });
    
    // Update URL
    const params = new URLSearchParams(searchParams.toString());
    params.set('mode', mode);
    router.replace(`/simulation/${params.get('id') || params.get('projectId') || 'default'}?${params.toString()}`);
  };

  const handleCreateSession = () => {
    if (!appState || !newSessionTitle.trim()) return;

    const newSession: Session = {
      id: generateId(),
      title: newSessionTitle.trim(),
      createdAt: new Date().toISOString(),
      isCurrent: true,
      analysisInput: newSessionTitle.trim()
    };

    setAppState({
      ...appState,
      sessions: appState.sessions.map(s => ({ ...s, isCurrent: false })).concat(newSession)
    });

    setNewSessionTitle('');
    setNewSessionOpen(false);
    addToast('New analysis session created!', 'success');
  };

  const handleDeleteSession = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent session selection when clicking delete
    if (!appState) return;

    const sessionToDelete = appState.sessions.find(s => s.id === sessionId);
    if (!sessionToDelete) return;

    // If deleting the current session, make another one current
    const remainingSessions = appState.sessions.filter(s => s.id !== sessionId);
    if (remainingSessions.length === 0) {
      addToast('Cannot delete the last session', 'error');
      return;
    }

    let updatedSessions = remainingSessions;
    if (sessionToDelete.isCurrent && remainingSessions.length > 0) {
      updatedSessions = remainingSessions.map((s, index) => ({
        ...s,
        isCurrent: index === 0 // Make first remaining session current
      }));
    }

    setAppState({
      ...appState,
      sessions: updatedSessions
    });

    addToast('Session deleted successfully', 'success');
  };

  const handleStartAnalysis = () => {
    if (!appState) return;
    
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setPersonasProcessed(0);
    setAppState({
      ...appState,
      analysisPhase: 'analyzing'
    });
    
    addToast('Starting AI analysis...', 'info');
    
    const totalPersonas = appState.personas.length;
    
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsAnalyzing(false);
          setPersonasProcessed(totalPersonas);
          setAppState(currentState => currentState ? {
            ...currentState,
            analysisPhase: 'complete'
          } : currentState);
          addToast('Analysis complete! Ready for deployment.', 'success');
          return 100;
        }
        
        // Update personas processed based on progress
        const newProgress = prev + 1.5;
        const newPersonasProcessed = Math.floor((newProgress / 100) * totalPersonas);
        setPersonasProcessed(newPersonasProcessed);
        
        return newProgress;
      });
    }, 80);
  };

  const handleDeploy = () => {
    if (!appState) return;
    
    const isGlobalMode = appState.currentMode === 'global';
    const deploymentType = isGlobalMode ? 'globally' : 'locally';
    const agentMultiplier = isGlobalMode ? 1 : 0.3; // Global gets full personas, local gets 30%
    const deploymentPersonas = Math.floor(appState.personas.length * agentMultiplier);
    
    setIsDeploying(true);
    setDeploymentProgress(0);
    setAppState({
      ...appState,
      analysisPhase: 'deploying'
    });
    
    addToast(`Deploying ${deploymentType}... ${deploymentPersonas} agents activated`, 'info');
    
    const interval = setInterval(() => {
      setDeploymentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDeploying(false);
          setAppState(currentState => currentState ? {
            ...currentState,
            analysisPhase: 'complete'
          } : currentState);
          addToast(`Deployment complete! ${deploymentPersonas} agents ${isGlobalMode ? 'worldwide' : 'in local region'} are now active.`, 'success');
          return 100;
        }
        return prev + 1.5;
      });
    }, 100);
  };

  const startCall = (persona: Persona) => {
    setSelectedPersona(persona);
    setIsCallActive(true);
    setCallDuration(0);
    
    // Generate and speak critique
    const currentSession = getCurrentSession();
    const critique = generateCritique(persona, currentSession?.analysisInput || 'your project');
    setLiveTranscription(critique);
    
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(critique);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      setSpeechUtterance(utterance);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleMute = () => {
    if (isSpeaking && speechUtterance) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const addToFeedback = () => {
    if (!appState || !selectedPersona) return;

    const currentSession = getCurrentSession();
    const feedbackItem: FeedbackItem = {
      id: generateId(),
      personaId: selectedPersona.id,
      personaName: selectedPersona.name,
      feedback: liveTranscription || selectedPersona.quote,
      timestamp: new Date().toISOString(),
      sessionId: currentSession?.id || 'default'
    };

    setAppState({
      ...appState,
      feedback: [...appState.feedback, feedbackItem]
    });
    
    addToast(`Feedback from ${selectedPersona.name} added!`, 'success');
  };

  const endCall = () => {
    if (speechUtterance) {
      window.speechSynthesis.cancel();
    }
    setIsCallActive(false);
    setSelectedPersona(null);
    setCallDuration(0);
    setLiveTranscription('');
    setIsSpeaking(false);
    setSpeechUtterance(null);
  };

  const handleShareSimulation = async () => {
    const url = window.location.href;
    
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      addToast('Simulation link copied to clipboard!', 'success');
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      addToast('Failed to copy link to clipboard', 'error');
    }
  };

  const handleExportData = () => {
    if (!appState) return;

    const dataToExport = {
      ...appState,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tunnel-simulation-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    addToast('Simulation data exported successfully!', 'success');
  };

  if (!appState) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading simulation...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/10 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Projects View
          </Link>
          
          <div className="mb-4">
            <h1 className="text-lg font-semibold mb-1">Current Society</h1>
            <Select.Root value={currentSociety} onValueChange={setCurrentSociety}>
              <Select.Trigger className="flex items-center justify-between w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm font-medium hover:bg-white/20 transition-all">
                <Select.Value />
                <Select.Icon>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Select.Icon>
              </Select.Trigger>
              <Select.Portal>
                <Select.Content className="bg-black border border-white/20 rounded-lg p-1 shadow-lg">
                  <Select.Viewport>
                    {['Startup Investors', 'Tech Entrepreneurs', 'Marketing Professionals', 'Finance Experts', 'Gen X Consumers'].map((society) => (
                      <Select.Item
                        key={society}
                        value={society}
                        className="px-3 py-2 text-sm hover:bg-white/10 rounded cursor-pointer"
                      >
                        <Select.ItemText>{society}</Select.ItemText>
                      </Select.Item>
                    ))}
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <button 
            onClick={() => setNewSessionOpen(true)}
            className="w-full btn-hover bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm font-medium mb-4"
          >
            + Create New Session
          </button>
        </div>

        {/* Analysis Sessions */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h3 className="text-sm font-semibold mb-3">Analysis Sessions</h3>
          
          <div className="space-y-3">
            {appState.sessions.map((session) => (
              <div 
                key={session.id}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  session.isCurrent 
                    ? 'bg-white/10 border-white/20' 
                    : 'bg-white/5 border-white/10 hover:border-white/15'
                }`}
                onClick={() => {
                  setAppState({
                    ...appState,
                    sessions: appState.sessions.map(s => ({
                      ...s,
                      isCurrent: s.id === session.id
                    }))
                  });
                }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    {session.isCurrent && <div className="w-2 h-2 bg-yellow-500 rounded-full" />}
                    <span className="text-sm font-medium">
                      {session.isCurrent ? 'Current' : 'Session'}
                    </span>
                  </div>
                  {appState.sessions.length > 1 && (
                    <button
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      className="text-gray-400 hover:text-red-400 transition-colors p-1"
                      title="Delete session"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-2 line-clamp-2">{session.title}</p>
                <p className="text-xs text-gray-500">
                  {new Date(session.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-400 mb-1">{appState.personas.length} personas loaded</p>
            <p className="text-xs text-gray-500">
              {appState.analysisPhase === 'analyzing' ? `Analysis in progress (${personasProcessed} processed)` : 
               appState.analysisPhase === 'complete' ? 'Analysis complete' :
               appState.analysisPhase === 'deploying' ? 'Deploying globally...' :
               'Ready for analysis'}
            </p>
          </div>
        </div>

        {/* Version */}
        <div className="p-3 border-t border-white/10">
          <p className="text-xs text-gray-500">Version 2.1</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="border-b border-white/10 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ToggleGroup.Root 
                type="single" 
                value={appState.currentMode} 
                onValueChange={(value) => value && updateCurrentMode(value as 'analysis' | 'global')}
                className="flex items-center gap-1 bg-gray-800 rounded-lg p-1"
              >
                <ToggleGroup.Item 
                  value="analysis"
                  className="px-3 py-1 text-sm font-medium rounded transition-all data-[state=on]:bg-white data-[state=on]:text-black"
                >
                  ANALYSIS MODE
                </ToggleGroup.Item>
                <ToggleGroup.Item 
                  value="global"
                  className="px-3 py-1 text-sm font-medium rounded transition-all data-[state=on]:bg-white data-[state=on]:text-black"
                >
                  GLOBAL MODE
                </ToggleGroup.Item>
              </ToggleGroup.Root>
              
              {appState.analysisPhase === 'complete' && (
                <span className="text-sm bg-green-600 px-3 py-1 rounded">✓ Analysis Complete</span>
              )}
              {appState.analysisPhase === 'deploying' && (
                <span className="text-sm bg-blue-600 px-3 py-1 rounded">🌍 Deploying Globally...</span>
              )}
              {appState.analysisPhase === 'analyzing' && (
                <span className="text-sm bg-yellow-600 px-3 py-1 rounded">⚡ Analyzing... {Math.round(analysisProgress)}% ({personasProcessed}/{appState.personas.length} personas)</span>
              )}
              {appState.analysisPhase === 'input' && (
                <span className="text-sm bg-gray-600 px-3 py-1 rounded">Ready to Analyze</span>
              )}
              
              <span className="text-sm text-gray-400">Global</span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>
                  {appState.analysisPhase === 'analyzing' ? personasProcessed :
                   appState.analysisPhase === 'complete' || appState.analysisPhase === 'deploying' ? appState.personas.length :
                   0} Selected Users
                </span>
                <div className="w-2 h-2 bg-gray-600 rounded-full" />
                <span>
                  {appState.analysisPhase === 'analyzing' ? appState.personas.length - personasProcessed :
                   appState.analysisPhase === 'complete' || appState.analysisPhase === 'deploying' ? Math.floor(appState.personas.length * 6.8) :
                   Math.floor(appState.personas.length * 7.2)} Other Users
                </span>
              </div>
              
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    Share Simulation
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="bg-black border border-white/20 rounded-lg p-1 shadow-lg">
                    <DropdownMenu.Item 
                      onClick={handleShareSimulation}
                      className="px-3 py-2 text-sm hover:bg-white/10 rounded cursor-pointer"
                    >
                      Copy Link
                    </DropdownMenu.Item>
                    <DropdownMenu.Item 
                      onClick={handleExportData}
                      className="px-3 py-2 text-sm hover:bg-white/10 rounded cursor-pointer"
                    >
                      Export JSON
                    </DropdownMenu.Item>
                    <DropdownMenu.Item 
                      onClick={() => {/* Reset view logic */}}
                      className="px-3 py-2 text-sm hover:bg-white/10 rounded cursor-pointer"
                    >
                      Reset View
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          </div>
        </div>

        {/* Main Globe and Side Panel */}
        <div className="flex-1 flex overflow-hidden">
          {/* Globe Section */}
          <div className="flex-1 p-4">
            <div className="h-full relative">
              {appState.analysisPhase === 'deploying' && (
                <div className="absolute top-4 left-4 z-10 glass rounded-lg p-4 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold">Deploying Globally...</span>
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    Found {appState.currentMode === 'global' ? appState.personas.length : Math.floor(appState.personas.length * 0.3)} most relevant personas in: Financial Technology
                  </div>
                  <div className="text-xs text-gray-400 mb-2">
                    Personas Processed: {Math.floor((deploymentProgress / 100) * (appState.currentMode === 'global' ? appState.personas.length : Math.floor(appState.personas.length * 0.3)))} / {appState.currentMode === 'global' ? appState.personas.length : Math.floor(appState.personas.length * 0.3)}
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
              
              <Globe 
                className="w-full h-full" 
                personas={appState.personas}
                onPersonaClick={(persona) => setSelectedPersona(persona)}
              />
              
              {/* Input Box */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
                <div className="glass rounded-lg p-3 border border-white/10">
                  <div className="flex items-center gap-3">
                    {appState.analysisPhase === 'deploying' ? (
                      <>
                        <div className="flex-1">
                          <div className="text-sm text-blue-400 mb-1">🌍 Deploying globally...</div>
                          <div className="text-xs text-gray-400">
                            Progress: {deploymentProgress}% • {appState.personas.length} personas • ETA: 20s
                          </div>
                          <div className="w-full bg-gray-800 rounded-full h-1 mt-2">
                            <div 
                              className="bg-blue-400 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${deploymentProgress}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            disabled
                            className="btn-hover bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-75 cursor-not-allowed"
                          >
                            Deploying... {deploymentProgress}%
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <textarea
                          value={getCurrentSession()?.analysisInput || ''}
                          onChange={(e) => {
                            const currentSession = getCurrentSession();
                            if (currentSession && appState) {
                              setAppState({
                                ...appState,
                                sessions: appState.sessions.map(s => 
                                  s.id === currentSession.id 
                                    ? { ...s, analysisInput: e.target.value }
                                    : s
                                )
                              });
                            }
                          }}
                          placeholder="Enter your idea to analyze against personas..."
                          className="flex-1 bg-transparent resize-none outline-none text-sm placeholder-gray-400"
                          rows={2}
                          disabled={appState.analysisPhase === 'analyzing'}
                        />
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-400">Focus Group</span>
                          {appState.analysisPhase === 'complete' ? (
                            <button
                              onClick={handleDeploy}
                              className="btn-hover bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                            >
                              Deploy
                            </button>
                          ) : appState.analysisPhase === 'analyzing' ? (
                            <button
                              disabled
                              className="btn-hover bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium opacity-75 cursor-not-allowed"
                            >
                              Analyzing... {Math.round(analysisProgress)}%
                            </button>
                          ) : (
                            <button
                              onClick={handleStartAnalysis}
                              disabled={isAnalyzing}
                              className="btn-hover bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                            >
                              Start Analysis
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  
                  {appState.analysisPhase === 'analyzing' && (
                    <div className="mt-3">
                      <div className="text-xs text-gray-400 mb-1">
                        AI is analyzing your concept... ({personasProcessed}/{appState.personas.length} personas processed)
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1 mt-2">
                        <div 
                          className="bg-gradient-to-r from-cyan-400 to-blue-600 h-1 rounded-full transition-all duration-300"
                          style={{ width: `${analysisProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {appState.analysisPhase === 'complete' && (
                    <div className="mt-3">
                      <div className="text-xs text-green-400 mb-1">
                        ✓ Analysis complete! Ready to deploy globally and gather live reactions.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Panel */}
          <div className="w-96 border-l border-white/10 flex flex-col overflow-hidden">
            {/* Mission Status */}
            <div className="p-4 border-b border-white/10">
              <div className="glass rounded-lg p-3 border border-white/10 mb-3">
                <div className="flex items-center gap-2 mb-2">
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

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    <span className="text-xs font-medium">HIGH ENGAGEMENT</span>
                    <span className="ml-auto text-xs">0</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1 mb-2">
                    <div className="bg-green-400 h-1 rounded-full w-0" />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    <span className="text-xs font-medium">MEDIUM ENGAGEMENT</span>
                    <span className="ml-auto text-xs">82</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1 mb-2">
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

            {/* Live Reactions or Analysis Prompt */}
            {(appState.analysisPhase === 'complete' || appState.analysisPhase === 'deploying') ? (
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <span className="text-sm font-semibold">LIVE REACTIONS</span>
                  <span className="ml-auto text-xs text-gray-400">
                    {appState.analysisPhase === 'complete' || appState.analysisPhase === 'deploying' ? 
                      `${appState.personas.length} RESPONSES` : 
                      'WAITING FOR ANALYSIS'
                    }
                  </span>
                </div>

                <div className="space-y-3">
                  {appState.personas.slice(0, 6).map((persona) => (
                    <motion.div
                      key={persona.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="glass rounded-lg p-3 border border-white/10 cursor-pointer hover:border-white/20 transition-all"
                      onClick={() => setSelectedPersona(persona)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold">
                          {persona.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium truncate">{persona.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              persona.reaction === 'full' ? 'bg-green-600' :
                              persona.reaction === 'partial' ? 'bg-yellow-600' : 'bg-red-600'
                            }`}>
                              {persona.reaction}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2">
                            {persona.quote?.substring(0, 60)}...
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
            ) : (
              <div className="flex-1 p-4 flex items-center justify-center">
                <div className="text-center max-w-sm">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Ready to Analyze</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {appState.analysisPhase === 'analyzing' 
                      ? `AI is analyzing your concept... (${personasProcessed}/${appState.personas.length} personas processed)` 
                      : 'Click "Start Analysis" to begin evaluating your idea against AI personas'
                    }
                  </p>
                  {appState.analysisPhase === 'analyzing' && (
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${analysisProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Feedback List */}
            <div className="p-6 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-orange-400 rounded-full" />
                <span className="text-sm font-semibold">FEEDBACK LIST ({appState.feedback.length})</span>
              </div>
              {appState.feedback.length === 0 ? (
                <p className="text-xs text-gray-400">No feedback collected yet</p>
              ) : (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {appState.feedback.slice(-3).map((feedback) => (
                    <div key={feedback.id} className="text-xs">
                      <div className="font-medium text-white">{feedback.personaName}</div>
                      <p className="text-gray-400 truncate">{feedback.feedback.substring(0, 50)}...</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Analysis Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-sm font-semibold">ANALYSIS INPUT</span>
              </div>
              <div className="glass rounded-lg p-3 border border-white/10">
                <p className="text-sm">{getCurrentSession()?.analysisInput || 'No input provided'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Persona Detail Modal */}
      <AnimatePresence>
        {selectedPersona && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6"
            onClick={() => setSelectedPersona(null)}
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
                  <h3 className="text-xl font-bold">{selectedPersona.name}</h3>
                  <p className="text-gray-400">Title: {selectedPersona.title}</p>
                  <p className="text-gray-400">Location: {selectedPersona.location}</p>
                  <p className="text-gray-400">Generation: {selectedPersona.generation}</p>
                  <p className="text-gray-400">Industry: {selectedPersona.industry}</p>
                </div>
                <button
                  onClick={() => setSelectedPersona(null)}
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
                    selectedPersona.reaction === 'full' ? 'bg-green-600' :
                    selectedPersona.reaction === 'partial' ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    {selectedPersona.reaction}
                  </span>
                </div>
                <p className="text-sm text-gray-300">{selectedPersona.quote}</p>
              </div>

              {!isCallActive ? (
                <div className="flex gap-3">
                  <button
                    onClick={() => startCall(selectedPersona)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium btn-hover flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call {selectedPersona.name.split(' ')[0]}
                  </button>
                  <button
                    onClick={() => setSelectedPersona(null)}
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
                    <button 
                      onClick={toggleMute}
                      className="flex-1 bg-white/10 border border-white/20 rounded-lg py-3 font-medium btn-hover flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      {isSpeaking ? 'Mute' : 'Muted'}
                    </button>
                    <button 
                      onClick={addToFeedback}
                      className="px-6 py-3 bg-orange-600 text-white rounded-lg font-medium btn-hover"
                    >
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

      {/* New Session Dialog */}
      <Dialog.Root open={newSessionOpen} onOpenChange={setNewSessionOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-6 border border-white/10 max-w-md w-full mx-4 z-50">
            <Dialog.Title className="text-xl font-bold mb-4">Create New Analysis Session</Dialog.Title>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Session Title / Analysis Question</label>
                <textarea
                  value={newSessionTitle}
                  onChange={(e) => setNewSessionTitle(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none"
                  rows={3}
                  placeholder="Describe what you want to analyze (e.g., 'I want to create a fintech app for Gen X in Canada')..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateSession}
                disabled={!newSessionTitle.trim()}
                className="flex-1 bg-white text-black py-3 rounded-lg font-medium btn-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Session
              </button>
              <Dialog.Close asChild>
                <button className="px-6 py-3 border border-white/20 rounded-lg font-medium btn-hover transition-all">
                  Cancel
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
