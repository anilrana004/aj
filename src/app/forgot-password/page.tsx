'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LoadingMonogram } from '@/components/ui/LoadingMonogram';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Silently fail — never reveal whether email exists
    }
    setSubmitted(true);
    setIsLoading(false);
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[60px] min-h-screen flex items-center justify-center px-responsive">
        <div className="w-full max-w-[420px] py-20">
          <div className="text-center mb-12">
            <h1 className="font-display text-h1 mb-4">Reset Password</h1>
            {!submitted ? (
              <p className="font-ui text-body text-text-primary/60">
                Enter your email and we&apos;ll send you a reset link.
              </p>
            ) : (
              <p className="font-ui text-body text-text-primary/60">
                If an account exists for this email, a reset link is on its way.
              </p>
            )}
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fp-email" className="block font-ui text-caption mb-2">Email</label>
                <input
                  id="fp-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field w-full"
                  placeholder="you@example.com"
                  required
                  autoComplete="email"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full text-text-inverse flex items-center justify-center gap-3"
              >
                {isLoading ? <LoadingMonogram size="sm" /> : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bg-secondary flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.5">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </div>
              <p className="font-ui text-body mb-8 text-text-primary/70">
                Check your inbox for the reset link.
              </p>
            </div>
          )}

          <p className="mt-8 text-center font-ui text-caption text-text-primary/60">
            <Link href="/login" className="underline-gold">Back to Log In</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
