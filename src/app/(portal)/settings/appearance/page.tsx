'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionCard } from '@/components/layout/SectionCard';

export default function AppearanceSettingsPage() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [uiScale, setUiScale] = useState(100);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  return (
    <PageLayout
      title="🎨 Appearance"
      description="Customize your visual preferences and theme"
    >
      <div className="max-w-2xl space-y-6">
        {/* Theme Selection */}
        <SectionCard
          title="🌓 Theme"
          description="Choose your preferred color scheme"
          variant="glass"
        >
          <div className="space-y-3">
            {[
              {
                value: 'light',
                label: 'Light',
                description: 'Bright and clean interface',
                icon: '☀️',
              },
              {
                value: 'dark',
                label: 'Dark',
                description: 'Easy on the eyes during night time',
                icon: '🌙',
              },
              {
                value: 'auto',
                label: 'Auto',
                description: 'Follow system preference',
                icon: '⚙️',
              },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-4 p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <input
                  type="radio"
                  name="theme"
                  value={option.value}
                  checked={theme === option.value}
                  onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'auto')}
                  className="w-4 h-4 border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {option.icon} {option.label}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {option.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </SectionCard>

        {/* UI Scale */}
        <SectionCard
          title="📏 Interface Scale"
          description="Adjust the overall size of UI elements"
          variant="glass"
        >
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Scale: {uiScale}%
                </p>
                <button
                  onClick={() => setUiScale(100)}
                  className="text-xs px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  Reset
                </button>
              </div>

              <input
                type="range"
                min="80"
                max="120"
                step="5"
                value={uiScale}
                onChange={(e) => setUiScale(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0"
              />

              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-2">
                <span>Smaller (80%)</span>
                <span>Default (100%)</span>
                <span>Larger (120%)</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                💡 The interface scale applies to cards, text, and spacing. Some content may adjust dynamically.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Animation Settings */}
        <SectionCard
          title="✨ Motion & Animations"
          variant="glass"
        >
          <div className="space-y-4">
            <label className="flex items-center gap-4 p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={animationsEnabled}
                onChange={(e) => setAnimationsEnabled(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Enable Animations
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Smooth transitions and fade-in effects
                </p>
              </div>
            </label>

            {animationsEnabled && (
              <div className="p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                  Preview of animated elements:
                </p>
                <div className="flex gap-3 flex-wrap">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 animate-fade-in-up" />
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 animate-bounce-slow" />
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 hover:scale-110 hover:-translate-y-1 transition-all duration-300" />
                </div>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Compact Mode */}
        <SectionCard
          title="📦 Compact Mode"
          variant="glass"
        >
          <div className="space-y-4">
            <label className="flex items-center gap-4 p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={compactMode}
                onChange={(e) => setCompactMode(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Use Compact Layout
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Reduce spacing and show more content per screen
                </p>
              </div>
            </label>

            {compactMode && (
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  ℹ️ Compact mode reduces padding and margins throughout the app for a more condensed layout.
                </p>
              </div>
            )}
          </div>
        </SectionCard>

        {/* Color Scheme */}
        <SectionCard
          title="🎨 Accent Color"
          description="Choose your preferred accent color"
          variant="glass"
        >
          <div className="space-y-3">
            {[
              { name: 'Blue', color: 'from-blue-500 to-blue-600' },
              { name: 'Purple', color: 'from-purple-500 to-purple-600' },
              { name: 'Indigo', color: 'from-indigo-500 to-indigo-600' },
              { name: 'Pink', color: 'from-pink-500 to-pink-600' },
              { name: 'Emerald', color: 'from-emerald-500 to-emerald-600' },
              { name: 'Amber', color: 'from-amber-500 to-amber-600' },
            ].map((accent) => (
              <button
                key={accent.name}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                  accent.name === 'Blue'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-100/50 dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${accent.color}`} />
                <span className="font-semibold text-slate-900 dark:text-white">
                  {accent.name}
                </span>
              </button>
            ))}
          </div>
        </SectionCard>

        {/* Save Preferences */}
        <div className="flex gap-3">
          <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200">
            Save Preferences
          </button>
          <button className="flex-1 px-6 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold rounded-lg transition-colors">
            Reset to Defaults
          </button>
        </div>
      </div>
    </PageLayout>
  );
}
