'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { loadState, saveState, clearState, generateId, formatDate, type AppState, type Project } from '../../lib/storage';

export default function Dashboard() {
  const [appState, setAppState] = useState<AppState | null>(null);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [newProjectOpen, setNewProjectOpen] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState({
    name: '',
    description: '',
    phase: 'Phase 1',
    progress: 0
  });
  const router = useRouter();

  // Load state on mount
  useEffect(() => {
    const state = loadState();
    setAppState(state);
  }, []);

  // Save state when it changes
  useEffect(() => {
    if (appState) {
      saveState(appState);
    }
  }, [appState]);

  const handleCreateProject = () => {
    if (!appState || !newProjectForm.name.trim()) return;

    const newProject: Project = {
      id: generateId(),
      name: newProjectForm.name.trim(),
      description: newProjectForm.description.trim() || 'New AI simulation project ready for analysis.',
      type: 'simulation',
      powered: 'ai-powered',
      date: formatDate(new Date()),
      progress: newProjectForm.progress,
      phase: newProjectForm.phase,
      simulations: 0
    };

    setAppState({
      ...appState,
      projects: [...appState.projects, newProject]
    });

    setNewProjectForm({
      name: '',
      description: '',
      phase: 'Phase 1',
      progress: 0
    });
    setNewProjectOpen(false);
  };

  const handleLogout = () => {
    clearState();
    router.push('/auth');
  };

  if (!appState) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">T</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Tunnel</h1>
              <p className="text-sm text-gray-400">Projects</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setNewProjectOpen(true)}
              className="btn-hover bg-white text-black px-4 py-2 rounded-lg font-medium flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
            <button 
              onClick={handleLogout}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              Logout
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome {appState.username},</h2>
          <p className="text-gray-400">Manage your AI simulation projects and view insights</p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appState.projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all cursor-pointer group"
              onClick={() => setSelectedProject(project.id)}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-gray-800 text-xs px-2 py-1 rounded">
                      {project.type}
                    </span>
                    <span className="bg-blue-600 text-xs px-2 py-1 rounded">
                      {project.powered}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                </div>
                <div className="text-xs text-gray-400 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {project.date}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold">{project.progress}%</span>
                  <span className="text-xs bg-gray-800 px-2 py-1 rounded">{project.phase}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                  <motion.div
                    className="bg-gradient-to-r from-cyan-400 to-blue-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${project.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>

                {/* Progress Segments */}
                <div className="flex gap-1">
                  {Array.from({ length: 20 }, (_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded ${
                        i < Math.floor(project.progress / 5) 
                          ? 'bg-white' 
                          : 'bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-1 text-xs text-gray-400 mb-4">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>{project.simulations} simulations</span>
              </div>

              {/* Action Button */}
              <Link href={`/simulation/${project.id}`}>
                <button className="w-full bg-white text-black py-3 rounded-lg font-medium btn-hover transition-all group-hover:bg-cyan-400 group-hover:text-white">
                  Open Project →
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State for No Projects */}
        {appState.projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-gray-400 mb-6">Create your first AI simulation project to get started</p>
            <button className="btn-hover bg-white text-black px-6 py-3 rounded-lg font-medium">
              Create Project
            </button>
          </motion.div>
        )}
      </main>

      {/* New Project Dialog */}
      <Dialog.Root open={newProjectOpen} onOpenChange={setNewProjectOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-6 border border-white/10 max-w-md w-full mx-4 z-50">
            <Dialog.Title className="text-xl font-bold mb-4">Create New Project</Dialog.Title>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Project Name</label>
                <input
                  type="text"
                  value={newProjectForm.name}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, name: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  placeholder="Enter project name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={newProjectForm.description}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, description: e.target.value })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all resize-none"
                  rows={3}
                  placeholder="Describe your project..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Phase</label>
                  <select
                    value={newProjectForm.phase}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, phase: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  >
                    <option value="Phase 1">Phase 1</option>
                    <option value="Phase 2">Phase 2</option>
                    <option value="Phase 3">Phase 3</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Progress (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProjectForm.progress}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, progress: parseInt(e.target.value) || 0 })}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleCreateProject}
                disabled={!newProjectForm.name.trim()}
                className="flex-1 bg-white text-black py-3 rounded-lg font-medium btn-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Project
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
    </div>
  );
}
