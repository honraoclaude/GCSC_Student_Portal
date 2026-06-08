'use client';

import { useState } from 'react';

interface VisualSimulationProps {
  html: string;
  onClose: () => void;
}

export function VisualSimulation({ html, onClose }: VisualSimulationProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="w-full animate-slideUp mt-3">
      <div className="rounded-xl border border-red-500/30 dark:border-red-500/40 bg-slate-800 dark:bg-slate-900 overflow-hidden shadow-xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-slate-900 dark:bg-slate-950 px-4 py-3 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <span className="text-sm font-semibold text-red-400 dark:text-red-300">
              Interactive Simulation
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-slate-800 dark:hover:bg-slate-700 rounded transition-colors"
            aria-label="Close simulation"
            title="Close simulation"
          >
            <span className="text-lg text-slate-400 hover:text-slate-200">×</span>
          </button>
        </div>

        {/* Loading Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800/80 backdrop-blur-sm z-10 rounded-b-xl">
            <div className="w-8 h-8 border-t-2 border-red-500 rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-slate-300">Generating simulation...</p>
          </div>
        )}

        {/* iFrame */}
        <div className="relative">
          <iframe
            srcDoc={html}
            sandbox="allow-scripts"
            title="Interactive simulation"
            className="w-full border-0 block"
            style={{ height: '520px' }}
            onLoad={() => setIsLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}
