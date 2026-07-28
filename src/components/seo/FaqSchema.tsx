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
      <section className="py-20 px-responsive border-t border-border" aria-labelledby="faq-block-title">
        <div className="max-w-[800px] mx-auto">
          <h2
            id="faq-block-title"
            className="uppercase text-center mb-12 text-text-light"
            style={{ fontSize: '15px', letterSpacing: '0.13em' }}
          >
            {title}
          </h2>
          <div className="space-y-0">
            {items.map((item, index) => (
              <details key={index} className="group border-b border-border py-5">
                <summary
                  className="flex items-center justify-between cursor-pointer list-none uppercase text-text-primary"
                  style={{ fontSize: '11px', letterSpacing: '0.13em' }}
                >
                  {item.question}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-text-muted transition-transform duration-300 group-open:rotate-180 shrink-0 ml-4"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p
                  className="mt-4 text-text-muted"
                  style={{ fontSize: '10px', letterSpacing: '0.13em', lineHeight: 1.75 }}
                >
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
