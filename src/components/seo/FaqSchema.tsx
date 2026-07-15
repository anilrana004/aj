interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSchemaProps {
  items: FaqItem[];
}

export function FaqSchema({ items }: FaqSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FaqBlockProps {
  items: FaqItem[];
  title?: string;
}

export function FaqBlock({ items, title = 'Frequently Asked Questions' }: FaqBlockProps) {
  return (
    <>
      <FaqSchema items={items} />
      <section className="py-32 px-responsive bg-bg-dark text-text-inverse" aria-labelledby="faq-block-title">
        <div className="max-w-[800px] mx-auto">
          <h2 id="faq-block-title" className="font-display text-h2 text-center mb-16">{title}</h2>
          <div className="space-y-0">
            {items.map((item, index) => (
              <details key={index} className="group border-b divider-ink py-6">
                <summary className="flex items-center justify-between cursor-pointer list-none font-display text-h3">
                  {item.question}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-accent-gold transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <div className="pt-4 font-ui text-body text-text-primary/80">
                  {item.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
