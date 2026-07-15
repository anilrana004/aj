'use client';

import { useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-[420px] mx-auto px-6">
        {sent ? (
          <div className="text-center">
            <h1 className="font-serif text-headline text-aubergine mb-4">Check Your Email</h1>
            <p className="text-body text-bronze leading-relaxed mb-8">
              If an account exists with <strong>{email}</strong>, we&apos;ve sent a password reset link.
            </p>
            <Link href="/auth/login">
              <Button>Back to Sign In</Button>
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-serif text-headline text-aubergine text-center mb-2">Reset Password</h1>
            <p className="text-body text-bronze text-center mb-10">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="lg" className="w-full" loading={loading}>
                Send Reset Link
              </Button>
            </form>
            <p className="mt-8 text-center text-body text-bronze/60">
              Remember your password?{' '}
              <Link href="/auth/login" className="text-terracotta hover:text-bronze transition-colors">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </section>
  );
}
