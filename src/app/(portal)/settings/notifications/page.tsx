'use client';

import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionCard } from '@/components/layout/SectionCard';

interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  icon: string;
}

interface NotificationEvent {
  id: string;
  type: 'achievement' | 'leaderboard' | 'lesson' | 'study' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export default function NotificationsSettingsPage() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: 'daily_digest',
      label: 'Daily Study Digest',
      description: 'Get a summary of your daily study activity and progress',
      enabled: true,
      icon: '📊',
    },
    {
      id: 'weekly_summary',
      label: 'Weekly Summary',
      description: 'Receive a comprehensive weekly learning report',
      enabled: true,
      icon: '📈',
    },
    {
      id: 'achievement_unlocked',
      label: 'Achievement Unlocked',
      description: 'Get notified when you earn new badges and achievements',
      enabled: true,
      icon: '🏆',
    },
    {
      id: 'leaderboard_update',
      label: 'Leaderboard Changes',
      description: 'Alerts when your ranking changes or you gain ranks',
      enabled: false,
      icon: '🎯',
    },
    {
      id: 'lesson_reminder',
      label: 'Lesson Reminders',
      description: 'Get reminded about scheduled lessons and study sessions',
      enabled: true,
      icon: '⏰',
    },
    {
      id: 'streak_warning',
      label: 'Streak Warnings',
      description: 'Reminders to maintain your study streak',
      enabled: true,
      icon: '🔥',
    },
  ]);

  const [recentNotifications] = useState<NotificationEvent[]>([
    {
      id: '1',
      type: 'achievement',
      title: '🏆 Achievement Unlocked!',
      message: 'You earned the "On Fire 🔥" badge with a 7-day study streak!',
      timestamp: '2 hours ago',
      read: true,
    },
    {
      id: '2',
      type: 'leaderboard',
      title: '📈 Moved up in Leaderboard',
      message: 'You climbed 3 positions! You are now #5 on the leaderboard.',
      timestamp: '5 hours ago',
      read: true,
    },
    {
      id: '3',
      type: 'study',
      title: '📊 Weekly Summary Ready',
      message: 'Your weekly study report is ready. You studied for 12.5 hours this week!',
      timestamp: '1 day ago',
      read: true,
    },
    {
      id: '4',
      type: 'reminder',
      title: '⏰ Study Session Reminder',
      message: 'Your physics lesson with AI Tutor starts in 30 minutes',
      timestamp: '2 days ago',
      read: false,
    },
  ]);

  const togglePreference = (id: string) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };

  const enabledCount = preferences.filter((p) => p.enabled).length;

  return (
    <PageLayout
      title="🔔 Notifications"
      description="Control your notification preferences and manage alerts"
    >
      <div className="max-w-2xl space-y-6">
        {/* Email Preferences */}
        <SectionCard
          title="📧 Email Preferences"
          description={`${enabledCount} notification${enabledCount !== 1 ? 's' : ''} enabled`}
          variant="glass"
        >
          <div className="space-y-4">
            {preferences.map((preference) => (
              <div
                key={preference.id}
                className="flex items-start gap-4 p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="mt-1 flex-shrink-0 text-2xl">
                  {preference.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {preference.label}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {preference.description}
                  </p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  <button
                    onClick={() => togglePreference(preference.id)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                      preference.enabled
                        ? 'bg-blue-600'
                        : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        preference.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <label className="flex items-center gap-3 cursor-pointer p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  Email Frequency: Daily
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Receive notifications once daily at 8 AM
                </p>
              </div>
            </label>
          </div>
        </SectionCard>

        {/* Push Notifications */}
        <SectionCard
          title="🔊 Push Notifications"
          variant="glass"
        >
          <div className="space-y-4">
            <label className="flex items-center gap-4 p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-2 focus:ring-blue-500"
              />
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  Enable Push Notifications
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Receive instant notifications on your device
                </p>
              </div>
            </label>

            <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                💡 <strong>Pro tip:</strong> Push notifications will alert you immediately about achievements, leaderboard changes, and time-sensitive events.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Notification Center */}
        <SectionCard
          title="📬 Notification Center"
          description="Your recent notifications"
          variant="glass"
        >
          <div className="space-y-3">
            {recentNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border transition-colors ${
                  notification.read
                    ? 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800'
                    : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p
                        className={`font-semibold ${
                          notification.read
                            ? 'text-slate-900 dark:text-slate-200'
                            : 'text-blue-900 dark:text-blue-200'
                        }`}
                      >
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />
                      )}
                    </div>
                    <p
                      className={`text-sm mt-1 ${
                        notification.read
                          ? 'text-slate-600 dark:text-slate-400'
                          : 'text-blue-800 dark:text-blue-300'
                      }`}
                    >
                      {notification.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                  <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors flex-shrink-0">
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium">
            Clear History
          </button>
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
