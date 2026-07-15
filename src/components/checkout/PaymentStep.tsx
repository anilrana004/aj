'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { InlineError } from '@/components/ui/InlineError';

interface PaymentStepProps {
  onPaymentReady: (method: string) => void;
  billingSameAsShipping: boolean;
  onBillingSameChange: (same: boolean) => void;
}

type PaymentMethod = 'card' | 'upi' | 'cod';

export function PaymentStep({ onPaymentReady, billingSameAsShipping, onBillingSameChange }: PaymentStepProps) {
  const [method, setMethod] = useState<PaymentMethod>('card');
  const [cardError, setCardError] = useState('');

  const handleMethodChange = (m: PaymentMethod) => {
    setMethod(m);
    onPaymentReady(m);
  };

  return (
    <div className="space-y-6">
      <p className="font-ui text-body text-text-primary/70">
        Payments are encrypted and processed securely. We never see your full card number.
      </p>

      <div className="flex gap-3">
        {[
          { id: 'card' as const, label: 'Card', icon: '💳' },
          { id: 'upi' as const, label: 'UPI', icon: '📱' },
          { id: 'cod' as const, label: 'Bank Transfer', icon: '🏦' },
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => handleMethodChange(opt.id)}
            className={cn(
              'flex-1 p-4 border rounded-sm text-center transition-all font-ui text-caption',
              method === opt.id
                ? 'border-accent-gold bg-bg-secondary'
                : 'border-border hover:border-accent-gold/30'
            )}
          >
            <span className="block text-xl mb-1">{opt.icon}</span>
            {opt.label}
          </button>
        ))}
      </div>

      {method === 'card' && (
        <div className="space-y-4">
          <div>
            <label htmlFor="card-number" className="block font-ui text-caption mb-2">Card Number</label>
            <Input
              id="card-number"
              placeholder="1234 5678 9012 3456"
              autoComplete="cc-number"
              onChange={() => setCardError('')}
            />
            <InlineError message={cardError} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="card-expiry" className="block font-ui text-caption mb-2">Expiry</label>
              <Input id="card-expiry" placeholder="MM / YY" autoComplete="cc-exp" />
            </div>
            <div>
              <label htmlFor="card-cvc" className="block font-ui text-caption mb-2">CVC</label>
              <Input id="card-cvc" placeholder="123" autoComplete="cc-csc" />
            </div>
          </div>
        </div>
      )}

      {method === 'upi' && (
        <div>
          <label htmlFor="upi-id" className="block font-ui text-caption mb-2">UPI ID</label>
          <Input id="upi-id" placeholder="yourname@upi" />
          <p className="mt-2 font-ui text-caption text-text-primary/50">
            You&apos;ll receive a payment request on your UPI app.
          </p>
        </div>
      )}

      {method === 'cod' && (
        <div className="p-4 border border-border rounded-sm bg-bg-secondary">
          <p className="font-ui text-body">
            A payment link will be sent to your email after order review. Pay via bank transfer (NEFT/RTGS) within 48 hours to confirm your order.
          </p>
        </div>
      )}

      <div className="pt-4 border-t divider-ink">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={billingSameAsShipping}
            onChange={(e) => onBillingSameChange(e.target.checked)}
            className="accent-accent-gold"
          />
          <span className="font-ui text-caption">Billing address same as shipping</span>
        </label>
      </div>
    </div>
  );
}
