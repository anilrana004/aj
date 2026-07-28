'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PasswordField } from '@/components/ui/PasswordField';
import { LoadingMonogram } from '@/components/ui/LoadingMonogram';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid or expired reset link.');
        setIsLoading(false);
        return;
      }
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="text-center">
        <p className="font-ui text-body mb-6 text-text-primary/70">
          Invalid reset link. Please request a new one.
        </p>
        <Link href="/forgot-password" className="underline-gold font-ui text-caption">
          Request New Link
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bg-secondary flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h1 className="font-display text-h1 mb-4">Password Updated</h1>
        <p className="font-ui text-body mb-8 text-text-primary/70">
          Your password has been changed. You are now logged in.
        </p>
        <Link href="/account/orders" className="btn-primary text-text-inverse inline-block">
          Go to Account
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-display text-h1 mb-4 text-center">New Password</h1>
      <p className="font-ui text-body mb-12 text-center text-text-primary/60">
        Choose a new password for your account.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <PasswordField
          id="reset-password"
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min. 8 characters"
          strength={strength}
          error={error}
          autoComplete="new-password"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full text-text-inverse flex items-center justify-center gap-3"
        >
          {isLoading ? <LoadingMonogram size="sm" /> : 'Reset Password'}
        </button>
      </form>
    </>
  );
}

export default function ResetPasswordPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="site-main min-h-screen flex items-center justify-center px-responsive">
        <div className="w-full max-w-[420px] py-20">
          <Suspense fallback={<div className="text-center py-20"><LoadingMonogram /></div>}>
            <ResetPasswordForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
