'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LaunchPage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => router.push('/auth'), 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-gray-400 text-sm mb-4">The Correct Way To Launch</p>
          <h1 className="text-4xl font-bold mb-2">Tunnel</h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <p className="text-gray-400 mb-6">Getting real-time demographics</p>
          <div className="text-5xl font-bold mb-4">{progress}%</div>
          <p className="text-sm text-gray-500 mb-2">+6% since you last checked</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
            <motion.div 
              className="bg-gradient-to-r from-cyan-400 to-blue-600 h-2 rounded-full relative overflow-hidden"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>

          {/* Progress segments visualization */}
          <div className="flex gap-1 justify-center">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className={`h-1 w-2 rounded ${
                  i < Math.floor(progress / 2) 
                    ? 'bg-white' 
                    : i < Math.floor(progress / 1.5)
                    ? 'bg-gray-400'
                    : 'bg-gray-700'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Loading dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center gap-1"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
