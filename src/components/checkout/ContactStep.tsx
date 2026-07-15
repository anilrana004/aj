'use client';

import { Input } from '@/components/ui/Input';

interface ContactStepProps {
  email: string;
  onEmailChange: (email: string) => void;
  phone: string;
  onPhoneChange: (phone: string) => void;
  name: string;
  onNameChange: (name: string) => void;
}

export function ContactStep({ email, onEmailChange, phone, onPhoneChange, name, onNameChange }: ContactStepProps) {
  return (
    <div className="space-y-6">
      <p className="font-ui text-body text-text-primary/70">
        We&apos;ll use this to confirm your order and provide updates.
      </p>
      <div>
        <label htmlFor="checkout-name" className="block font-ui text-caption mb-2">Full Name</label>
        <Input
          id="checkout-name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Your full name"
          autoComplete="name"
        />
      </div>
      <div>
        <label htmlFor="checkout-email" className="block font-ui text-caption mb-2">Email</label>
        <Input
          id="checkout-email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>
      <div>
        <label htmlFor="checkout-phone" className="block font-ui text-caption mb-2">
          Phone <span className="normal-case text-text-primary/50">(for delivery updates only)</span>
        </label>
        <Input
          id="checkout-phone"
          type="tel"
          value={phone}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="+91 XXXXX XXXXX"
          autoComplete="tel"
        />
      </div>
    </div>
  );
}
