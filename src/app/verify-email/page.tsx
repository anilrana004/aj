'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LoadingMonogram } from '@/components/ui/LoadingMonogram';

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }
    fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then((res) => {
        setStatus(res.ok ? 'success' : 'error');
      })
      .catch(() => setStatus('error'));
  }, [token]);

  return (
    <div className="text-center">
      {status === 'loading' && <LoadingMonogram />}
      {status === 'success' && (
        <>
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-bg-secondary flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-display text-h1 mb-4">Email Verified</h1>
          <p className="font-ui text-body mb-8 text-text-primary/70">
            Welcome to Apriliha Singh. Your email has been verified.
          </p>
          <Link href="/account/orders" className="btn-primary text-text-inverse inline-block">
            Go to Account
          </Link>
        </>
      )}
      {status === 'error' && (
        <>
          <h1 className="font-display text-h1 mb-4">Verification Failed</h1>
          <p className="font-ui text-body mb-8 text-text-primary/70">
            This verification link is invalid or has expired.
          </p>
          <Link href="/" className="underline-gold font-ui text-caption">
            Return Home
          </Link>
        </>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="pt-[60px] min-h-screen flex items-center justify-center px-responsive">
        <div className="w-full max-w-[420px] py-20">
          <Suspense fallback={<div className="text-center py-20"><LoadingMonogram /></div>}>
            <VerifyEmailForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
