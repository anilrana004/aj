import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import Accordion from '@/components/ui/Accordion';
import { FadeIn } from '@/components/ui/Animations';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ',
  description: 'Frequently asked questions about Apriliha Singh jewelry — bespoke orders, lead times, care, shipping, materials, and sizing.',
  path: '/faq',
});

const FAQ_DATA = [
  {
    question: 'How long does a bespoke piece take?',
    answer: 'Bespoke pieces typically require 2-4 weeks depending on the complexity of the design and the parts selected. Each part card in the builder shows its individual lead time. The total estimated lead time is always displayed before you add the piece to your cart.',
  },
  {
    question: 'Can I modify a saved design?',
    answer: 'Yes. Any saved design can be reopened in the bespoke builder, where you can change any part, swap materials, or adjust the finish. The price will update in real time as you make changes.',
  },
  {
    question: 'What is oxidized bronze?',
    answer: 'Oxidized bronze is bronze that has been treated with a controlled patination process, creating a dark, aged surface. The patina deepens and evolves with wear, developing a unique character over time. It is not plating — it is a chemical transformation of the metal surface itself.',
  },
  {
    question: 'How do I care for my bronze jewelry?',
    answer: 'Store your piece in the provided cloth pouch when not wearing it. Avoid prolonged contact with water, perfume, or harsh chemicals. For cleaning, gently wipe with a soft dry cloth. The patina will naturally evolve with wear — this is a feature, not a defect.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship worldwide. Standard shipping within India is free. International shipping rates are calculated at checkout based on destination and weight. All orders include tracking.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns on unworn, ready-to-wear items within 14 days of delivery. Bespoke items are made to order and cannot be returned unless there is a manufacturing defect. Please contact us within 48 hours of receiving a defective item.',
  },
  {
    question: 'How does sizing work for necklaces and bracelets?',
    answer: 'Our bespoke builder lets you choose exact lengths (16", 18", 22" for necklaces). For bracelets, we offer standard sizes (S/M/L) with measurements listed on each part. If you are unsure, our sizing guide is available on each product page.',
  },
  {
    question: 'Can I visit the atelier in Jaipur?',
    answer: 'Our atelier is primarily a working studio, but we welcome visitors by appointment. Please contact us to arrange a visit, and we will do our best to accommodate your schedule.',
  },
  {
    question: 'Are the gemstones ethically sourced?',
    answer: 'We source gemstones from established dealers in Jaipur and across India, prioritizing suppliers who can verify the origin and ethical standards of their materials. We do not use conflict gemstones and maintain traceability for all significant stones.',
  },
  {
    question: 'Do you offer gift wrapping?',
    answer: 'Every order ships in our signature packaging — a warm-toned box with a cloth pouch and care card. For gifting, we can include a handwritten note on request — just add a note during checkout.',
  },
];

export default function FAQPage() {
  const faqSchema = {
    mainEntity: FAQ_DATA.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd type="FAQPage" data={faqSchema} />

      <section className="py-16 lg:py-24">
        <div className="max-w-[700px] mx-auto px-6">
          <FadeIn>
            <h1 className="font-serif text-display text-aubergine text-center mb-4">FAQ</h1>
            <p className="text-body-lg text-bronze text-center mb-16">
              Answers to common questions about our jewelry, bespoke process, and services.
            </p>
          </FadeIn>

          <div className="space-y-0">
            {FAQ_DATA.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <Accordion title={faq.question} defaultOpen={i === 0}>
                  <p className="text-body text-bronze leading-relaxed">{faq.answer}</p>
                </Accordion>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="mt-16 text-center bg-stone/20 p-8">
              <p className="font-serif text-subhead text-aubergine mb-3">
                Still have questions?
              </p>
              <p className="text-body text-bronze mb-6">
                We&apos;re happy to help. Reach out and we&apos;ll get back to you within 24 hours.
              </p>
              <a
                href="/contact"
                className="inline-block h-10 px-6 bg-terracotta text-sand-light text-label uppercase tracking-widest hover:bg-bronze transition-colors"
              >
                Contact Us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
