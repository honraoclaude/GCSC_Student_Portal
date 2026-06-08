'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { SectionCard } from '@/components/layout/SectionCard';
import { FormInput, FormTextarea } from '@/components/forms';

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Mock initial values - in production these would come from the server
  const [formData, setFormData] = useState({
    displayName: 'John Doe',
    email: 'john@example.com',
    school: 'Lincoln High School',
    yearGroup: 'YEAR_11',
    bio: 'Passionate about learning and achieving excellence!',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Mock API call - in production this would update the database
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageLayout
      title="👤 Profile Settings"
      description="Manage your profile information and personal details"
    >
      <div className="max-w-2xl space-y-6">
        {/* Profile Form */}
        <SectionCard variant="glass">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">
                Display Name *
              </label>
              <FormInput
                name="displayName"
                type="text"
                value={formData.displayName}
                onChange={handleInputChange}
                placeholder="Your display name"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">
                Email Address *
              </label>
              <FormInput
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                disabled
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Email is managed through your account settings
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">
                  School
                </label>
                <FormInput
                  name="school"
                  type="text"
                  value={formData.school}
                  onChange={handleInputChange}
                  placeholder="Your school name"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-900 dark:text-white">
                  Year Group
                </label>
                <select
                  name="yearGroup"
                  value={formData.yearGroup}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select year group</option>
                  <option value="YEAR_7">Year 7</option>
                  <option value="YEAR_8">Year 8</option>
                  <option value="YEAR_9">Year 9</option>
                  <option value="YEAR_10">Year 10 (GCSE)</option>
                  <option value="YEAR_11">Year 11 (GCSE)</option>
                  <option value="YEAR_12">Year 12 (A-Level)</option>
                  <option value="YEAR_13">Year 13 (A-Level)</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-900 dark:text-white">
                Bio
              </label>
              <FormTextarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                placeholder="Tell us about yourself"
                rows={4}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {formData.bio.length}/160 characters
              </p>
            </div>

            {error && (
              <div className="p-4 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="p-4 rounded-lg bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm">
                ✓ Profile updated successfully!
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-all duration-200"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </SectionCard>

        {/* Subject Management */}
        <SectionCard
          title="📚 Enrolled Subjects"
          description="Manage your subject enrollment and target grades"
          variant="glass"
        >
          <div className="space-y-3">
            {[
              { name: 'Mathematics', target: 'A+' },
              { name: 'Physics', target: 'A' },
              { name: 'Chemistry', target: 'A' },
              { name: 'Biology', target: 'B+' },
            ].map((subject) => (
              <div
                key={subject.name}
                className="flex items-center justify-between p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    {subject.name}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Target: {subject.target}
                  </p>
                </div>
                <button className="text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  ✕
                </button>
              </div>
            ))}
          </div>

          <button className="mt-4 w-full px-4 py-2 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium">
            + Add Subject
          </button>
        </SectionCard>

        {/* Account Actions */}
        <SectionCard
          title="🔐 Account Actions"
          variant="glass"
          className="border-red-200/30 dark:border-red-200/20"
        >
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
              <div className="text-left">
                <p className="font-medium text-slate-900 dark:text-white">Change Password</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Update your account password
                </p>
              </div>
              <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                →
              </span>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group">
              <div className="text-left">
                <p className="font-medium text-slate-900 dark:text-white">Sign Out</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Sign out from all devices
                </p>
              </div>
              <span className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300">
                →
              </span>
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-lg bg-red-100/50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors group">
              <div className="text-left">
                <p className="font-medium text-red-700 dark:text-red-400">Delete Account</p>
                <p className="text-sm text-red-600/75 dark:text-red-400/75">
                  Permanently delete your account and data
                </p>
              </div>
              <span className="text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">
                →
              </span>
            </button>
          </div>
        </SectionCard>
      </div>
    </PageLayout>
  );
}
