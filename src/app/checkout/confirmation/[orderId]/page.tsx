import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BreadcrumbSchema } from '@/components/seo/BreadcrumbSchema';

interface ConfirmationPageProps {
  params: Promise<{ orderId: string }>;
}

export async function generateMetadata({ params }: ConfirmationPageProps): Promise<Metadata> {
  const { orderId } = await params;
  return { title: `Order Confirmed — ${orderId}` };
}

export default async function OrderConfirmationPage({ params }: ConfirmationPageProps) {
  const { orderId } = await params;

  return (
    <>
      <BreadcrumbSchema
        items={[
          { label: 'Home', url: 'https://aprilihasingh.com' },
          { label: 'Order Confirmed', url: `https://aprilihasingh.com/checkout/confirmation/${orderId}` },
        ]}
      />
      <Header />
      <main id="main-content" className="site-main min-h-screen flex items-center justify-center px-responsive">
        <div className="w-full max-w-[600px] py-20 text-center">
          <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-warm-stone flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-gold)" strokeWidth="1.5">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <p className="eyebrow-gold mb-6" style={{ textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            ORDER CONFIRMED
          </p>
          <h1 className="font-display text-hero mb-6">
            Your piece is being crafted.
          </h1>
          <p className="font-ui text-body mb-4 text-text-primary/70">
            Thank you — we have received your order and our atelier team will begin work shortly.
          </p>
          <p className="font-ui text-caption mb-12 text-text-primary/50">
            Order number: <strong>{orderId}</strong>
          </p>

          <div className="p-8 border border-border rounded-sm text-left mb-12">
            <h2 className="font-display text-h3 mb-4">What Happens Next</h2>
            <ol className="space-y-4 font-ui text-body text-text-primary/80">
              <li className="flex gap-3">
                <span className="text-accent-gold shrink-0 font-medium">1.</span>
                <span>You&apos;ll receive a confirmation email with your order details and story narrative.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold shrink-0 font-medium">2.</span>
                <span>Our creative director will review your design and confirm production details within 24 hours.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold shrink-0 font-medium">3.</span>
                <span>Once payment is confirmed, your piece enters production. Track progress in your account.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-accent-gold shrink-0 font-medium">4.</span>
                <span>We&apos;ll notify you when your piece ships with tracking details.</span>
              </li>
            </ol>
          </div>

          {/* Guest account creation offer */}
          <div className="p-8 border border-border rounded-sm mb-12">
            <h3 className="font-display text-h3 mb-3">Save your details for next time?</h3>
            <p className="font-ui text-body mb-6 text-text-primary/70">
              Create an account with just a password. Your shipping details and order history are already saved.
            </p>
            <Link href="/signup" className="btn-primary text-text-inverse inline-block">
              Create Account
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href={`/account/orders/${orderId}`} className="btn-primary text-text-inverse">
              View Order
            </Link>
            <Link href="/collections" className="font-ui text-caption underline-gold">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
