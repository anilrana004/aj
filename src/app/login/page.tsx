'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PasswordField } from '@/components/ui/PasswordField';
import { InlineError } from '@/components/ui/InlineError';
import { LoadingMonogram } from '@/components/ui/LoadingMonogram';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'That email and password don\'t match. Try again, or reset your password.');
        setIsLoading(false);
        return;
      }
      router.push(data.redirectTo || '/account/orders');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main id="main-content" className="pt-[60px] min-h-screen flex items-center justify-center px-responsive">
        <div className="w-full max-w-[420px] py-20">
          <div className="text-center mb-12">
            <h1 className="font-display text-h1 mb-4">Welcome Back</h1>
            <p className="font-ui text-body text-text-primary/55">
              Log in to your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="login-email" className="block font-ui text-caption mb-2">Email</label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="login-password" className="font-ui text-caption">Password</label>
                <Link href="/forgot-password" className="font-ui text-caption underline-gold">Forgot password?</Link>
              </div>
              <PasswordField
                id="login-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                error={error}
                autoComplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-3"
            >
              {isLoading ? <LoadingMonogram size="sm" /> : 'Log In'}
            </button>
          </form>

          <p className="mt-8 text-center font-ui text-caption text-text-primary/55">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline-gold">Create Account</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
