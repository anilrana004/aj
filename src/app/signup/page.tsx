'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PasswordField } from '@/components/ui/PasswordField';
import { InlineError } from '@/components/ui/InlineError';
import { LoadingMonogram } from '@/components/ui/LoadingMonogram';

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setIsLoading(false);
        return;
      }
      router.push('/account/orders');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main id="main-content" className="site-main min-h-screen flex items-center justify-center px-responsive">
        <div className="w-full max-w-[420px] py-20">
          <div className="text-center mb-12">
            <h1 className="font-display text-h1 mb-4">Create Account</h1>
            <p className="font-ui text-body text-text-primary/55">
              Save designs, track orders, and checkout faster.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="signup-name" className="block font-ui text-caption mb-2">Full Name</label>
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field w-full"
                placeholder="Your name"
                required
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="block font-ui text-caption mb-2">Email</label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>
            <PasswordField
              id="signup-password"
              label="Password"
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
              className="btn-primary w-full flex items-center justify-center gap-3"
            >
              {isLoading ? <LoadingMonogram size="sm" /> : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center font-ui text-caption text-text-primary/55">
            Already have an account?{' '}
            <Link href="/login" className="underline-gold">Log In</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
