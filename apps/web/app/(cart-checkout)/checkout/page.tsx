'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn, formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

type CheckoutStep = 'contact' | 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>('contact');
  const [loading, setLoading] = useState(false);
  const [isGuest, setIsGuest] = useState(true);

  const [form, setForm] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'IN',
  });

  const [cartSummary] = useState({
    items: [
      { name: 'Oxidized Bronze Chain Necklace — Bespoke', quantity: 1, price: 18500, isBespoke: true },
    ],
    subtotal: 18500,
    shipping: 0,
    tax: 0,
    total: 18500,
  });

  const steps: { key: CheckoutStep; label: string }[] = [
    { key: 'contact', label: 'Contact' },
    { key: 'shipping', label: 'Shipping' },
    { key: 'payment', label: 'Payment' },
    { key: 'review', label: 'Review' },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          shippingAddress: {
            name: `${form.firstName} ${form.lastName}`,
            line1: form.address1,
            line2: form.address2,
            city: form.city,
            state: form.state,
            postalCode: form.postalCode,
            country: form.country,
            phone: form.phone,
          },
          isGuest,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        } else {
          router.push('/checkout/confirmation?order=' + data.orderNumber);
        }
      }
    } catch (err) {
      console.error('Checkout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-12 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <h1 className="font-serif text-headline text-aubergine text-center mb-10">
          Checkout
        </h1>

        {/* Step Indicators */}
        <div className="flex justify-center gap-0 mb-12 max-w-lg mx-auto">
          {steps.map((s, i) => (
            <div key={s.key} className="flex-1 flex items-center">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={cn(
                    'w-8 h-8 flex items-center justify-center text-label border transition-all duration-300',
                    steps.findIndex((x) => x.key === step) >= i
                      ? 'bg-terracotta text-sand-light border-terracotta'
                      : 'bg-transparent text-bronze/40 border-stone/30'
                  )}
                >
                  {i + 1}
                </div>
                <span className="mt-2 text-caption text-bronze hidden sm:block">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={cn(
                    'h-px flex-1 -mt-4',
                    steps.findIndex((x) => x.key === step) > i
                      ? 'bg-terracotta'
                      : 'bg-stone/30'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-10">
          {/* Form */}
          <div className="order-2 lg:order-1">
            {/* Contact */}
            {step === 'contact' && (
              <div className="space-y-6">
                <h2 className="font-serif text-subhead text-aubergine mb-6">Contact Details</h2>

                {/* Guest vs Account toggle */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setIsGuest(true)}
                    className={cn(
                      'flex-1 py-3 text-label uppercase tracking-widest border transition-all',
                      isGuest
                        ? 'border-terracotta text-terracotta'
                        : 'border-stone/30 text-bronze/50'
                    )}
                  >
                    Continue as Guest
                  </button>
                  <Link href="/auth/login" className="flex-1">
                    <button className="w-full py-3 text-label uppercase tracking-widest border border-stone/30 text-bronze/50 hover:border-aubergine/30 transition-all">
                      Log In
                    </button>
                  </Link>
                </div>

                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                  <Input
                    label="Last Name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                </div>
                <Input
                  label="Phone (optional)"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <Button onClick={() => setStep('shipping')} size="lg">
                  Continue to Shipping
                </Button>
              </div>
            )}

            {/* Shipping */}
            {step === 'shipping' && (
              <div className="space-y-6">
                <h2 className="font-serif text-subhead text-aubergine mb-6">Shipping Address</h2>
                <Input
                  label="Address Line 1"
                  value={form.address1}
                  onChange={(e) => setForm({ ...form, address1: e.target.value })}
                />
                <Input
                  label="Address Line 2 (optional)"
                  value={form.address2}
                  onChange={(e) => setForm({ ...form, address2: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                  <Input
                    label="State"
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Postal Code"
                    value={form.postalCode}
                    onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
                  />
                  <Input
                    label="Country"
                    value={form.country}
                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                  />
                </div>

                <div className="bg-stone/20 p-4">
                  <p className="text-body text-bronze">
                    <strong>Shipping:</strong> Free · 5-7 business days (standard), or as noted for bespoke items.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep('contact')}>
                    ← Back
                  </Button>
                  <Button onClick={() => setStep('payment')} size="lg" className="flex-1">
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {/* Payment */}
            {step === 'payment' && (
              <div className="space-y-6">
                <h2 className="font-serif text-subhead text-aubergine mb-6">Payment</h2>
                <div className="bg-stone/20 p-8 text-center">
                  <p className="text-body text-bronze mb-4">
                    Payment is processed securely via Stripe or Razorpay.
                  </p>
                  <p className="text-caption text-bronze/50">
                    The payment form will appear here once Stripe/Razorpay keys are configured.
                  </p>
                  {/* Stripe/Razorpay Elements would be rendered here */}
                  <div className="mt-6 border border-dashed border-stone/40 p-6">
                    <p className="text-caption text-bronze/40">
                      [Payment Elements — Stripe/Razorpay]
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep('shipping')}>
                    ← Back
                  </Button>
                  <Button onClick={() => setStep('review')} size="lg" className="flex-1">
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {/* Review */}
            {step === 'review' && (
              <div className="space-y-6">
                <h2 className="font-serif text-subhead text-aubergine mb-6">Review Order</h2>

                <div className="bg-stone/20 p-4">
                  <p className="text-label uppercase tracking-widest text-bronze/60 mb-2">Contact</p>
                  <p className="text-body text-aubergine">{form.email}</p>
                </div>

                <div className="bg-stone/20 p-4">
                  <p className="text-label uppercase tracking-widest text-bronze/60 mb-2">Shipping</p>
                  <p className="text-body text-aubergine">
                    {form.firstName} {form.lastName}<br />
                    {form.address1}<br />
                    {form.address2 && <>{form.address2}<br /></>}
                    {form.city}, {form.state} {form.postalCode}<br />
                    {form.country}
                  </p>
                </div>

                <div className="bg-stone/20 p-4">
                  <p className="text-label uppercase tracking-widest text-bronze/60 mb-2">Items</p>
                  {cartSummary.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-body text-aubergine py-1">
                      <span>{item.name} × {item.quantity}</span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setStep('payment')}>
                    ← Back
                  </Button>
                  <Button onClick={handleSubmit} size="lg" className="flex-1" loading={loading}>
                    Place Order — {formatPrice(cartSummary.total)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary (sticky sidebar) */}
          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 bg-stone/10 p-6 border border-stone/20">
              <h3 className="text-label uppercase tracking-widest text-bronze/60 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 mb-4">
                {cartSummary.items.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-12 h-16 bg-stone/20 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-body text-aubergine line-clamp-2">{item.name}</p>
                      <p className="text-caption text-bronze/50">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-body text-aubergine shrink-0">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-stone/20 pt-4 space-y-2">
                <div className="flex justify-between text-body">
                  <span className="text-bronze/60">Subtotal</span>
                  <span>{formatPrice(cartSummary.subtotal)}</span>
                </div>
                <div className="flex justify-between text-body">
                  <span className="text-bronze/60">Shipping</span>
                  <span>{cartSummary.shipping === 0 ? 'Free' : formatPrice(cartSummary.shipping)}</span>
                </div>
                {cartSummary.tax > 0 && (
                  <div className="flex justify-between text-body">
                    <span className="text-bronze/60">Tax</span>
                    <span>{formatPrice(cartSummary.tax)}</span>
                  </div>
                )}
                <div className="flex justify-between font-serif text-subhead pt-2 border-t border-stone/20">
                  <span>Total</span>
                  <span>{formatPrice(cartSummary.total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
