'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { PasswordField } from '@/components/ui/PasswordField';
import { useToast } from '@/components/ui/Toast';

export default function SettingsPage() {
  const { addToast } = useToast();
  const [name, setName] = useState('Apriliha Client');
  const [email, setEmail] = useState('client@example.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSaveName = () => {
    addToast('Name updated');
  };

  const handleChangePassword = () => {
    if (newPassword.length < 8) return;
    setCurrentPassword('');
    setNewPassword('');
    addToast('Password updated');
  };

  const strength = newPassword.length === 0 ? 0 : newPassword.length < 6 ? 1 : newPassword.length < 10 ? 2 : 3;

  return (
    <div className="space-y-12">
      <div>
        <h2 className="font-display text-h2 mb-8">Account Details</h2>
        <div className="space-y-6 max-w-[480px]">
          <div>
            <label className="block font-ui text-caption mb-2">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block font-ui text-caption mb-2">Email</label>
            <Input value={email} disabled />
            <p className="mt-1 font-ui text-caption text-text-primary/50">
              To change your email, contact support.
            </p>
          </div>
          <button onClick={handleSaveName} className="btn-primary text-text-inverse">
            Save Changes
          </button>
        </div>
      </div>

      <div className="border-t divider-ink pt-12">
        <h2 className="font-display text-h2 mb-8">Change Password</h2>
        <div className="space-y-6 max-w-[480px]">
          <PasswordField
            id="current-pw"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            autoComplete="current-password"
          />
          <PasswordField
            id="new-pw"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            strength={strength}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
          />
          <button
            onClick={handleChangePassword}
            disabled={!currentPassword || newPassword.length < 8}
            className="btn-primary text-text-inverse disabled:opacity-50"
          >
            Update Password
          </button>
        </div>
      </div>

      <div className="border-t divider-ink pt-12">
        <h2 className="font-display text-h2 mb-4">Delete Account</h2>
        <p className="font-ui text-body mb-6 text-text-primary/70">
          This action is irreversible. All your data, orders, and saved designs will be permanently removed.
        </p>
        <button
          className="btn-ghost border-accent-deep-terracotta text-accent-deep-terracotta"
          onClick={() => addToast('Please contact support to delete your account.', 'info')}
        >
          Request Account Deletion
        </button>
      </div>
    </div>
  );
}
