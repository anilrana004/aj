'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { LoadingMonogram } from '@/components/ui/LoadingMonogram';
import { AccordionSection } from '@/components/checkout/AccordionSection';
import { ContactStep } from '@/components/checkout/ContactStep';
import { ShippingStep } from '@/components/checkout/ShippingStep';
import { DeliveryStep } from '@/components/checkout/DeliveryStep';
import { PaymentStep } from '@/components/checkout/PaymentStep';
import { ReviewStep } from '@/components/checkout/ReviewStep';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';
import { FaqBlock } from '@/components/seo/FaqSchema';

type Step = 'contact' | 'shipping' | 'delivery' | 'payment' | 'review';

const stepOrder: Step[] = ['contact', 'shipping', 'delivery', 'payment', 'review'];
const stepLabels: Record<Step, string> = {
  contact: 'Contact',
  shipping: 'Shipping Address',
  delivery: 'Delivery Method',
  payment: 'Payment',
  review: 'Review & Place Order',
};

interface CartItem {
  id: string;
  name: string;
  productType: string;
  partsSummary: string[];
  storyNarrative: string;
  totalPrice: number;
  quantity: number;
  partIds?: string[];
  verifiedTotal?: number;
  pairMultiplier?: number;
  ringSize?: string;
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState<Step>('contact');
  const [items, setItems] = useState<CartItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contact, setContact] = useState({ name: '', email: '', phone: '' });
  const [shipping, setShipping] = useState({
    line1: '', line2: '', city: '', state: '', postalCode: '', country: 'India',
  });
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [billingSame, setBillingSame] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsError, setTermsError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('apriliha-cart');
    if (saved) {
      try { setItems(JSON.parse(saved)); } catch { setItems([]); }
    }
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
  const shippingCost = deliveryMethod === 'express' ? 2500 : 0;
  const total = subtotal + shippingCost;

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

  const completedSteps = new Set<Step>();
  if (contact.email) completedSteps.add('contact');
  if (shipping.line1 && shipping.city) completedSteps.add('shipping');
  if (deliveryMethod) completedSteps.add('delivery');
  if (paymentMethod) completedSteps.add('payment');

  const getStepSummary = (step: Step): string | undefined => {
    switch (step) {
      case 'contact': return contact.email ? `${contact.name} · ${contact.email}` : undefined;
      case 'shipping': return shipping.line1 ? `${shipping.line1}, ${shipping.city}` : undefined;
      case 'delivery': return deliveryMethod === 'express' ? 'Express' : 'Standard';
      case 'payment': return paymentMethod === 'card' ? 'Card' : paymentMethod === 'upi' ? 'UPI' : 'Bank Transfer';
      default: return undefined;
    }
  };

  const canProceedFrom = (step: Step): boolean => {
    switch (step) {
      case 'contact': return Boolean(contact.name && contact.email);
      case 'shipping': return Boolean(shipping.line1 && shipping.city && shipping.state && shipping.postalCode);
      case 'delivery': return Boolean(deliveryMethod);
      case 'payment': return Boolean(paymentMethod);
      case 'review': return termsAccepted;
      default: return false;
    }
  };

  const handlePlaceOrder = async () => {
    if (!termsAccepted) {
      setTermsError('Please accept the terms to continue.');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/checkout/place-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({
            id: i.id,
            name: i.name,
            productType: i.productType,
            partsSummary: i.partsSummary,
            storyNarrative: i.storyNarrative,
            totalPrice: i.totalPrice,
            quantity: i.quantity,
            partIds: i.partIds,
            verifiedTotal: i.verifiedTotal,
            pairMultiplier: i.pairMultiplier,
            ringSize: i.ringSize,
          })),
          contact,
          shipping,
          deliveryMethod,
          paymentMethod,
          total,
        }),
      });
      const data = await res.json();
      if (res.ok && data.orderId) {
        localStorage.removeItem('apriliha-cart');
        window.location.href = `/checkout/confirmation/${data.orderId}`;
      }
    } catch {
      // Stay on page, show error
    }
    setIsSubmitting(false);
  };

  const goToStep = (step: Step) => {
    const idx = stepOrder.indexOf(step);
    const currentIdx = stepOrder.indexOf(currentStep);
    if (idx <= currentIdx || completedSteps.has(step)) {
      setCurrentStep(step);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Header />
        <main id="main-content" className="site-main min-h-screen flex items-center justify-center px-responsive">
          <div className="text-center py-20">
            <h1 className="font-display text-h2 mb-6">Your cart is empty</h1>
            <Link href="/design-your-own" className="underline-gold font-ui text-caption">Start designing</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', url: 'https://aprilihasingh.com' },
          { label: 'Cart', url: 'https://aprilihasingh.com/cart' },
          { label: 'Checkout', url: 'https://aprilihasingh.com/checkout' },
        ]}
      />
      <Header />
      <main id="main-content" className="site-main min-h-screen">
        <section className="py-20 px-responsive">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="font-display text-hero mb-12">Checkout</h1>

            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8 space-y-4">
                {stepOrder.map((step, index) => (
                  <AccordionSection
                    key={step}
                    number={index + 1}
                    title={stepLabels[step]}
                    summary={getStepSummary(step)}
                    isActive={currentStep === step}
                    isCompleted={completedSteps.has(step) && currentStep !== step}
                    onEdit={() => goToStep(step)}
                  >
                    {step === 'contact' && (
                      <ContactStep
                        email={contact.email}
                        onEmailChange={(v) => setContact({ ...contact, email: v })}
                        phone={contact.phone}
                        onPhoneChange={(v) => setContact({ ...contact, phone: v })}
                        name={contact.name}
                        onNameChange={(v) => setContact({ ...contact, name: v })}
                      />
                    )}
                    {step === 'shipping' && (
                      <ShippingStep
                        {...shipping}
                        onChange={(field, value) => setShipping({ ...shipping, [field]: value })}
                      />
                    )}
                    {step === 'delivery' && (
                      <DeliveryStep
                        selected={deliveryMethod}
                        onSelect={setDeliveryMethod}
                        isBespoke={items.some((i) => i.productType !== 'ready-to-ship')}
                      />
                    )}
                    {step === 'payment' && (
                      <PaymentStep
                        onPaymentReady={setPaymentMethod}
                        billingSameAsShipping={billingSame}
                        onBillingSameChange={setBillingSame}
                      />
                    )}
                    {step === 'review' && (
                      <ReviewStep
                        items={items}
                        contact={contact}
                        shipping={shipping}
                        deliveryMethod={deliveryMethod}
                        paymentMethod={paymentMethod}
                        termsAccepted={termsAccepted}
                        onTermsChange={(v) => { setTermsAccepted(v); setTermsError(''); }}
                        error={termsError}
                      />
                    )}

                    <div className="flex justify-between mt-8 pt-6 border-t border-border">
                      {index > 0 ? (
                        <button
                          onClick={() => setCurrentStep(stepOrder[index - 1])}
                          className="font-ui text-caption underline-gold flex items-center gap-2"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                          </svg>
                          Back
                        </button>
                      ) : <div />}

                      {step === 'review' ? (
                        <button
                          onClick={handlePlaceOrder}
                          disabled={isSubmitting || !termsAccepted}
                          className="btn-primary flex items-center gap-3"
                        >
                          {isSubmitting ? (
                            <LoadingMonogram size="sm" />
                          ) : (
                            <>Place Order — {formatPrice(total)}</>
                          )}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            if (canProceedFrom(step)) {
                              setCurrentStep(stepOrder[index + 1]);
                            }
                          }}
                          disabled={!canProceedFrom(step)}
                          className={`btn-primary flex items-center gap-2 ${
                            !canProceedFrom(step) ? 'opacity-50 cursor-not-allowed' : ''
                          }`}
                        >
                          Continue
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </AccordionSection>
                ))}
              </div>

              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <OrderSummary
                    items={items}
                    subtotal={subtotal}
                    shipping={shippingCost}
                    total={total}
                  />
                  <p className="mt-4 font-ui text-micro text-text-primary/35 text-center">
                    Prices in INR. No payment collected until you place your order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FaqBlock
          title="Checkout — Questions"
          items={[
            {
              question: 'Do I pay at checkout?',
              answer: 'You submit your order without payment if paying by bank transfer. Card and UPI payments are processed immediately. You will receive a payment link via email for bank transfer orders.',
            },
            {
              question: 'Can I modify my order after placing it?',
              answer: 'Yes, within 24 hours of placing it, before production begins. Contact concierge@aprilihasingh.com with your order number.',
            },
            {
              question: 'How long does bespoke production take?',
              answer: 'Most pieces take 12 to 18 days from final design confirmation to shipment. Your estimated ship date is shown at checkout and in your order confirmation.',
            },
            {
              question: 'Is my payment secure?',
              answer: 'Yes. Card data is handled exclusively via Stripe or Razorpay hosted fields — it never touches our servers. All payments are encrypted and PCI-DSS compliant.',
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
