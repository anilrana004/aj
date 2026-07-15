export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Apriliha Singh',
    url: 'https://aprilihasingh.com',
    logo: 'https://aprilihasingh.com/favicon.svg',
    description: 'Fine bespoke jewelry from Jaipur. Apple\'s restraint meets India\'s richness.',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Apriliha Singh',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'IN',
    },
    sameAs: [
      'https://instagram.com/aprilihasingh',
      'https://pinterest.com/aprilihasingh',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'concierge@aprilihasingh.com',
      telephone: '+91-98765-43210',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
