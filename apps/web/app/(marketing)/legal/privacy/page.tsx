import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'Privacy policy for Apriliha Singh — how we collect, use, and protect your personal information.',
  path: '/legal/privacy',
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-[700px] mx-auto px-6">
        <h1 className="font-serif text-headline text-aubergine mb-10">Privacy Policy</h1>
        <div className="space-y-6 text-body text-bronze leading-relaxed">
          <p><em>Last updated: January 2025</em></p>

          <h2 className="font-serif text-subhead text-aubergine">Information We Collect</h2>
          <p>We collect information you provide directly: name, email, shipping address, phone number, and payment information (processed securely via our payment provider). We also collect usage data through cookies and analytics tools.</p>

          <h2 className="font-serif text-subhead text-aubergine">How We Use Your Information</h2>
          <p>We use your information to process orders, communicate about your orders, send marketing communications (with your consent), and improve our services. We do not sell your personal information to third parties.</p>

          <h2 className="font-serif text-subhead text-aubergine">Data Security</h2>
          <p>We implement appropriate security measures to protect your personal information. Payment data is processed by our payment provider (Stripe/Razorpay) and is never stored on our servers.</p>

          <h2 className="font-serif text-subhead text-aubergine">Cookies</h2>
          <p>We use essential cookies for site functionality and optional analytics cookies to understand how our site is used. You can manage cookie preferences in your browser settings.</p>

          <h2 className="font-serif text-subhead text-aubergine">Your Rights</h2>
          <p>You can access, update, or delete your personal information by contacting us at hello@aprilihasingh.com. We will respond to your request within 30 days.</p>

          <h2 className="font-serif text-subhead text-aubergine">Contact</h2>
          <p>For privacy-related inquiries, contact us at hello@aprilihasingh.com.</p>
        </div>
      </div>
    </section>
  );
}
