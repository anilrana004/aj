'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export default function SignupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Failed to create account');
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="py-20 lg:py-32">
        <div className="max-w-[420px] mx-auto px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-6 border-2 border-terracotta flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12L10 17L19 7" stroke="#8A3B24" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="font-serif text-headline text-aubergine mb-4">Account Created</h1>
          <p className="text-body text-bronze leading-relaxed mb-8">
            We&apos;ve sent a verification email to <strong>{form.email}</strong>. Please check your inbox to verify your account.
          </p>
          <Link href="/auth/login">
            <Button size="lg">Go to Sign In</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-[420px] mx-auto px-6">
        <h1 className="font-serif text-headline text-aubergine text-center mb-2">Create Account</h1>
        <p className="text-body text-bronze text-center mb-10">
          Join Apriliha Singh to track orders, save designs, and more.
        </p>

        {/* Google OAuth */}
        <button
          onClick={() => signIn('google', { callbackUrl: '/account' })}
          className="w-full h-12 border border-stone/40 flex items-center justify-center gap-3 text-body text-aubergine hover:border-aubergine/30 transition-colors mb-6"
        >
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853"/>
            <path d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706s.102-1.166.282-1.706V4.962H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.038l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 7.294C4.672 5.166 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-stone/30" />
          <span className="text-caption text-bronze/40">or</span>
          <div className="flex-1 h-px bg-stone/30" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-rust/10 text-rust text-body p-3">{error}</div>
          )}
          <Input
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={8}
          />
          <Input
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
            minLength={8}
          />
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-center text-body text-bronze/60">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-terracotta hover:text-bronze transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
