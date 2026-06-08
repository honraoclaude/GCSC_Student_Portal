'use client';

import { useState } from 'react';
import { VisualSimulation } from './VisualSimulation';

interface VisualiseButtonProps {
  messageContent: string;
}

export function VisualiseButton({ messageContent }: VisualiseButtonProps) {
  const [loading, setLoading] = useState(false);
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleVisualise = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/agents/visualise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: messageContent.slice(0, 300),
          context: messageContent,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setHtml(data.html);
    } catch (err) {
      const errorMsg =
        err instanceof Error ? err.message : 'Could not generate simulation';
      setError(errorMsg);
      console.error('Visualise error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={handleVisualise}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
          title={loading ? 'Generating...' : html ? 'Regenerate simulation' : 'Generate interactive visualization'}
        >
          {loading ? (
            <>
              <div className="w-3 h-3 border-t border-r border-white rounded-full animate-spin" />
              Generating...
            </>
          ) : html ? (
            <>
              <span>↺</span>
              Regenerate
            </>
          ) : (
            <>
              <span>✨</span>
              Visualise
            </>
          )}
        </button>

        {error && (
          <span className="text-xs text-red-400 dark:text-red-300">
            {error}
          </span>
        )}
      </div>

      {html && <VisualSimulation html={html} onClose={() => setHtml(null)} />}
    </div>
  );
}
