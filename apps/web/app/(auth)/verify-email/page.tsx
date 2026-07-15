'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    token ? 'loading' : 'error'
  );

  // In production, this would verify the token via API
  useState(() => {
    if (token) {
      fetch(`/api/email/verify?token=${token}`)
        .then((res) => {
          if (res.ok) setStatus('success');
          else setStatus('error');
        })
        .catch(() => setStatus('error'));
    }
  });

  return (
    <section className="py-20 lg:py-32">
      <div className="max-w-[420px] mx-auto px-6 text-center">
        {status === 'loading' && (
          <>
            <div className="w-8 h-8 border-2 border-stone/30 border-t-terracotta animate-spin mx-auto mb-6" />
            <h1 className="font-serif text-headline text-aubergine">Verifying...</h1>
          </>
        )}
        {status === 'success' && (
          <>
            <div className="w-16 h-16 mx-auto mb-6 border-2 border-terracotta flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12L10 17L19 7" stroke="#8A3B24" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="font-serif text-headline text-aubergine mb-4">Email Verified</h1>
            <p className="text-body text-bronze mb-8">Your email has been verified successfully.</p>
            <Link href="/account">
              <Button>Go to Account</Button>
            </Link>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="font-serif text-headline text-aubergine mb-4">Verification Failed</h1>
            <p className="text-body text-bronze mb-8">
              The verification link is invalid or has expired. Please request a new one.
            </p>
            <Link href="/auth/login">
              <Button>Back to Sign In</Button>
            </Link>
          </>
        )}
      </div>
    </section>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><div className="w-8 h-8 border-2 border-stone/30 border-t-terracotta animate-spin" /></div>}>
      <VerifyEmailContent />
    </Suspense>
  );
}
