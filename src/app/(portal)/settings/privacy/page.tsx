'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionCard } from '@/components/layout/SectionCard';

export default function PrivacySettingsPage() {
  const [leaderboardOptIn, setLeaderboardOptIn] = useState(true);
  const [profileVisibility, setProfileVisibility] = useState<'public' | 'private' | 'friends'>('public');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  return (
    <PageLayout
      title="🔒 Privacy & Data"
      description="Manage your privacy settings and data preferences"
    >
      <div className="max-w-2xl space-y-6">
        {/* Leaderboard Privacy */}
        <SectionCard
          title="🏆 Leaderboard Privacy"
          variant="glass"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Control whether you appear on the public leaderboard based on your XP and rank.
            </p>

            <label className="flex items-center gap-4 p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <input
                type="checkbox"
                checked={leaderboardOptIn}
                onChange={(e) => setLeaderboardOptIn(e.target.checked)}
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Show on Leaderboard
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {leaderboardOptIn
                    ? 'You are visible on the global leaderboard'
                    : 'You are hidden from the global leaderboard'}
                </p>
              </div>
            </label>

            <div className="p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                ℹ️ Even if hidden, your rank is still visible to you on your dashboard.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Profile Visibility */}
        <SectionCard
          title="👤 Profile Visibility"
          variant="glass"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Choose who can view your profile and achievements.
            </p>

            <div className="space-y-3">
              {[
                {
                  value: 'public',
                  label: 'Public Profile',
                  description: 'Everyone can view your profile and achievements',
                },
                {
                  value: 'friends',
                  label: 'Friends Only',
                  description: 'Only your study group friends can view your profile',
                },
                {
                  value: 'private',
                  label: 'Private Profile',
                  description: 'Only you can view your profile',
                },
              ].map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <input
                    type="radio"
                    name="visibility"
                    value={option.value}
                    checked={profileVisibility === option.value}
                    onChange={(e) => setProfileVisibility(e.target.value as 'public' | 'private' | 'friends')}
                    className="w-4 h-4 border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {option.label}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {option.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* Data Export */}
        <SectionCard
          title="📥 Data Export"
          variant="glass"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Download a copy of your data in a standard format. This includes your profile, achievements, study history, and all other personal data.
            </p>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                📋 Your data will be exported as JSON and sent to your email within 24 hours.
              </p>
            </div>

            <button className="w-full px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-semibold rounded-lg transition-colors">
              📥 Request Data Export
            </button>
          </div>
        </SectionCard>

        {/* GDPR & Rights */}
        <SectionCard
          title="⚖️ Your Rights (GDPR)"
          variant="glass"
        >
          <div className="space-y-3">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              As a user in the EU or other GDPR-regulated regions, you have specific rights regarding your personal data:
            </p>

            <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>
                  <strong>Right to Access:</strong> Request a copy of your personal data
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>
                  <strong>Right to Rectification:</strong> Correct inaccurate data
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>
                  <strong>Right to Erasure:</strong> Delete your account and data
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>
                  <strong>Right to Data Portability:</strong> Download your data
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0">✓</span>
                <span>
                  <strong>Right to Withdraw Consent:</strong> Stop data processing
                </span>
              </li>
            </ul>

            <a
              href="#"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-semibold"
            >
              Read our Privacy Policy →
            </a>
          </div>
        </SectionCard>

        {/* Account Deletion */}
        <SectionCard
          title="⚠️ Danger Zone"
          variant="glass"
          className="border-red-200/30 dark:border-red-200/20"
        >
          <div className="space-y-4">
            <p className="text-sm text-red-700 dark:text-red-400">
              Deleting your account is permanent and cannot be undone. All your data, achievements, and study history will be deleted.
            </p>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              🗑️ Delete My Account
            </button>
          </div>
        </SectionCard>

        {/* Delete Account Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 space-y-4 animate-fade-in-up">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Delete Account?
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mt-2">
                  This action cannot be undone. All your data will be permanently deleted.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-400">
                  ⚠️ <strong>Warning:</strong> Type <strong>"DELETE"</strong> to confirm
                </p>
              </div>

              <input
                type="text"
                value={deleteConfirmation}
                onChange={(e) => setDeleteConfirmation(e.target.value)}
                placeholder='Type "DELETE" to confirm'
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmation('');
                  }}
                  className="flex-1 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  disabled={deleteConfirmation !== 'DELETE'}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
